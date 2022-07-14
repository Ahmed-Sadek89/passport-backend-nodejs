const LoginSuccess = (req, res) => {
    if (req.user) {
        res.status(200).json({
            success: true,
            message: "successfull",
            user: req.user,
            //cookies: req.cookies // OR JWT
        });
    }
}

const LoginFailed =  (req, res) => {
    res.status(401).json({
        success: false,
        message: "failure",
    });
}

const Logout = (req, res) => {
    req.logout();
    res.redirect(process.env.CLIENT_HOME_URL);
}

module.exports = {
    LoginSuccess, LoginFailed, Logout
}