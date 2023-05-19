const jwt = require('jsonwebtoken')

// const auth = async(req, res, next) => {
// try {
//   const token = req.header('Authorization').replace('Bearer ', '')
//   const decoded = jwt.verify(token, process.env.JWT_SECRET)
//   const user = await User.findOne({ _id: decoded._id, 'tokens.token':token })
// if(!user) {
// throw new Error
// }
//   req.token = token
//   req.user = user
// next()
// } catch (error) {
// res.status(401).send({error: "Authentication required"})
//  }
// }
 
const auth = (req, res, next) => {
  const authHeader = req.headers.token;
  if (authHeader) { 
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) res.status(403).json("Token is not valid!");
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json("You are not authenticated!");
  }
};
module.exports = auth