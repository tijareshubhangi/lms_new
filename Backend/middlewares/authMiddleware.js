import jwt from "jsonwebtoken";
import authModel from "../models/authModel.js";

const checkIsUserAuthenticated = async (req, res, next) => {
  let token;
  const { authorization } = req.headers;
  if (authorization && authorization.startsWith("Bearer")) {
    try {
      token = authorization.split(" ")[1];
      // verify token
<<<<<<< HEAD
      const { userID } = jwt.verify(token, pleaseSubscribe);
=======
      const { userID } = jwt.verify(token, process.env.JWT_SECRET);
>>>>>>> 289ec6f157802e29f2ae8979fd65a007a654068f
      // Get User from Token
      req.user = await authModel.findById(userID).select("--password");
      next();
    } catch (error) {
      return res.status(401).json({ message: "unAuthorized User" });
    }
  } else {
    return res.status(401).json({ message: "unAuthorized User" });
  }
};

export default checkIsUserAuthenticated;
