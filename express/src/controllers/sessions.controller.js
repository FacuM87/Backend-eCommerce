

export const login = async(req, res) => {
    if (!req.user) return res.status(401).send("Invalid Credentials")

    req.session.user = req.user
    console.log(req.user);

    return res.redirect("/products")
}