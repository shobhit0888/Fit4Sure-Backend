const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Token not found" });
    }
    const isCustomAuth = token.length < 500;

    let decodedData;

    if (token && isCustomAuth) {
      try{
      decodedData = jwt.verify(token, process.env.TOKEN_SECRET);
      req.userId = decodedData?.id;
      }catch(error){
        return res.status(401).json({ message: "Invalid token" });
      }
    } else {
      decodedData = jwt.decode(token);
      req.userId = decodedData?.sub;
    }

    if (!req.userId) {
      return res.status(401).json({ message: "User ID not found in token" });
    }

    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = {
  auth,
};
