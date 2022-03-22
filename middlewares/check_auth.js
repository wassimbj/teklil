const jwt = require("jsonwebtoken");
function check_auth(req, res, next) {
     console.log("headers : ",req.headers)
    try {
        const token = req.headers["authorization"]
        if (!token) {
            return res.status(403).json({ status: 403, message: 'No Token  ', data: null })
        }
        jwt.verify(token, "jobgate", function (err, decoder) {
            if (err) {
                return res.status(401).json({ status: 401, message: 'Auth failed ' + err, data: null })
            }
            req.user_data=decoder;
            next();
        })
    }
    catch (error) {
        return res.status(401).json({ status: 401, message: 'Auth failed ' + error, data: null })
    }
}
module.exports = check_auth

















