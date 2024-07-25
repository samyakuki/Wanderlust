const Listing = require("../models/listing.js");
const User = require("../models/user.js");

module.exports.getSignup = (req, res) => {
    res.render("users/signup.ejs");
};

module.exports.postSignup = async (req, res, next) => {
    try {
        let { username, email, password } = req.body;
        const newUser = new User({ email, username });
        const registeredUser = await User.register(newUser, password);
        req.logIn(registeredUser, (err) => {
            if (err) {
                return next(err); // Call next(err) to handle the error properly
            }
            req.flash("success", "Welcome To Wanderlust");
            res.redirect("/listings");
        });
    } catch (e) {
        req.flash("error", e.message);
        res.redirect("/listings/users/signup");
    }
};

module.exports.getLogin = (req, res) => {
    res.render("users/login.ejs");
};

module.exports.postLogin = (req, res) => {
    req.flash("success", "welcome back");
    let redirectUrl = res.locals.redirectUrl || `/listings`;
    res.redirect(redirectUrl);
};

module.exports.getLogout = (req, res, next) => {
    req.logOut((err) => {
        if (err) {
            return next(err); // Call next(err) to handle the error properly
        }
        req.flash("success", "you are logged out");
        res.redirect("/listings");
    });
};
