

export const checkRegisteredUser = (req, res, next) => {
    if(req.session?.user) return res.redirect("/profile")
    return next()
}

export const auth = (req, res, next) => {
    if(req.session?.user) return next()
    res.redirect('/')
}

export const checkAdminPermissions = (req, res, next) => {
    console.log("validating admin role") 
    const sessionActive = req.session.user
    if (sessionActive == undefined) return res.send("Login please")
    if(req.session.user.role !== "admin") return res.send("Not allowed")
    next()
}

export const checkUserPermissions = (req, res, next) => {
    console.log("validating user role")
    const sessionActive = req.session.user
    if (sessionActive == undefined) return res.send("Login please")
    if(req.session.user.role !== "user") return res.send("Not allowed")
    next()
}