var $ = require('jquery');
var handlebars = require('handlebars');

var accuracyChance = 6;
var k = 0;
var x = 0;
var y = 0;
var z = 0;
var accuracySelect = 0;
var barbaccuracySelect = 0;
var heroHealthStatus;
var barbHealthStatus;
var barbBaseHealth;
var heroBaseHealth;
var barb
var selected;
var checkSpecial = 0;

var barbCharacter;
var enemyCharacter;
var mainCharacter = {};

var attackButton = document.querySelector('.attack');
var heroInfoDisplay = document.querySelector('.display1');
var barbInfoDisplay = document.querySelector('.display2');
var waitDisplay = document.querySelector('.waitDisplay');
var heroElement = document.querySelector("#heroBar");
var enemyElement = document.querySelector("#goblinBar");
var heroWidth = 0;
var enemyWidth = 0;


function healthProgress(status, base) {
    if (heroWidth >= 100) {
        heroElement.style.width;
    } else {

        heroWidth = Math.floor(((status/base)*100));

        heroElement.style.width = heroWidth + '%';
        if (heroWidth <= 50 && heroWidth >= 20){
          heroElement.style.background = "yellow";
        }
        if (heroWidth < 20){
          heroElement.style.background = "red";
        }
        if (heroWidth <= 0){
          heroElement.style.background = "grey";
          // $(".display2").html('<div class="win">' + 'You have lost' + '</div>');
        }
    }
}

function enemyHealthProgress(status, base) {
    if (enemyWidth >= 100) {
        enemyElement.style.width;
    } else {
        enemyWidth = Math.floor(((status/base)*100));

        enemyElement.style.width = enemyWidth + '%';
        if (enemyWidth <= 50 && enemyWidth >= 20){
          enemyElement.style.background = "yellow";
        }
        if (enemyWidth < 20){
          enemyElement.style.background = "red";
        }
        if (enemyWidth <= 0){
          enemyElement.style.background = "grey";
        }
    }
}



function Character(){};
Character.prototype.attack = function(victim){
 return victim.health -= this.weapon;
}

Character.prototype.hammerAttack = function(victim){
 return victim.health -= (this.weapon * 2);
}
// Character.prototype.freeze = function(victim){
//     return console.log(victim + "has been frozen");
// }
Character.prototype.slasher = function(victim){
  return victim.health -= (this.weapon * 2);
}

Character.prototype.lightning = function(victim){
  return victim.health -= (this.weapon * 2);
}

Hero.prototype = new Character();
function Hero(config){
  this.health = config.health;
  this.pic = config.pic;
  this.weapon = config.weapon;
  this.accuracy = config.accuracy;
  this.evasion = config.evasion;
  this.name = config.name;

}

function Enemy(config){
  this.name = config.name;
  this.pic = config.pic;
  this.health = config.health;
  this.weapon = config.weapon;
  this.accuracy = config.accuracy;
  this.evasion = config.evasion;
}
Enemy.prototype = new Character();



////////////////////////////////////////////////////////////////////////////////
                            //FUNCTIONS//
////////////////////////////////////////////////////////////////////////////////


function missedTurn(){
  console.log('You missed a turn')
}


////////////////////////////////////////////////////////////////////////////////////
                            //ATTACK FUNCTIONS//
//////////////////////////////////////////////////////////////////////////////////////
function johnnyAttack(){
    x = Math.floor((Math.random() * 3) + 1);
    accuracySelect = x + mainCharacter.accuracy;
    z = Math.floor((Math.random() * 70) + 1);
    if (z >= 10 && z <= 14){
        $(".hero-button").append('<button class="attack" id="hammer">Hammer Attack</button>');
    }

    if (accuracySelect < enemyCharacter.evasion){
      missedTurn();
    } else {
      // johnnyAudio.play();
       barbHealthStatus = mainCharacter.attack(enemyCharacter);
      }
    setTimeout(function(){
      enemyCharacterAttack();
    }, 1000)
    enemyHealthProgress(barbHealthStatus, barbBaseHealth);

     $("#hammer").on('click', function(){
       barbHealthStatus = mainCharacter.hammerAttack(enemyCharacter);
       enemyHealthProgress(barbHealthStatus, barbBaseHealth);

       (this).remove();
     })


}//end of johnnyAttack



function kangAttack(e){

  x = Math.floor((Math.random() * 3) + 1);
  accuracySelect = x + mainCharacter.accuracy;
  z = Math.floor((Math.random() * 70) + 1);
  if (z >= 10 && z <= 14){
    $(".hero-buttons").append('<button class="attack" id="slash">Kang Slash</button>');
    // checkSpecial++;
  }
  if (accuracySelect < enemyCharacter.evasion){
      missedTurn();
  } else {
    barbHealthStatus = mainCharacter.attack(enemyCharacter);
  }
  setTimeout(function(){
    enemyCharacterAttack();
  }, 1000)
  enemyHealthProgress(barbHealthStatus, barbBaseHealth);

   $("#slash").on('click', function(){
     barbHealthStatus = mainCharacter.slasher(enemyCharacter);
     enemyHealthProgress(barbHealthStatus, barbBaseHealth);

     (this).remove();
   })

}//end of kangAttack

