const express = require('express');
const router = express.Router();

router.use((req,res,next) => {
  if (req.session.currentUser) {
    next();
  } else {
    res.redirect('/login')
  }

})

// GET /private
router.get('/private', (req, res, next) => {
  res.render('private')
})

module.exports = router;