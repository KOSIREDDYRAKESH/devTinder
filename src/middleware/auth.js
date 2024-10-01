const adminAuth = (req, res, next) => {
    console.log("Admin auth checked!");
    const token = "admin-dhvkjcamin";
    const isAdminToken = token === "admin-dhvkjcamin"
    if (isAdminToken) {
        next()
    }
    else {
        res.status(401).send("Unauthorized admin")
    }
}

const userAuth = (req, res, next) => {
    console.log("User auth checked!");
    const token = "user-dhvkjcamin";
    const isAdminToken = token === "user-dhvkjcamin"
    if (isAdminToken) {
        next()
    }
    else {
        res.status(401).send("Unauthorized user")
    }
}

module.exports = { adminAuth, userAuth }