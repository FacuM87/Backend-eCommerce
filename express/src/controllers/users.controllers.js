import UserDTO from "../DTO/user.dto.js";
import Mail from "../modules/mail.config.js";
import { userService } from "../repositories/index.repositories.js"



export const getUsers = async (req, res) =>{
    try {
        const usersData = await userService.getUsers()
        const usersDTO = usersData.map(user => new UserDTO(user));

        return res.status(200).json({status: "success", payload: usersDTO})
    } catch (error) {
        return res.status(500).json({status: "fail", message: "Internal server error while getting users."+error})
    }
}

export const deleteInactives = async (req, res) =>{
    try {
        const inactiveMark = new Date()
        inactiveMark.setHours(inactiveMark.getHours() - 48)

        const inactiveAccounts = await userService.getInactiveUsers(inactiveMark)
 
        const deletingResult = await userService.deleteInactives(inactiveMark)
        
        const mailer = new Mail()
        inactiveAccounts.forEach(account => {
            mailer.sendDeletionReport(account.email)
        })

        return res.status(200).json({status: "success", payload: deletingResult})
    } catch (error) {
        return res.status(500).json({status: "fail", message: "Internal server error while deleting inactives."+error})
    }
}

export const getUserByEmail = async (req, res) =>{
    try {
        const { email } = req.query
        const user = await userService.getUserByEmail(email)
        console.log(user);
        return res.status(200).json({status: "success", payload: user})
    } catch (error) {
        return res.status(500).json({status: "fail", message: "Internal server error while getting user by email."+error})
    }
}

export const changeUserRole = async (req, res) =>{
    try {
        const { email, role } = req.query
        console.log(email);
        console.log(role);

        const changes = { role: role }

        const roleUpdated = await userService.updateUser(email, changes)

        console.log(roleUpdated);
        
        return res.status(200).json({status: "success", payload: roleUpdated})
    } catch (error) {
        console.log(error);
    }
}

export const deleteUser = async (req, res) =>{
    try {
        const { userId } = req.params
        console.log(userId);
        const deletedUser = await userService.deleteUser(userId)
        console.log(deletedUser);
        return res.status(200).json({status: "success", payload: deletedUser})
    } catch (error) {
        console.log(error);
    }
}