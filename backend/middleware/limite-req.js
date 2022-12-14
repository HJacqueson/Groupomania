const rateLimit = require("express-rate-limit");

//limitation des requêtes
const apiLimiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	max: 50, 
	standardHeaders: true, 
	legacyHeaders: false,
})

module.exports = apiLimiter;