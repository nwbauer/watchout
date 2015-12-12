

// start slingin' some d3 here.

//game settings

var up = 87;
var down = 83;
var left = 65;
var right = 68;

var health = 100;

var inCollision = false;
var collisions = 0;

var movement = 7;

var gameRunning = false;


//implementation details

var gameboard = d3.select('svg').selectAll('circle');
var heroData = {
  color: 'orange',
  x: 60,
  y: 60,
  r: 5
};
var hero = gameboard.data([heroData]).enter().append('circle');

hero.attr('class', 'hero').attr('cx', function(d){ return d.x; }).attr('cy', function(d){ return d.y; }).attr('r', function(d){ return d.r; }).style('fill', function(d){ return d.color;});;
var keypressed;
var planet;
var solarSytem = [];


var colors = ['yellow', 'red', 'blue', 'green', 'purple'];

for (var i = 0; i < colors.length; i++) {
  planet = {};
  planet.color = colors[i];
  planet.x = random(100);
  planet.y = random(100);
  planet.r = random(10);
  planet.distance = distanceFunc(planet.x, heroData.x, planet.y, heroData.y) - (planet.r + heroData.r);

solarSytem.push(planet);
};


var pieces = gameboard.data(solarSytem).enter().append('circle');
pieces.transition().duration(1000).attr('cx', function(d){ return d.x; }).attr('cy', function(d){ return d.y; }).attr('r', function(d){ return d.r; }).style('fill', function(d){ return d.color;});
console.log(gameboard[0]);

d3.select('svg').on('click', function(d) {
  //console.log(this);
  gameRunning = true;

  setInterval(function(){
    if(gameRunning){
      d3.selectAll('circle:not(.hero)').transition().tween('circle', function() {return checkingContact.bind(this);}).ease(d3.ease('linear')).duration(1000).attr('cx', function (d) { d.x = random(100); return d.x; }).attr('cy', function (d) { d.y = random(100); return d.y; });
    };
  }, 2000);
});

d3.select('body').on('keyup', function (){
  keypressed = d3.event.which;
  //console.log(keypressed);
  //alert('keycode');
  var hero = d3.select('.hero');
  
  if(keypressed === up){
    hero.transition().duration(100).attr('cy', function(d){ d.y -= movement; return d.y});
  }else if(keypressed === down){
    hero.transition().duration(100).attr('cy', function(d){ d.y += movement; return d.y});
  }else if(keypressed === left){
    hero.transition().duration(100).attr('cx', function(d){ d.x -= movement; return d.x });
  }else if(keypressed === right){
    hero.transition().duration(100).attr('cx', function(d){ d.x += movement; return d.x });
  } else if (keypressed === 32){
    d3.selectAll('circle:not(.hero)').each(function(d){ console.log(checkingContact.call(this,d,true))});
    debugger;
  }
})



function random (value){
    return Math.ceil(Math.random()*value);
}

function distanceFunc (x1, x2, y1, y2){
  return Math.sqrt(Math.pow(x1-x2, 2) + Math.pow(y1 - y2, 2));
};

function collisionGFunc(x1, x2, y1, y2, r1, r2){
  distanceFunc(x1, x2, y1, y2) - (r1 + r2);
  return distanceFunc(x1, x2, y1, y2) - (r1 + r2) < 0 ? true : false; 
}

function checkingContact(){

var x1 = Number(this.getAttribute('cx'));
var y1 = Number(this.getAttribute('cy'));
var r1 = Number(this.getAttribute('r'));

var x2 = heroData.x;
var y2 = heroData.y;
var r2 = heroData.r;

//if(debug || false){
//  console.log(d.color,distanceFunc(x1, x2, y1, y2) - (r1 + r2));
//}

  if(collisionGFunc(x1, x2, y1, y2, r1, r2) && !inCollision){
    //debugger
    collisions++;
    if(collisions%10){ health--;};

    
    d3.select('.collisions > span').text(health);
    if(health <= 0 && gameRunning){
      hero.style('fill', 'black')
      gameRunning = false;
      alert('GAME OVER');
    }

  }
};



