const express = require('express');
const router = express.Router();
const knex = require("../db/client");

router.get('/',(req,res)=>{
    res.send('<div>welcome</div>'); // render('welcome') home
});
router.get('/cohorts',(req,res)=>{
    res.sends('<div>Cohorts</div>'); // render('cohorts')
});

router.post('/',(req,res)=>{
    res.redirect('/');
})

router.post('/sign_in', (req,res)=>{
    res.redirect("/");
});
router.post('/sign_out',(req,res)=>{
    res.redirect("/");
});
  
// NAME: cohort#new, METHOD: GET, PATH: /cohorts/new
router.get("/cohorts/new", (req, res) => {
  const id = req.params.id;
  const name = req.params.name;
  knex("cohort")
    // .where("name",name)
    .orderBy("created_at", "DESC")
    .then(cohorts => {
      if (cohorts) {
        res.render("cohorts/new", { cohorts });
      } else {
        res.send(`Cannot find cohort with id=${id}`);
      }
    });
  });
  
  // NAME: cohort#create, METHOD: POST, PATH: /cohorts
  router.post("/cohorts", (req, res) => {
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
        res.redirect(`/cohorts`);
      });
  });
  
  // NAME: cohort#show, METHOD: GET, PATH: /cohorts
  router.get("/cohorts", (req, res) => {
    const id = req.params.id;
    knex("cohort")
      // .where("id", id)
      .orderBy("created_at", "DESC")
      .then(cohorts => {
        if (cohorts) {
          res.render("cohorts/list_cohorts", { cohorts });
        } else {
          res.send(`Cannot find cohort with id=${id}`);
        }
      });
  });
  // NAME: cluck#show, METHOD: GET, PATH: /clucks/:id
  //            ðŸ‘‡ a wildcard match
  router.post("/cohorts/:id", (req, res) => {
    const id = req.params.id;
    knex("cohort")
      .where("id", id)
      .orderBy("created_at", "DESC")
      .then(cohort => {
        if (cohort) {
          res.render("cohorts/single_cohort", { cohort });
        } else {
          res.send(`Cannot find cluck with id=${id}`);
        }
      });
  });

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
