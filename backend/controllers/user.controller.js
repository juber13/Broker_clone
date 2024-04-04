const userRegister = (req, res) => {
    res.status(201).json({
        success: true,
        message: "User register Sucessfully"
    })
}


const userLogin = (req, res) => {
    res.status(201).json({
        success: true,
        message: "User Login Sucessfully"
    })
}

module.exports = {userRegister , userLogin}