// Import the jsonwebtoken library
const jwt = require("jsonwebtoken");

// Middleware function to verify the JWT token in the Authorization header
const verifyToken = (req, res, next) => {
  // Get the Authorization header from the request
  const authHeader = req.headers.token;
  if (authHeader) {
    // Split the header to get the token value
    const token = authHeader.split(" ")[1];
    // Verify the token using the JWT library
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      // If the token is invalid, return an error response
      if (err) res.status(403).json("Token is not valid!");
      // Otherwise, add the decoded user information to the request object and proceed to the next middleware
      req.user = user; 
      next();
    });
  } else {
    // If the Authorization header is missing, return an authentication error response
    return res.status(401).json("You are not authenticated!");
  }
};

// Middleware function to verify the JWT token and check if the user is authorized to perform the action
const verifyTokenAndAuthorization = (req, res, next) => {
  // Call the verifyToken middleware to check the token
  verifyToken(req, res, () => {
    console.log(req.body.user);
    // Check if the user ID in the token matches the ID in the request parameters, or if the user is an admin
    if (req.body.user._id || req.user.isAdmin) {
      // If authorized, proceed to the next middleware
      next();
    } else {
      // If not authorized, return a forbidden error response
      res.status(403).json("You are not allowed to do that!");
    }
  });
};

// Middleware function to verify the JWT token and check if the user is an admin
const verifyTokenAndAdmin = (req, res, next) => {
  // Call the verifyToken middleware to check the token
  verifyToken(req, res, () => {
    // Check if the user is an admin
    if (req.user.isAdmin) {
      // If the user is an admin, proceed to the next middleware
      next();
    } else {
      // If the user is not an admin, return a forbidden error response
      res.status(403).json("You are not allowed to do that!");
    }
  });
};

// Export the middleware functions
module.exports = {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
};
