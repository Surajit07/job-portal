import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
// import dotenv from "dotenv";
// dotenv.config();

export async function signup(req, res) {
  const { name, email, password } = req.body;
  try {
    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashed });
    await user.save();
    res.status(201).json({ message: "account created" });
  } catch (error) {
    res.status(500).json({ error: "SignIn failed" });
  }
};

export async function login(req, res){
    // console.log("Login route hit");
  
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ error: "Invalid credentials" });
  
      if (user.lockUntil && user.lockUntil > Date.now()) {
        return res.status(403).json({ error: "Account locked. Try later." });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        user.loginAttempts++;
        if (user.loginAttempts >= 5) {
          user.lockUntil = new Date(Date.now() + 30 * 60000);
        }
        await user.save();
        return res.status(400).json({ error: "Invalid credentials" });
      }
  
      user.loginAttempts = 0;
      user.lockUntil = undefined;
      await user.save();
  
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
      res.cookie("token", token, { httpOnly: true, secure: false }).json({ message: "Login success" });
    } catch (err) {
      res.status(500).json({ error: "Login failed" });
    }
};

export async function forgotPassword(req,res){
    const {email} = req.body;
    try{
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ error: "User not found" });
    
        const token = crypto.randomBytes(32).toString("hex");
        user.resetToken = token;
        user.resetTokenExpiry = Date.now() + 3600000; // 1 hour
        await user.save();
    
        res.json({ message: "Reset link generated", resetLink: `/reset-password/${token}` });

    }catch(error){
        res.status(500).json({ error: "Failed to process request" });

    }

};

export async function resetPassword(req,res){

    const { token } = req.params;
    const { newPassword } = req.body;

    try {
      const user = await User.findOne({
        resetToken: token,
        resetTokenExpiry: { $gt: Date.now() },
      });
      if (!user) return res.status(400).json({ error: "Invalid or expired token" });
  
      const hashed = await bcrypt.hash(newPassword, 10);
      user.password = hashed;
      user.resetToken = undefined;
      user.resetTokenExpiry = undefined;
      await user.save();
  
      res.json({ message: "Password reset successful" });
    } catch (err) {
      res.status(500).json({ error: "Reset failed" });
    }

};

