function create(req, res) {
  res.status(200).json({ message: `Creating room for ${req.body.name}` });
}

module.exports = {
  create,
};
