module.exports = {
  secret: process.env.JWT_SECRET || "utjwebtoken",
  expiresIn: "1h" 
};
