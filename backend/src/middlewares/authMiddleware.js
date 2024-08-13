import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1]; // Get the token from the Authorization header

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Decode the token using the secret key
    // console.log("Decoded Token:", decoded); // Log the decoded token
    req.user = decoded.user; // Attach the user information to req.user
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    console.error("Token verification failed:", err.message);
    res.status(401).json({ message: "Token is not valid" });
  }
};

export default auth;
