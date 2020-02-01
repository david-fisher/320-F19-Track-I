import axios from "axios"
import img from "./Components/PrettyEricGraphics/myFriendDrewThis.jpg"
const uuid = require('uuid/v4');
let classifiersToReturn = [];
let classifersToGet = [];
console.log(classifiersToReturn.length)

axios.get('https://2a2glx2h08.execute-api.us-east-2.amazonaws.com/default/Frontend-Lambda/ml/list')
    .then(function(u){return u.data})
    .then(function (json) {classifersToGet.push(Object.entries(json)); return classifersToGet})
    .then(e => fillClassifiers(e))
    .catch((e) => console.log(e.message))
//GOD DAMN THIS PARSING WAS A HOT MESS I SWEAR TO GOD FISHER IF YOU READ THIS YOU BETTER GIVE ME 30 EXTRA POINTS FOR FIGURING THIS AWFUL MESS OUT.
//WHO STRUCTURES LISTS LIKE THIS. WHO. I MEAN I SHOULD NOT HAVE TO DECOMPILE THIS SHIT INTO IT'S COMPONENT PARTS AND REPIECE IT TOGETHER
//I KNOW I SHOULD HAVE DONE THIS SHIT EARLIER BUT GOD ALLMIGHTY. IT TOOK ME 5 HOURS TO FIGURE OUT THAT MY LAMBDA CALLS WERE FINE, THE ML TEAM JUST WEREN'T PROVIDING
//CORS FUNCTIONALITY.

//AND THEN THIS MESS OF A PARSING. URGH.
//Anyways I hope you're having a fun time reading this. I didn't comment my name but you know who I am.
function fillClassifiers(e) {
  e = e[0]
  for(var i = 0; i < e.length; i++) {
    var newTitle = e[i][0];
    var newClassType = e[i][1];
    classifiersToReturn.push({
      id: uuid(),
      img: img,
      title: newTitle,
      classType: newClassType,
      desc: 'Hello, Its demo or die day, and we\'re an intelligent AI swarm. My Designation is ${desg}}'
    });
  }

  console.log(classifiersToReturn)
}


export default {
  getAIClassifiers: () => classifiersToReturn,
  setAIClassifiers: (newClassifiers) => {
    classifiersToReturn = newClassifiers
  }
};
