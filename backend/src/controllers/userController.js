import {User} from "../models/User.js"; // Adjust the import based on your file structure

// Controller function to get all users
 const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export {getAllUsers};