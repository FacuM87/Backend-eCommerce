import UserDTO from "../DTO/user.dto.js";


export const login = async(req, res) => {
    try {
        if (!req.user) return res.status(401).send("Invalid Credentials")
        req.session.user = req.user
        console.log(req.user);
        const { token } = req.user
        return res.cookie("jwtCookie", token).status(200).redirect("/products")
    } catch (error) {
        req.logger.error("Error: " + error)
        return res.status(500).send("Internal server error. Couldnt login.")
    }
}

export const github = (req,res) => {}

export const githubCallback = (req,res) => {   
    try {
        /* req.session.user = req.user */
        /*  return res.status(200).redirect("/products") */
        return res.cookie("jwtCookie", req?.user?.token).redirect("/products")
    } catch (error) {
        req.logger.error("Error: " + error)
        return res.status(500).send("Internal Server Error. GitHubCallback has failed")   
    }
}

export const register = async(req, res) => { 
    try {
        return res.status(201).redirect("/")
    } catch (error) {
        req.logger.error("Error: " + error)
        return res.status(500).send("Internal server error. Couldnt process your register request.")
    }  
}

export const logout = (req, res) => {
    try {
        req.session.destroy(err => {
            if(err) return res.send("Logout error")
            return res.redirect("/")
        })         
    } catch (error) {
        req.logger.error("Error: " + error)
        return res.status(500).send("Internal server error. Logout failure")
    }
}

export const current = (req, res) =>{
    try {
		const user = req.session.user;
        const userDTO = new UserDTO(user)
		return res.send(userDTO);
	} catch (error) {
        req.logger.error("Error: " + error)
		return res.status(500).send("Internal Server Error. Couldnt get current user information.");
	}
}