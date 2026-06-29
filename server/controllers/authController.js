import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';


// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
    try {
        console.log('Body received:', req.body);

        //  Safe destructuring (fallback diya)
        const { name, email, password, role } = req.body || {};

        //  Agar body hi nahi aayi
        if (!req.body) {
            return res.status(400).json({ message: 'Request body is missing' });
        }

        if (!name || !email || !password) {
            return res.status(400).json({
                message: 'Please provide name, email and password'
            });
        }

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = await User.create({
            name,
            email,
            password,
            role: role || 'user',
        });

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id),
        });

    } catch (error) {
        console.error('Register error:', error.message);
        res.status(500).json({ message: error.message });
    }
};


// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
    try {
        //  Safe destructuring
        const { email, password } = req.body || {};

        if (!req.body) {
            return res.status(400).json({ message: 'Request body is missing' });
        }

        if (!email || !password) {
            return res.status(400).json({
                message: 'Please provide email and password'
            });
        }

        const user = await User.findOne({ email });

        if (user && (await user.matchPassword(password))) {
            return res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id),
            });
        }

        res.status(401).json({ message: 'Invalid email or password' });

    } catch (error) {
        console.error('Login error:', error.message);
        res.status(500).json({ message: error.message });
    }
};


// @desc Logout user
// @route POST /api/auth/logout

// LOGOUT
const logoutUser = (req, res) => {
    res
        .clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/"  // ✅ Important: same path jahan cookie set ki thi
        })
        .status(200)
        .json({
            success: true,
            message: "Logged out successfully"
        });
};

// GET ME
const getMe = async (req, res) => {
    res.status(200).json({
        success: true,
        user: req.user
    });
};

//  REFRESH TOKEN
const refreshTokenController = (req, res) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
        return res.status(401).json({ message: "No refresh token provided" });
    }

    try {
        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

        const newAccessToken = jwt.sign(
            { id: decoded.id },
            process.env.JWT_SECRET,
            { expiresIn: "15m" }
        );

        res.status(200).json({
            success: true,
            accessToken: newAccessToken
        });
    } catch (error) {
        res.status(403).json({ message: "Invalid refresh token" });
    }
};


export { registerUser, loginUser, logoutUser, getMe, refreshTokenController };