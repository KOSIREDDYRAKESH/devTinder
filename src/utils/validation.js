const validator = require("validator")

const validateSingupData = (req) => {
    const { firstName, lastName, emailId, password } = req.body;
    if (!firstName || !lastName) {
        throw new Error("Please enter first & last Name");
    }
    else if (!validator.isEmail(emailId)) {
        throw new Error("Please enter valid Email");
    }
    else if (!validator.isStrongPassword(password)) {
        throw new Error("Please Enter a strong password(ex:-Abcd@1234) ");
    }
}

module.exports = { validateSingupData };