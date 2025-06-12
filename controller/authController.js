import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pool from "../db/db.js";

const saltRounds=10;

export async function registerUser(req,res){
    const {username,password}=req.body;

    try{
        const userCheck=await pool.query(
            "SELECT * FROM users WHERE username=$1",[username]
        );

        if(userCheck.rows.length>0){
            return res.status(400).json({message:"Username already exists"});
        }

        const hashedpassword=await bcrypt.hash(password,saltRounds);

        await pool.query(
            "INSERT INTO users (username,password) VALUES ($1,$2)",[username,hashedpassword]
        );

        res.json({message:"User Registered Successfully"});
    }catch(err){
        console.error("❌ Registration error:", err);
        res.status(500).json({message:"Service error during registration"});
    }
}

export async function loginUser(req,res){
    const {username,password}=req.body;

    try{
        const userResult=await pool.query("SELECT * FROM users WHERE username=$1",[username]);

        const user=userResult.rows[0];

        if(!user){
            return res.status(401).json({message:"Invalid username or password"});
        }
        const isMatch=await bcrypt.compare(password,user.password);

        if(!isMatch){
            return res.status(401).json({message:"Invalid username or password"});
        }
        const token =jwt.sign({id:user.id},process.env.JWT_SECRET,{expiresIn:"1h",});

        res.json({token});

    }catch(err){
        console.error(err);
        res.status(500).json({message:"Server error during login"});
    }
}