const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const auth = require('../middleware/auth');

const mongoose = require('mongoose');
const User = mongoose.model('user');

router.post('/register', [
    check('username').isLength({ min: 8 }),
    check('password').isLength({ min: 8 }),
  ], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    let user = await User.findOne({ username: req.body.username })
    if (user) {
      return res.status(400).send('The user already exists');
    }
    const salt = await bcrypt.genSalt(10)
    const passcifrado = await bcrypt.hash(req.body.password, salt)
    user = new User({
      username: req.body.username,
      password: passcifrado,
    });
    await user.save()
    res.status(200).send(user)
  }) 
  
  
  // login
  router.post('/login', [
    check('username').isLength({ min: 8 }),
    check('password').isLength({ min: 8 })
  ], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
  
    let user = await User.findOne({ username: req.body.username })
  
    if (!user) {
      return res.status(400).send('Incorrect username or password')
    }
  
    const validatePassword = await bcrypt.compare(req.body.password, usuario.password)
  
    if (!validatePassword) {
      return res.status(400).send('Incorrect username or password')
    }
  
    const jwtoken = user.generatorJWT();
    res.status(201).send({ jwtoken })
  
  }) 

module.exports = router;
