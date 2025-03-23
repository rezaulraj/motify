import { User } from "../model/userModel.js";

class userController {
  getAllUsers = async (req, res, next) => {
    try {
      const currentUserId = req.auth.userId;
      // clerkId is not equal to currentUserId
      const users = await User.find();
      if (users.length === 0) {
        return res.status(404).json({ message: "No users found." });
      }
      return res.status(200).json(users);
      console.log("res.status(200).json(users)", res.status(200).json(users));
    } catch (error) {
      console.log("Error in getALlUsers");
      next(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };
}

export default new userController();
