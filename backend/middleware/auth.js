const jwt = require("jsonwebtoken");        //utilisation d"un token d"authentification
 
module.exports = (req, res, next) => {      //paramètres d"utilisation du token
   try {
       const token = req.headers.authorization.split(" ")[1];
       const decodedToken = jwt.verify(token, process.env.TOKEN);
       const userId = decodedToken.userId;
       req.auth = {
           userId: userId
       };
	next();
   } catch(error) {
       res.status(401).json({ error });
   }
};