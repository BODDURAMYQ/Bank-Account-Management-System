const User = require("../models/User");
const Account = require("../models/Account");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");

const normalizeRole = (role) => (role === "customer" ? "user" : role);

// Register User
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const accountNumber = `ACC-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const account = await Account.create({
      userId: user._id,
      accountNumber,
      accountHolderName: name,
      balance: 0,
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: normalizeRole(user.role),
      token: generateToken(user._id),
      accountId: account._id,
      accountNumber: account.accountNumber,
      balance: account.balance,
    });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ message: error.message });
  }
};

// Login User
const loginUser = async (req, res) => {
  try {
    console.log("Login attempt body:", req.body);

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const user = await User.findOne({ email });
    console.log("Found user:", user);

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Password match:", isMatch);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const account = await Account.findOne({ userId: user._id });

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: normalizeRole(user.role),
      token: generateToken(user._id),
      accountId: account?._id,
      accountNumber: account?.accountNumber,
      balance: account?.balance ?? 0,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { registerUser, loginUser };
