export const adminMiddleware = (req, res, next) => {
  try {
    if (!req.user || req.user.role?.toLowerCase() !== "admin") {
      return res.status(403).json({ message: "Access denied - Admin only!" });
    }

    next();
  } catch (error) {
    return res.status(500).json({ message: "Server Error", error });
  }
};
