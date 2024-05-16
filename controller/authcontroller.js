const User = require('../models/user')

module.exports.signuppage = (req, res)=>{
    return res.render('signuppage')
}

module.exports.signinpage = (req, res)=>{
    if(req.cookies.user_id){
        return res.redirect('/auth/layout')
    }else{
        return res.render('signinpage');
}
}

module.exports.signup = async (req, res)=>{
    var name = req.body.name;
    var email = req.body.email
    var password = req.body.password
    var confirm_password = req.body.confirm_password;

    if (password != confirm_password) {
        // req.flash('error', "password doesnot match")
        return res.redirect("back")
    } else {
        var user = await User.findOne({ email });
        if (user) {
            console.log("User already exists")
            // req.flash('success', "Email address already exists")
            return res.redirect("/auth/signuppage")
        } else {
            var user = await User.create({ name: name, email: email, password: password });
            console.log(user);
            // req.flash('success', "signup successfull")
            return res.redirect("/auth/signinpage")
        }
    }
}

module.exports.signin = async (req, res) => {
    var email = req.body.email;
    var password = req.body.password
    console.log(password)
    var user = await User.findOne({ email });
    if (user) {
        if (password == user.password) {
            res.cookie('user_id', user.id)
            // req.flash('success', "signin successfull")
            return res.redirect('/user/layout')
        } else {
            console.log("password doesnot matched")
            // req.flash('error', "Invalid user/password")
            return res.redirect('back')
        }
    } else {
        console.log("Email doesnot exist");
        req.flash('error', "Email doesnot exist")
        return res.redirect('/auth/signuppage')
    }
}

module.exports.logout = async (req, res)=>{
    if(req.cookies.user_id){
        res.clearCookie('user_id');
        // req.flash('success', "loged out successfully")
        return res.redirect('/auth/signinpage')
    }else{
        console.log("signin first")
        // req.flash('error', "signin first")
        return res.redirect('back')
    }
}