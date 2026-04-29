import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const createToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });

const sendAuthResponse = (res, statusCode, message, user) => {
  const token = createToken(user._id);
  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.status(statusCode).json({
    success: true,
    message,
    data: {
      user: { id: user._id, name: user.name, email: user.email },
      token,
    },
  });
};

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Name, email and password are required', data: null });
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(409).json({ success: false, message: 'User already exists', data: null });
    }

    const user = await User.create({ name, email, password });
    return sendAuthResponse(res, 201, 'User registered successfully', user);
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message, data: null });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required', data: null });
    }

    const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ success: false, message: 'Invalid email or password', data: null });
    }

    return sendAuthResponse(res, 200, 'Login successful', user);
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message, data: null });
  }
};

export const logoutUser = async (req, res) => {
  res.cookie('token', '', { httpOnly: true, expires: new Date(0) });
  res.json({ success: true, message: 'Logout successful', data: null });
};

export const getUserProfile = async (req, res) => {
  res.json({
    success: true,
    message: 'Profile fetched successfully',
    data: { id: req.user._id, name: req.user.name, email: req.user.email },
  });
};
