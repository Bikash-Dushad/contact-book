const Phonebook = require('../models/phonebook')
const User = require('../models/user')
const fs = require('fs')
const path = require('path')

module.exports.layout = async (req, res)=>{
    if(req.cookies.user_id){
        var user = await User.findById(req.cookies.user_id);
        var phonebook = await Phonebook.find({}).populate('user')
        if(user){
                return res.render('layout',{
                    user: user,
                    phonebook: phonebook
                })
        }else{
            console.log("user not found or not authorized");
            return res.redirect("/auth/signinpage")
        }
    }else{
        
        return res.redirect("/auth/signinpage")
    }
}

module.exports.addDetails = async (req, res) => {
    try {
        if (req.files) {
            const { fname, lname, pnumber, email, dob } = req.body;
            const userId = req.cookies.user_id;

            console.log('Request Body:', req.body); // Debug log
            console.log('Files:', req.files); // Debug log

            const profile = req.files.profile;
            const uploadDir = path.join(__dirname, '../assets/uploads', pnumber);

            console.log('Upload Directory:', uploadDir); // Debug log

            const fileLocation = path.join(uploadDir, profile.name);

            console.log('File Location:', fileLocation); // Debug log

            // Create directory if it does not exist
            if (!fs.existsSync(uploadDir)) {
                fs.mkdirSync(uploadDir, { recursive: true });
            }

            // Check if the file already exists
            if (fs.existsSync(fileLocation)) {
                console.log("File already exists");
                return res.redirect('back');
            } else {
                profile.mv(fileLocation, async function (err) {
                    if (err) {
                        console.log("Error in saving file");
                        return res.redirect('back');
                    } else {
                        console.log("File saved successfully");

                        const newPhonebook = await Phonebook.create({
                            fname,
                            lname,
                            pnumber,
                            email,
                            dob,
                            fileLocation,
                            user: userId // Set the user field
                        });

                        console.log(newPhonebook);
                        return res.redirect('back');
                    }
                });
            }
        } else {
            console.log('File was not uploaded properly!');
            return res.redirect('back');
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('An error occurred');
    }
};


module.exports.details = async (req, res)=>{
    try {
        if(req.cookies.user_id){
            var user = await User.findById(req.cookies.user_id);
            var phonebook = await Phonebook.find({})
            if(user){
                return res.render("details",{
                user: user,
                phonebook: phonebook
            })
            }
        }
} catch (error) {
    res.status(500).json({ message: error.message });
}
}

module.exports.delete = async function(req, res){
    try {
      var phonebook = await Phonebook.findById(req.params.id);
 
      if(phonebook.user == req.cookies.user_id){
         await Phonebook.deleteOne({ _id: phonebook._id });
        //  req.flash('success', "Text deleted successfully")
          return res.redirect('back')
      }else{
        //  req.flash('error', "You are not authorized to deletee others Text")
          console.log("not authorized")
          return res.redirect('back')
      }
    } catch (error) {
     console.log(error)
    }
 }