const express = require('express');
const router = express.Router();

const User = require('./../models/users')

// BCrypt to encrypt passwords
const bcrypt         = require("bcrypt");
const bcryptSalt     = 10;

///////////////////      signup       ////////////////////////

// GET /signup
router.get('/signup', (req,res,next) => {
  res.render('auth/signup');
})

// POST /signup
router.post('/signup', (req, res, next) => {
  const { username, password } = req.body;

  if (username === "" || password === "") {
    res.render("auth/signup", {
      errorMessage: "Indicate a username and a password to sign up"
    });
    return;
  }

  const salt     = bcrypt.genSaltSync(bcryptSalt);
  const hashPass = bcrypt.hashSync(password, salt);

  User.findOne( {username} )
    .then( user => {
      if (user !== null) {
        res.render("auth/signup", {
          errorMessage: "username already exists"
        });
      } else {
        const newUser = new User(
          {
            username : username,
            password : hashPass
          }
        )
      
        newUser.save()
          .then( user => {
            console.log('user', user);
            res.redirect('/signup')
          })
      }
    })
    .catch(err => console.log(`Error signup: ${err}`))
})

///////////////////      login       ////////////////////////

// GET /login
router.get('/login', (req, res, next) => {
  res.render('auth/login')
})

// POST /login
router.post('/login',(req,res,next) => {
  const { username, password } = req.body;

  if ( !username || !password ) {
    res.render('auth/login', { errorMessage: 'username and password need to filled in' })
    return;
  }

  User.findOne( { username } )
    .then( user => {
      if (!user) { 
        res.render('auth/login', { errorMessage: 'The username doesn t exist'});
        return;
      }
      if (bcrypt.compareSync(password, user.password)) {
        // Save the login in the session!
        req.session.currentUser = user;
        console.log('req.session.currentUser', req.session.currentUser)
        res.redirect('/login')
      } else {
        res.render('auth/login', { errorMessage: 'Wrong password' })
      }
    }) 
    .catch(err => { 
      next(err)
    })
    
////////////////////////       LOGOUT         //////////////////////
router.get("/logout", (req, res, next) => {
  req.session.destroy((err) => {
    // cannot access session here
    res.redirect("/login");
  });
});

})



module.exports = router;