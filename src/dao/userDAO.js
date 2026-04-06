import User  from "../models/User.js";


const findUserByemail = async (email) => await User.findOne({ email }).exec();

const findUserById = async (id) => await User.findOne({ _id: id }).exec();

const getUsers = async () => await User.find().exec()


export  { 
    findUserByemail,
     findUserById,
     getUsers,
};

