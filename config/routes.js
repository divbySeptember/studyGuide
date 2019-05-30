const routes = require("express").Router();
const helper = require("./model.js");


const db = require('../database/dbConfig');
const model = require('./model');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { authenticate } = require('../auth/authentication');
const {generateToken }= require("../auth/generateToken");


module.exports = server => {
  server.get('/', (req, res) => {
    res.status(200).send(`
      <div>
        <h2>Server Running Live...</h2>
        <p>Url to Login endpoint <strong>'/api/login'</strong></p>
        <p>Url to Register endpoint <strong>'/api/register'</strong></p>
      </div>`);
  });


  //****************************** ENDPOINTS *****************************/
  server.post('/api/register', register);
  server.post('/api/teachregister', teachregister);
  server.post('/api/login', login);
  server.post('/api/teachlogin', teachlogin);
  server.get('/api/studentusers', authenticate, getStudentUsers);
  // server.get('/api/teacherusers', authenticate, getTeacherUsers);
  // server.get('/api/studentusers/:id', authenticate, getstudentUser);
  // server.get('/api/teacherusers/:id', authenticate, getteacherUser);
  // server.put('/api/studentusers/:id', authenticate, updateStudentUser);
  // server.put('/api/teacherusers/:id', authenticate, updateTeacherUser);
  // server.delete('/api/studentusers/:id', authenticate, deleteStudentUser);
  // server.delete('/api/teacherusers/:id', authenticate, deleteTeacherUser);
  // server.post('/api/studentlinks', authenticate, createStudentLinks);
  // server.post('/api/teacherlinks', authenticate, createTeacherLinks);
  // server.get('/api/studentlink', authenticate, getStudentLink);
  // server.get('/api/teacherlink', authenticate, getTeacherLink);
  // server.get('/api/studentlink/:id', authenticate, getStudentLinks);
  // server.get('/api/teacherlink/:id', authenticate, getTeacherLinks);
  // server.get('/api/student/links/:id', authenticate, getStuUserlinks);
  // server.get('/api/teacher/links/:id', authenticate, getTeachUserlinks);
  // server.put('/api/stulinks/:id', authenticate, updateStudentLinks);
  // server.put('/api/teachlinks/:id', authenticate, updateTeacherLinks);
  // server.delete('/api/delstulink/:id', authenticate, deleteStuLinks);
  // server.delete('/api/delteachlink/:id', authenticate, deleteTeachLinks);


  //********************  STUDENT REGISTER NEW USER ******************/

  function register(req, res) {
    const { username, password, fullName, email, studentImg, } = req.body;
    const creds = { username, password, fullName, email, studentImg};
    const hash = bcrypt.hashSync(creds.password, 10);
    creds.password = hash;
  
    if (!creds.studentImg) {
      creds.studentImg =
        'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';
    }
    if (!username || !password || !fullName || !email) {
      return res.status(412).json({
        errorMessage: `One or more inputs missing, username, password, fullName and email are Required fields.`,
      });
    }
  
    db('studentsUsers')
      .insert(creds)
      .then(ids => {
        const id = ids[0];
  
        db('studentsUsers')
          .where({ id })
          .first()
          .then(user => {
            res
              .status(201)
              .json({
                id: user.id,
                message: 'User registration Successful.',
              })
              .catch(err =>
                res.status(500).json({ message: 'Unable to register new User.' }),
              );
          })
          .catch(err =>
            res.status(500).json({ message: 'Error registering User.' }),
          );
      });
  }



  //************* Teacher Register ***************//


  function teachregister(req, res) {
    const { username, password, fullName, email, teacherImg, } = req.body;
    const creds = { username, password, fullName, email, teacherImg};
    const hash = bcrypt.hashSync(creds.password, 10);
    creds.password = hash;
  
    if (!creds.teacherImg) {
      creds.teacherImg =
        'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';
    }
    if (!username || !password || !fullName || !email) {
      return res.status(412).json({
        errorMessage: `One or more inputs missing, username, password, fullName and email are Required fields.`,
      });
    }
  
    db('teacherUsers')
      .insert(creds)
      .then(ids => {
        const id = ids[0];
  
        db('teacherUsers')
          .where({ id })
          .first()
          .then(user => {
            res
              .status(201)
              .json({
                id: user.id,
                message: 'User registration Successful.',
              })
              .catch(err =>
                res.status(500).json({ message: 'Unable to register new User.' }),
              );
          })
          .catch(err =>
            res.status(500).json({ message: 'Error registering User.' }),
          );
      });
  }

  
  //******************** LOGIN USER ******************/
  function login(req, res) {
    const { username, password } = req.body;
    const creds = { username, password };
  
    db('studentsUsers', 'teacherUsers')
      .where({ username: creds.username })
      .first()
  
      .then(user => {
        if (user && bcrypt.compareSync(creds.password, user.password, 10 )) {
          const token = generateToken(user);
          res.status(200).json({
            message: `Welcome ${user.username}! Token registered...`,
            user,
            token,
          });
        } else {
          res.status(401).json({ message: 'Invalid Credentials, try again...' });
        }
      })
      .catch(err =>
        res.status(400).json({
          message: 'No valid user credentials provided, please register...',
        }),
      );
  }



   //******************** TEACHER LOGIN ******************/
  function teachlogin(req, res) {
    const { username, password } = req.body;
    const creds = { username, password };
  
    db('teacherUsers')
      .where({ username: creds.username })
      .first()
  
      .then(user => {
        if (user && bcrypt.compareSync(creds.password, user.password, 10 )) {
          const token = generateToken(user);
          res.status(200).json({
            message: `Welcome ${user.username}! Token registered...`,
            user,
            token,
          });
        } else {
          res.status(401).json({ message: 'Invalid Credentials, try again...' });
        }
      })
      .catch(err =>
        res.status(400).json({
          message: 'No valid user credentials provided, please register...',
        }),
      );
  }


//***************** Get StudentLinks *********************/

function getStudentUsers(req, res) {

}

}



