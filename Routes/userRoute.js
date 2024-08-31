const express = require('express');
const {
    getAllUsers,
    getOneUser,
    createUser,
    updateUser,
    deleteUser,
} = require('../controllers/userController');

const userRouter = express.Router();

userRouter.route('/')
    .get(getAllUsers)    // Get all users
    .post(createUser);  // Create a new user

userRouter.route('/:id')
    .get(getOneUser)    // Get a specific user by ID
    .put(updateUser)    // Update a specific user by ID
    .delete(deleteUser); // Delete a specific user by ID

module.exports = userRouter;

