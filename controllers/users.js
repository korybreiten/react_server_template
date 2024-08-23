const db = require('../config/database');
const Users = db.User;
const Op = db.Sequelize.Op;
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;
const bcrypt = require('bcryptjs');
const saltRounds = 6;


module.exports = {
  join,
  login,
  update,
  deleteProfile,
  getOne,
  getAll
};

async function join(req, res) {
  try {
    const email = req.body.email;

    const salt = bcrypt.genSaltSync(saltRounds);
    const password = bcrypt.hashSync(req.body.password, salt);

    const firstName = '';
    const lastName = '';

    const user = await Users.create({
      email,
      password,
      firstName,
      lastName
    });

    let userId = user.dataValues.id

    const token = createJWT({ userId });
    return res.status(201).json({ token });
    
  } catch (err) {
    return res.status(400).json(err);
  } 
}

async function login(req, res) {
  try {
    const user = await Users.findOne({ where: { email: req.body.email } });
    const password = user.dataValues.password;
    const userId = user.dataValues.id;

    if (!user) {
      console.log("User Not Found");
      return res.status(401).json({err: 'User Not Found'});

    } else {
      if (!user.validPassword(req.body.password, password)) {
          console.log("Invalid Password");
          return res.status(401).json({err: 'Invalid Password'});

      } else {
        console.log("Welcome to React Server Template!");
        const token = createJWT({ userId });
        return res.status(200).json({ token });
      };
    };
  } catch (err) {
    return res.status(401).json(err);
  };
};

async function update(req, res) {
  try {
    const user = await Users.findOne({ where: { id: req.params.id } });

    if (req.body.password) {
      const salt = bcrypt.genSaltSync(saltRounds);
      const password = bcrypt.hashSync(req.body.password, salt);
      await user.update({
        password: password
      });
    };

    await user.update({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      avatar: req.body.avatar
    });

    return res.status(200).json({});
  } catch (err) {
      return res.status(400).json(err);
  }
}

async function deleteProfile(req, res) {
  try {
    const user = await Users.findOne({ where: { id: req.params.id } });
    await user.destroy();

    return res.status(200);

  } catch (err) {
    return res.status(400).json(err);
  };
};

async function getOne(req, res) {
  try {
    const user = await Users.findOne({ where: { id: req.params.id } });
    delete user.dataValues.password;

    return res.status(200).json( user );

  } catch (err) {
    return res.status(400).json(err);
  };
};

async function getAll(req, res) {
  try {
    const data = await Users.findAll({ limit: 5 });
    let users = [];
    // Remove the password by not sending it
    data.forEach(function(user){
      const userData = {
        firstName: user.dataValues.firstName,
        lastName: user.dataValues.lastName,
        email: user.dataValues.email,
        avatar: user.dataValues.avatar
      };
      users.push(userData);
    });
    return res.status(200).json( users );

  } catch (err) {
    return res.status(400).json(err);
  };
};

/*----- Helper Functions -----*/

function createJWT(user) {
  return jwt.sign(
    {user}, // data payload
    SECRET,
    {expiresIn: '24h'}
  );
}
