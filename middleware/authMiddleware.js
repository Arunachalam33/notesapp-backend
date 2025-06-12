import jwt from "jsonwebtoken";

const authMiddleware=(req,res,next)=>{
    const authheader=req.headers.authorization;

    if(!authheader||!authheader.stateWith("Bearer")){
        return res.status(401).json({message:"Unauthorized No token provided"})
    }
    const token =authheader.split(" ")[1];

    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        req.user={id:decoded.id}
        next();
    }catch(err){
        return res.status(401).json({message:"Unauthorized Invalid Token"})
    }
};
export default authMiddleware;