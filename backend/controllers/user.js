import {User} from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


export const register = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, password, role } = req.body;

        // Check if any required fields are missing
        if (!fullname || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({
                message: "All fields are required",
                success: false
            });
        }

        // Check if the user already exists
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                message: "User already exists with this email",
                success: false
            });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        await User.create({
            fullname,
            email,
            phoneNumber,
            password: hashedPassword,
            role
        });

        return res.status(201).json({
            message: "Account created successfully",
            success: true
        });
    } catch (error) {
        console.log("Error during registration:", error);
        return res.status(500).json({
            message: "An error occurred during registration",
            success: false
        });
    }
};

export const login = async (req, res) => {
    try {
        const {email, password, role} = req.body;
        if(!email || !password || !role){
            return res.status(400).json({
                message: "Something is missing",
                success: false
            })
        }

        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                message: "Incorrect email or password",
                success: false
            })
        }

        const isPassWordMatch = await bcrypt.compare(password, user.password);
        if(!isPassWordMatch){
            return res.status(400).json({
                message: "Incorrect email or password",
                success: false,
            })
        }

        // check role is correct or not
        if(role != user.role){
            return res.status(400).json({
                message: "Account doesn't match",
                success: false,
            })
        }

        const tokenData = {
            userId:user._id
        }
        const token = await jwt.sign(tokenData, process.env.SECRET_KEY,{expiresIn: '1d'});

        user = {
            _id:user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }
        return res.status(200).cookie("token", token, {maxAge: 1*24*60*60*1000, httpsOnly: true, sameSite: 'Strict'}).json({
            message: `Welcome back ${user.fullname}`,
            user,
            success: true

        })

    } catch (error) {
        console.log(error);
        
    }
}

export const logout = async (req,res) => {
    try{
        return res.status(200).cookie('token', {maxAge:0}).json({
            message: "Logged out sucessfully",
            success: true
        })
    }
    catch(error){
        console.log(error);
        
    }
}

export const updateProfile = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, bio, skills } = req.body;
        const file = req.file;  // Assuming you'll use this later for Cloudinary uploads

        // Validation Check (optional based on your needs)
        if (!fullname && !email && !phoneNumber && !bio && !skills) {
            return res.status(400).json({
                message: "Nothing to update",
                success: false
            });
        }

        let skillsArray;
        if (skills) {
            skillsArray = skills.split(",");  // Remove 'const' to use outer scope variable
        }

        const userId = req.id; // Ensure this is correctly set by your authentication middleware
        let user = await User.findById(userId);

        if (!user) {
            return res.status(400).json({
                message: "User not found",
                success: false,
            });
        }

        // Updating Profile data
        if (fullname) user.fullname = fullname;
        if (email) user.email = email;
        if (phoneNumber) user.phoneNumber = phoneNumber;
        if (bio) user.profile.bio = bio;
        if (skills) user.profile.skills = skillsArray;

        // Handle file uploads to Cloudinary here, if necessary

        await user.save();

        // Prepare the response object
        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        };

        return res.status(200).json({
            message: "Profile updated successfully",
            user,
            success: true
        });

    } catch (error) {
        console.log("Error during profile update:", error);
        return res.status(500).json({
            message: "An error occurred while updating the profile",
            success: false,
        });
    }
};
