// @TODO: Uncomment the following file and complete the code
//        according to the instructions in README.md.

//Roster of player
var roster = [{
  name: "Doug",
  position: "Quarterback",
  madeTeam: true
},
{
  name: "Antonio",
  position: "Tight End",
  madeTeam: true
},
{
  name: "Nick",
  position: "Kicker",
  madeTeam: false
},
{
  name: "Ereck",
  position: "Offensive Live",
  madeTeam: false
},
{
  name: "AJ",
  position: "Line Backer",
  madeTeam: true
}];

// YOUR CODE HERE
onTheTeam = roster.filter(player => player.madeTeam)

console.log(onTheTeam);
console.log(`Number of players on the team is ${onTheTeam.length}`)
console.log(`Number of players cut is ${roster.length - onTheTeam.length}`)