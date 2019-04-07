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
  console.log("===================")
  console.log(`id: ${id}`)
  // console.log('params', req.params)
  // console.log('==============', req.query);
  const chosen_quantity = parseInt(req.query.quantity)
  const chosen_method = req.query.choose_method
  // http://localhost:4545/cohorts/9
  // http://localhost:4545/cohorts/9?choose_method=Number+Per+Team&quantity=4
  console.log(`req.query.logo_url: ${req.query.logo_url}`)
  console.log(`req.query.name: ${req.query.name}`)
  console.log(`req.query.members: ${req.query.members}`)
  console.log(`req.query.name: ${req.query.name}`)
  console.log(`req.query.job: ${req.query.job}`)
  
  console.log(`req.query: ${req.query}`)
  console.log(``)
  console.log(`method: ${chosen_method} and quantity: ${chosen_quantity}`)

  knex("cohort")
    .where("id", id)
    .first()
    .then(cohort => {

      console.log(`cohort_id: ${cohort.id}`)
      console.log(`cohort_logo_url: ${cohort.logo_url}`)
      console.log(`cohort_members: ${cohort.members}`)
      console.log(`cohort_name: ${cohort.name}`)
      if (cohort) {
        if(!chosen_method){
          res.render("cohorts/show", {
            id: cohort.id,
            name: cohort.name,
            logo_url: cohort.logo_url,
            members: cohort.members,
            list_of_members: []
          });
        }else{
          res.render("cohorts/show",{
            id: cohort.id,
            name: cohort.name,
            logo_url: cohort.logo_url,
            members: cohort.members,
            list_of_members: executeMethodOnMembers(
              members = cohort.members, 
              method=chosen_method,
              quantity=chosen_quantity
              )
          })
        }
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



function executeMethodOnMembers(members, method, quantity) {
  const members_list = members.split(",")
  const length_members_list = members_list.length //10
  const loopCount = Math.ceil(length_members_list / quantity) //3
  let list_of_teams = []
  let team = []
  let x=0;
  let y=0;
  if(method === "Team Count"){
    x = quantity;
    y = loopCount;
  }else if(method ==="Number Per Team"){
    x = loopCount;
    y = quantity;
  }
  for(let i= 0; i < x; i++){
    for(let j= 0; j < y;j++){
      const random_member = members_list.sort(() =>{
        return 0.5 - Math.random()
      })[0]
      team.push(random_member)
      members_list.shift()
      if(members_list.length ==0)
        break;
    }
    list_of_teams.push(team)
    team = []
  }
  return list_of_teams
}

module.exports = router;
