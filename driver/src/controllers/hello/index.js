const sayHello = (req, res) => {
    res.status(200)
      .contentType('application/json')
      .json({"message": "Hello World"});
};

export default { sayHello };