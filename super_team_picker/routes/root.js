const express = require('express');
const router = express.Router();
const knex = require("../db/client");

router.get('/',(req,res)=>{
    res.send('<div><h1>Welcome to Super Team Picker!</h1></div>'); // render('welcome') home
});
router.get('/cohorts/new',(req,res)=>{
  res.render('cohorts/new');
});

router.get("/cohorts/:id", (req, res) => {
  const id = req.params.id;
  console.log('==============', req.query);
  knex("cohort")
    .where("id", id)
    .first()
    .then(cohort => {
      if (cohort) {
        res.render("cohorts/single_cohort", {cohort});
      } else {
        res.send(`Cannot find cluck with id=${id}`);
      }
    });
});

// router.get("/cohorts/:id",(req,res) =>{
//   const fullName = request.query.fullName;
//   const favouriteColour = request.query.favouriteColour;
//   const message = request.query.message;

// })

// app.get("/thank_you", (request, response) => {

//   response.render("thankYou", {
//     fullName: fullName,
//     favouriteColour: favouriteColour,
//     favouriteDay: request.query.favouriteDay,
//     message: message
//   });
// });
  // NAME: cohort#create, METHOD: POST, PATH: /cohorts
  router.post("/cohorts/new", (req, res) => {
    const logo_url = req.body.logo_url;
    const name = req.body.name;
    const members = req.body.members;
    knex("cohort") // --- START SQL
      .insert({
        logo_url: logo_url,
        name: name,
        members: members
      })
      .returning("*") // --- END SQL
      .then(data => {
        const cohort = data[0];
        // -- EXECUTE SQL
        // res.render('cohorts/single_cohort');
        res.redirect(`/cohorts/${cohort.id}`)
      });
  });
  
router.get('/cohorts',(req,res)=>{
    res.render('cohorts/list_cohorts');
});

router.post('/',(req,res)=>{
    res.redirect('/');
})



function teamCount(members, quantity) {
  const list_of_members = members.split(", ")
  const length_list_members = list_of_members.length //10
  const loopCount = Math.ceil(length_list_members / quantity) //3
  let list_of_teams = []
  let team = []
  for(let i= 0; i < quantity; i++){
    for(let j= 0; j < loopCount;j++){
      let random_member = list_of_members(() =>{
        return 0.5 - Math.random()
      })[0].shift()//9
      team.push(random_member)
      if(list_of_members.length ==0)
        break;
    }
    list_of_teams.push(team)
    team = []
  }
  return list_of_teams
}

function numberPerTeam(members, quantity) {
  const list_of_members = members.split(", ")
  const length_list_members = list_of_members.length //10
  const loopCount = Math.ceil(length_list_members / quantity) //3
  let list_of_teams = []
  let team = []
  for(let i= 0; i < loopCount; i++){
    for(let j= 0; j < quantity;j++){
      let random_member = list_of_members(() =>{
        return 0.5 - Math.random()
      })[0].shift()//9
      team.push(random_member)
      if(list_of_members.length ==0)
        break;
    }
    list_of_teams.push(team)
    team = []
  }
  return list_of_teams
}


module.exports = router;
