import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if(!username || !email || !password){
        res.status(400).json({ message: "All details are required", success: false });
    }
    const existingUser = await User.findOne({ $or:[{email}, {username}] });
    if (existingUser) return res.status(400).json({ message: 'User exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ 
        username,
        email, 
        password: hashedPassword
    });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
    res.status(201).json({ message: "Successfully registered", user, token, success: true });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if(!email || !password){
        res.status(400).json({ message: "All details are required", success: false });
    }
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'User not foud, please register' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
    res.status(200).json({ message: "LoggedIn successfully", user, token, success: true });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getProfile = async(req,res)=>{
    try {
        const userId = req.user?.id;
        if(!userId){
            return res.status(401).json({message: "Unauthorized user", success: false});
        }
        const newUser = await User.findById(userId).select("-password");
        if(!newUser){
            return res.status(404).json({message: "User not found", success: false});
        }
        return res.status(200).json({message: "User fetched successfully", newUser, success: true})
    } catch (error) {
        console.error("Error in fetching profile:", error);
        return res.status(500).json({ message: "Server error", success: false });
    }
}