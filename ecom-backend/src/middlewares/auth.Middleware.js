import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  try {
    // 1️⃣ Token should come from headers
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized — Token missing" });
    }

    // 2️⃣ Extract token (remove "Bearer ")
    const token = authHeader.split(" ")[1];

    // 3️⃣ Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 4️⃣ Attach userId to req.user for next controllers
    req.user = {
      id : decoded.userId,
      role : decoded.role
    }

    // 5️⃣ Continue to next process
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or Expired Token", error });
  }
};
