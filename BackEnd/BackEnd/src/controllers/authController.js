import { User } from "../model/userModel.js";

class authCalbackController {
  userAuth = async (req, res, next) => {
    try {
      const { id, firstName, lastName, imageUrl } = req.body;
      const user = await User.findOne({ clerkId: id });
      if (!user) {
        await User.create({
          clerkId: id,
          fullName: `${firstName} ${lastName}`,
          imageUrl,
        });
      }
      res.status(201).json({ success: true });
    } catch (error) {
      console.log("Error in post auth route", error);
      next(error);
    }
  };
}

export default new authCalbackController();
