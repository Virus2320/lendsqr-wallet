import { Request, Response, NextFunction } from "express";

const fauxAuth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  // Simulate token validation
  const userId = parseInt(token.split(" ")[1], 10);
  if (!userId) {
    return res.status(401).json({ message: "Invalid token" });
  }
  req.body.userId = userId;
  next();
};

export default fauxAuth;
