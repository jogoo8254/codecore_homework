const express = require('express');
const router = express.Router();

router.get('/',(req,res)=>{
    res.send('<div>welcome</div>'); // render('welcome') home
});
router.get('/cohorts',(req,res)=>{
    res.sends('<div>Cohorts</div>'); // render('cohorts')
});

router.get('/cohorts/new',(req,res)=>{
    res.render('new');
});

// equivalence of one day!
const ONE_DAY = new Date(Date.now()+1*24*60*60*1000);

router.post('/',(req,res)=>{
    const { username } = req.body;
    res.cookie('username', username, {expires: ONE_DAY})
    res.redirect('/');
})

router.post('/sign_in', (req,res)=>{
    const username = req.body.username;
    res.cookie("username", username, {maxAge: ONE_DAY});
    res.redirect("/");
});
router.post('/sign_out',(req,res)=>{
    res.clearCookie("username");
    res.redirect("/");
});

module.exports = router;
