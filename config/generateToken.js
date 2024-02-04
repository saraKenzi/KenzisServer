import  jwt  from "jsonwebtoken";

export const generateToken=(user)=>{
let secretKeyJWT=process.env.JWT_STR;
let userData={
    userName:user.name,
    userId:user._id,
    role:user.role
}
console.log("i am in token");
const createToken=jwt.sign(userData,secretKeyJWT,{expiresIn:'55m'})
return createToken;
}