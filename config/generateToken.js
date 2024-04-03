import  jwt  from "jsonwebtoken";

export const generateToken=(user)=>{
let secretKeyJWT=process.env.JWT_STR;
let userData={
    userName:user.name,
    userId:user._id,
    role:user.role
}
const createToken=jwt.sign(userData,secretKeyJWT,{expiresIn:'120m'})
return createToken;
}