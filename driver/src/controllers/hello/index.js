const sayHello = (req, res) => {
    res.status(200)
      .contentType('application/json')
      .json({"message": "Hello World"});
};

const updateHello = (req, res) => {
  const payload = req.body;

  res.status(200)
    .contentType('application/json')
    .json(payload);
};

export default { sayHello, updateHello };