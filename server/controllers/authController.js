const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Generate JWT Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "30d"
    });
};

// Register User
const register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        // Validation
        const errors = [];

        if (!name || name.trim() === "") {
            errors.push("Name is required.");
        } else if (name.trim().length < 2) {
            errors.push("Name must be at least 2 characters.");
        }

        if (!email || email.trim() === "") {
            errors.push("Email is required.");
        }

        if (!password) {
            errors.push("Password is required.");
        } else if (password.length < 6) {
            errors.push("Password must be at least 6 characters.");
        }

        if (errors.length > 0) {
            return res.status(400).json({
                success: false,
                message: "Validation Failed",
                errors
            });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email: email.toLowerCase() });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "An account with this email already exists"
            });
        }

        // Create user
        const user = await User.create({
            name: name.trim(),
            email: email.toLowerCase().trim(),
            password
        });

        res.status(201).json({
            success: true,
            message: "Account created successfully",
            data: {
                _id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id)
            }
        });

    } catch (error) {
        next(error);
    }
};

// Login User
const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Validation
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please provide email and password"
            });
        }

        // Find user and include password for comparison
        const user = await User.findOne({ email: email.toLowerCase() }).select("+password");

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        // Check password
        const isMatch = await user.matchPassword(password);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        res.status(200).json({
            success: true,
            message: "Login successful",
            data: {
                _id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id)
            }
        });

    } catch (error) {
        next(error);
    }
};

// Get User Profile
const getProfile = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.status(200).json({
            success: true,
            data: {
                _id: user._id,
                name: user.name,
                email: user.email,
                createdAt: user.createdAt
            }
        });

    } catch (error) {
        next(error);
    }
};

module.exports = {
    register,
    login,
    getProfile
};
