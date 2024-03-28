
export default class UserRepository {
    constructor(dao){
        this.dao=dao
    }

    getUsers = async () =>{
        return await this.dao.getAll()
    }

    createUser = async (newUser) => {
        return await this.dao.create(newUser)
    }

    getUserByEmail = async (username) => {
        return await this.dao.getByData(username)
    }

    getUserById = async (id) => {
        return await this.dao.getById(id)
    }

    getInactiveUsers = async (inactiveMark) => {
        return await this.dao.getAllByData(inactiveMark)
    }

    updateUser = async (email, changes) => {
        return await this.dao.update(email, changes)
    }

    deleteUser = async (userId) => {
        return await this.dao.delete(userId)
    }

    deleteInactives = async (inactiveMark) => {
        return await this.dao.deleteVarious(inactiveMark)
    }
}