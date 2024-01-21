

export const login = async(req, res) => {
    if (!req.user) return res.status(401).send("Invalid Credentials")

    console.log(req.user);

    req.session.user = req.user

    return res.redirect("/products")
}