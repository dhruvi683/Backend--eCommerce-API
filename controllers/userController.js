const User = require('../schemas/User');

// Get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        if (!users.length) {
            return res.status(200).json({ message: "No users found in the database" });
        } else {
            return res.status(200).json(users);
        }
    } catch (error) {
        return res.status(500).json(error);
    }
};

// Get one user by ID
const getOneUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        if (user) {
            return res.status(200).json({ user });
        } 
        return res.status(404).json({ message: 'User not found' });
    } catch (error) {
        return res.status(500).json(error);
    }
};

// Create a new user
const createUser = async (req, res) => {
    try {
        const { name, email, address } = req.body;
        const newUser = new User({
            name,
            email,
            address,
        });

        const savedUser = await newUser.save();
        return res.status(201).json(savedUser);
    } catch (error) {
        return res.status(500).json(error);
    }
};

// Update an existing user by ID
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, address } = req.body;

        const updatedUser = await User.findByIdAndUpdate(
            id,
            { name, email, address },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }else {
            res.status(200).json({ msg: "user updated successfully", updatedUser });
        }
    } catch (error) {
        return res.status(500).json(error);
    }
};

// Delete a user by ID
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }else{
            return res.status(200).json({ message: 'User deleted successfully', deletedUser });
        }
    } catch (error) {
        return res.status(500).json(error);
    }
};

module.exports = {
    getAllUsers,
    getOneUser,
    createUser,
    updateUser,
    deleteUser,
};
