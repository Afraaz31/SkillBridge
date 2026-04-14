const register = (req, res) => {
  res.status(200).json({ message: "Register route working" });
};

const login = (req, res) => {
  res.status(200).json({ message: "Login route working" });
};

module.exports = { register, login };
