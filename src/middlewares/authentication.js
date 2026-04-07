import { verifyToken } from "../utils/jwtoken.js";
import { getHeaderToken } from "../utils/utilities.js";

const isAuthenticated = (req, res, next) => {
  const token = getHeaderToken(req);

  if (!token) return res.status(401).json({ message: "No token provided" });
  try {
    const decodedToken = verifyToken(token);
    req.user = decodedToken;
    console.log("TOKEN", token);
    console.log("user", req.user);

    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

const authRoles = (...roles) => {
  console.log("ROLES : ", roles);

  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    console.log("ROLES : ", roles);
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied" });
    }

    next();
  };
};

export { isAuthenticated, authRoles };
