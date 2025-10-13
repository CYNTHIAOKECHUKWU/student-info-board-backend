const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ msg: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded; // { id, role, project } will be available
    next();
  } catch (err) {
    res.status(401).json({ msg: "Invalid or expired token" });
  }
};

// Optional: middleware to restrict access to admins only
const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin" && req.user.role !== "super") {
    return res.status(403).json({ msg: "Access denied. Admins only." });
  }
  next();
};

// Optional: restrict access by project name (if you add project field to users)
const authorizeProject = (allowedProjects) => {
  return (req, res, next) => {
    if (!allowedProjects.includes(req.user.project)) {
      return res.status(403).json({ msg: "Access denied for this project." });
    }
    next();
  };
};

module.exports = { protect, isAdmin, authorizeProject };