function lightningAttack(e){

  x = Math.floor((Math.random() * 3) + 1);
  accuracySelect = x + mainCharacter.accuracy;
  z = Math.floor((Math.random() * 70) + 1);
  if (z >= 10 && z <= 14){
    $(".hero-buttons").append('<button class="attack" id="lightning">Wizard Lightning</button>');
    checkSpecial++;
  }
  if (accuracySelect < enemyCharacter.evasion){
      missedTurn();
  } else {
    barbHealthStatus = mainCharacter.attack(enemyCharacter);

  }
  setTimeout(function(){
    enemyCharacterAttack();
  }, 1000)
  enemyHealthProgress(barbHealthStatus, barbBaseHealth);


  $("#lightning").on('click', function(){
    barbHealthStatus = mainCharacter.lightning(enemyCharacter);
    enemyHealthProgress(barbHealthStatus, barbBaseHealth);

    (this).remove();
  })

}//end of lightningAttack


function enemyCharacterAttack(){

    y = Math.floor((Math.random() * 3) + 1);
    barbaccuracySelect = y + mainCharacter.accuracy;

    if (barbaccuracySelect < mainCharacter.evasion){
      missedTurn();
    } else {
      heroHealthStatus = enemyCharacter.attack(selected);
      healthProgress(heroHealthStatus, heroBaseHealth);

    }
}//end of barbarianAttack



////////////////////////////////////////////////////////////////////////////////
                            //CHARACTER SELECTION//
////////////////////////////////////////////////////////////////////////////////


var barbarian = new Enemy({
   name: 'Goro',
   pic: "http://vignette2.wikia.nocookie.net/villains/images/e/e7/Goro.png/revision/latest?cb=20101119013750",
   health: 95,
   weapon: 6,
   accuracy: 5,
   evasion: 10

});
var goblin = new Enemy({
  name: 'Barakaman',
  pic: "http://vignette3.wikia.nocookie.net/mkwikia/images/3/34/Barakaman.png/revision/latest?cb=20150818231039",
  health: 89,
  weapon: 5.9,
  accuracy: 6,
  evasion: 9
})
var vodoo = new Enemy({
  name: 'Shinnok',
  pic: "http://vignette3.wikia.nocookie.net/mkwikia/images/9/96/Shinnok_Corrupted.png/revision/latest?cb=20150414180536",
  health: 75,
  weapon: 7,
  accuracy: 8,
  evasion: 7.9
})
barbCharacter = [barbarian, goblin, vodoo];

$("#johnny").click(function(){
  mainCharacter = new Hero({
    name: 'Johnny',
    pic: "http://vignette3.wikia.nocookie.net/mkwikia/images/a/ad/Johnnyjohnnyboyyy.png/revision/latest?cb=20150726045151",
    health: 100,
    weapon: 7,
    accuracy: 8,
    evasion: 7,
  });

  k = (Math.floor(Math.random() * 3));
  enemyCharacter = barbCharacter[k];
  barbBaseHealth = enemyCharacter.health;
  selected = mainCharacter;

  $(".hero-buttons").empty();   //jquery empty buttons
  $(".fight").append('<button class="attack">FIGHT</button>');
  // barbInfoDisplay.textContent = enemyCharacter.name;

  $('.heroName').html(mainCharacter.name);
  $('.display1').append('<img src =' + mainCharacter.pic + '>');
  $('.enemyName').html(enemyCharacter.name);
  $('.display2').append('<img src =' + enemyCharacter.pic + '>');
  heroBaseHealth = mainCharacter.health;

 // attackButton.addEventListener('click', johnnyAttack);
  $('.attack').on('click', function(){
    var buttonId = this.id;
    johnnyAttack(buttonId);
  })

})//end of johnny function

$("#raiden").click(function(){
  mainCharacter = new Hero({
    name: 'Raiden',
    pic: "http://img00.deviantart.net/e011/i/2015/130/c/4/mortal_kombat_x__pc____raiden__render_3__by_wyruzzah-d8suqaq.png",
    health: 70,
    weapon: 7.1,
    accuracy: 8,
    evasion: 7.3,
  });

  k = (Math.floor(Math.random() * 3));
  enemyCharacter = barbCharacter[k];
  barbBaseHealth = enemyCharacter.health;
  selected = mainCharacter;


  $(".hero-buttons").empty();   //jquery empty buttons
  $(".fight").append('<button class="attack">FIGHT</button>');

  heroInfoDisplay.textContent = mainCharacter.health;
  $('.heroName').html(mainCharacter.name);
  $('.display1').append('<img src =' + mainCharacter.pic + '>');
  $('.enemyName').html(enemyCharacter.name);
  $('.display2').append('<img src =' + enemyCharacter.pic + '>');


  heroBaseHealth = mainCharacter.health;


  $('.attack').on('click', function(){
    // var buttonId = this.id;
    lightningAttack();

  })
})//end of raiden function

$("#kang").click(function(){
  mainCharacter = new Hero({
    name: 'Liu Kang',
    pic: "http://vignette1.wikia.nocookie.net/mkwikia/images/e/e4/Liu_Kang_5.png/revision/latest?cb=20150516165245",
    health: 80,
    weapon: 7.9,
    accuracy: 8.5,
    evasion: 8
  });

  k = (Math.floor(Math.random() * 3));
  enemyCharacter = barbCharacter[k];
  barbBaseHealth = enemyCharacter.health;

  selected = mainCharacter;
  $(".hero-buttons").empty();   //jquery empty buttons
  $(".fight").append('<button class="attack">FIGHT</button>');


  $('.heroName').html(mainCharacter.name);
  $('.display1').append('<img src =' + mainCharacter.pic + '>');
  $('.enemyName').html(enemyCharacter.name);
  $('.display2').append('<img src =' + enemyCharacter.pic + '>');

  heroBaseHealth = mainCharacter.health;


  $('.attack').on('click', function(){
    var buttonId = this.id;
    kangAttack(buttonId);

  })
})//end of kang function
