//CONTROLLER FOLDER
const userService = require ('../services/users');
const emailService = require('../services/emailService');

module.exports.dispayAllUsers = async (req, res) => {
    try{
        const users = await userService.dispayAllUsers();
        res.send({users});
    }catch(err){
        res.status(500);
        res.send({error:err});
    }
}
// Get User Profile
module.exports.getUser = async (req, res) => {
    try {
        const userEmail = req.params.email; // Get user email from the request parameters
        const user = await userService.getUser(userEmail); // Call the service to retrieve the user profile
        res.send({ user }); // Return the user data
    } catch (err) {
        // Handle errors by sending a 404 Not Found status and the error message
        res.status(404).send({
            error: err.message
        });
    }
};
module.exports.postUser= async(req, res)=>{
    //console.log("Received data:", req.body);
    try {
      const userInfo = req.body; // Get user data from the request body  
      const createdUser = await userService.addUser(userInfo);
      return res.status(201).send({
          msg: 'User created successfully.',
          userId: createdUser._id
      });
  } catch (err) {
      return res.status(400).send({
          error: err.message
      });
  }
};

// Put User Profile (Update)
module.exports.putUser = async (req, res) => {
    try {
        const userEmail = req.params.email; // Get user email from the request parameters
        const updateData = req.body; // Get the update data from the request body
        const updatedUser = await userService.updateUser(userEmail, updateData); // Call the service to update the user profile
        res.send({ user: updatedUser }); // Return the updated user data
    } catch (err) {
        // Handle errors by sending a 400 Bad Request status and the error message
        res.status(400).send({
            error: err.message
        });
    }
};

// Delete User Account
module.exports.deleteUser = async (req, res) => {
    try {
        const userEmail = req.params.email; // Get user email from the request parameters
        const deletedUser = await userService.deleteUser(userEmail); // Call the service to delete the user account
        res.send({ message: 'User account deleted successfully', user: deletedUser }); // Return success message and deleted user data
    } catch (err) {
        // Handle errors by sending a 400 Bad Request status and the error message
        res.status(400).send({
            error: err.message
        });
    }
};

// module.exports.loginUser = async (req, res) => {
//     try {
//         const { email, password } = req.body; // Get email and password from request body
//         const user = await userService.authenticateUser(email, password); // Authenticate user
//         res.send({
//             message: 'Login successful',
//             user: {
//                 email: user.email,
//                 fname: user.fname,
//                 lname: user.lname,
//                 role: user.role,
//             },
//         });
//     } catch (err) {
//         res.status(401).send({
//             error: err.message,
//         });
//     }
// };

module.exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.query;

        if (!email || !password) {
            return res.status(400).send({ error: 'Email and password are required' });
        }

        const user = await userService.authenticateUser(email, password); // Call the service function
        if (!user) {
            return res.status(401).send({ error: 'Invalid email or password' });
        }

        res.send({
            message: 'Login successful',
            user: {
                email: user.email,
                fname: user.fname,
                lname: user.lname,
                role: user.role,
            },
        });
    } catch (err) {
        console.error('Error during login:', err.message);
        res.status(401).send({ error: err.message });
    }
};

