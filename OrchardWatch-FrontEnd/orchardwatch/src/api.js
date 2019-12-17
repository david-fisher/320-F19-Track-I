const uuid = require('uuid/v4');

let classifiersToReturn = [];

for(let i = 0; i < 2; i += 1) {
  classifiersToReturn.push({
    id: uuid(),
    img: 'https://ballparkdigest.com/wp-content/uploads/2018/11/Rocky-Mountain-Vibes-300x300.jpg',
    title: `Stubbed AI Title ${i}`,
    desc: 'Spicy jalapeno bacon ipsum dolor amet kevin strip steak cow pastrami beef ribs tri-tip corned beef tongue. Leberkas meatball cow andouille boudin capicola pastrami biltong filet mignon turducken ground round pork pig pork belly. Swine frankfurter short ribs, leberkas beef ribs kielbasa fatback capicola. Chislic cupim kielbasa brisket landjaeger, buffalo fatback pork chop tongue pastrami kevin pancetta tail boudin venison. Beef ham hock corned beef andouille jowl. Pancetta tenderloin pig spare ribs capicola ham. Ham doner rump, chicken cow ball tip tongue chislic bacon bresaola shoulder.'
  });
}

export default {
  getAIClassifiers: () => classifiersToReturn,
  setAIClassifiers: (newClassifiers) => {
    classifiersToReturn = newClassifiers
  }
};
