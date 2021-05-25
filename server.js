const express = require('express');
const bcrypt = require('bcrypt-node');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register.js');
const signin = require('./controllers/signin.js');
const profile = require('./controllers/profile.js');
const image = require('./controllers/image.js');
const score = require('./controllers/score.js');

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : 'sudo',
      database : 'smartbrain'
    }
  });

const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json())
app.use(cors())

app.get('/',(req, res)=> {
  db.select('*').from('users')
  .then(users => res.json("Server is working!!",users))
  .catch((err)=>res.status(400).json("Server is not working ", err))
})

app.post('/signin', (req, res)=> {signin.handleSignIn(req, res, db, bcrypt)});

app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)});
//dependencies injection

app.get('/profile/:id', (req, res)=> {profile.handleProfile(req, res, db)});

app.put('/image', (req, res) => {image.handleImage(req, res, db)});

app.post('/imageurl', (req, res) => {image.handleApiCall(req, res)});

app.get('/score', (req, res)=> {score.handleScore(req, res, db)});

app.listen(process.env.PORT || 3000, () => console.log(`Server is running on port ${process.env.PORT}`))


