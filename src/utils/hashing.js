
import { hash, compare, genSalt } from 'bcrypt'

const hashPassword = async (password) => {
    try {
        const salt = await genSalt(10);
        return await hash(password, salt);
    } catch (error) {
        console.error(error)
    }
}


const compareHashedPassword = async (plainPassword, hashPassword) => {
    try {
        return await compare(plainPassword, hashPassword)
    } catch (error) {
        console.error(error)
    }
}

export  {
    hashPassword,
    compareHashedPassword,
}