import UserDTO from "../DTO/user.dto.js";


export const login = async(req, res) => {
    if (!req.user) return res.status(401).send("Invalid Credentials")

    console.log(req.user);

    req.session.user = req.user

    return res.redirect("/products")
}

export const github = (req,res) => {}

export const githubCallback = (req,res) => {   
    req.session.user = req.user
    res.redirect("/products")
}

export const register = async(req, res) => {   
    return res.redirect("/")
}

export const logout = (req, res) => {
    req.session.destroy(err => {
        if(err) return res.send("Logout error")
        return res.redirect("/")
    }) 
}

export const current = (req, res) =>{
    try {
		const user = req.session.user;
        const userDTO = new UserDTO(user)
		return res.send(userDTO);
	} catch (error) {
		res.status(500).send("Error Message: "+error);
	}
}