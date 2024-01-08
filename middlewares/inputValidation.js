const zod = require("zod");

const Users = zod.object({
  username: zod.string(),
  password: zod.string().min(4),
});

function inputValidation(req, res, next) {
  try {
    Users.parse({
      username: req.body.username,
      password: req.body.password,
    });
    next();
  } catch (error) {
    res.status(400).json({
        message:'Invalid Inputs'
    })
  }
}

module.exports = inputValidation;
