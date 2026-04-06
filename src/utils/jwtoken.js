import jwt from "jsonwebtoken";

const { verify, sign } = jwt;

import dotenv from 'dotenv';
dotenv.config();

const signToken = (payload) => sign(payload, process.env.SECRET_KEY_ACCESS_TOKEN);


const verifyToken = (token) => 
    verify(token, process.env.SECRET_KEY_ACCESS_TOKEN)

export  {
    signToken, 
    verifyToken
}