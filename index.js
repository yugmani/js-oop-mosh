// Import stylesheets
import './style.css';

//Object Literal method to create an object
// *******************************************************

const circle = {
  radius: 1, //properties
  location: {
    //properties
    x: 1,
    y: 1,
  },
  draw: function () {
    //method
    console.log('it draws');
  },
};

//Dot notation to access a member of an object;
circle.draw(); //it draws

//Bracket notation to access a member of an object;
console.log('bracket: ', circle['radius']); //1
console.log('bracket: ', circle['draw']); //bracket: ƒ draw()

// A method in object is also called a behavior.

// Factory or Constructor Function to create an object
// *******************************************************

// Object literal method is not a good way to create an object or duplicate it if it has at least one method.

//Factory function
function createCircle(radius) {
  return {
    radius, // radius: radius,
    draw: function () {
      console.log('it draws');
    },
  };
}

// call function
const circle1 = createCircle(1);
console.log(circle1); //{radius: 1, draw: ƒ}

//Constructor Function
function Circle(radius) {
  this.radius = radius;
  this.draw = function () {
    console.log('it draws');
  };
}

const circle2 = new Circle(2); //new key is to create new empty object then it will set the properties and methods.
console.log(circle2); //Circle {radius: 2, draw: ƒ}
console.log(Circle.name); //Circle
console.log(Circle.length); //1;
console.log(Circle.constructor); //ƒ Function()

//Adding properties
circle2.location = { x: 1 };
console.log(circle2); //Circle {radius: 2, draw: ƒ, location: {x : 1}}

//deleting properties
delete circle2.location;
console.log('After deleting location: ', circle2);
//After deleting location: After deleting location: Circle {radius: 2, draw: ƒ}

//iterating over an member of an object
for (let key in circle2) {
  console.log(key, circle2[key]);
}

// radius-> 2
// draw ƒ ()

//To list only properties not methods
for (let key in circle2) {
  if (typeof circle2[key] !== 'function') {
    console.log(key, circle2[key]);
  }
}

// radius ->2

//to list only property names(key)
const keys = Object.keys(circle2);
console.log('Keys only: ', keys); //Keys only: ["radius", "draw"]

const values = Object.values(circle2);
console.log('Values only: ', values); //Values only: [2, ƒ ()]

const entries = Object.entries(circle2);
console.log('All entries: ', entries); //All entries: [Array[2], Array[2]]

// check if an object has specific properties ---
if ('radius' in circle2) {
  console.log('Circle has a radius: ', circle2.radius);
  //Circle has a radius: 2
}

// ABSTRACTION
// 1: Hide the details
// 2: Show the essentials
function MyCircle(radius) {
  let color = 'red'; //this is not a part of the object, it's just a local variable
  this.radius = radius; //essential, no need to hide

  //scope is temporary and it dies after the execution of the function
  // but closure stays there even after the execution of function and can access local variables and variables of parent function.

  //We want to hide defaultLocation i.e. this shouldn't be accessible from outside
  // this.defaultLocation = { x: 0, y: 0 };
  let defaultLocation = { x: 0, y: 0 }; // implemented

  //We want to hide computeOptimumLocation i.e. this shouldn't be accessible from outside
  /*
  this.computeOptimumLocation = function () {
    //
  };
  */
  //implemented
  let computeOptimumLocation = function () {
    //
  };

  //essential, no need to hide
  this.draw = function () {
    // this.radius; //accessing members of an object

    // accessing private members
    computeOptimumLocation(); //implemented
    defaultLocation; //implemented

    console.log('it draws');
  };

  Object.defineProperty(this, 'defaultLocation', {
    //to make readable from outside of function
    get: function () {
      return defaultLocation;
    },
    set: function (value) {
      if (!value.x || !value.y) throw new Error('Invalid Location');
      defaultLocation = value;
    },
  });
}

const myCircle = new MyCircle(10);
console.log(myCircle.defaultLocation); // {x: 0, y: 0}
// myCircle.defaultLocation = 1; // Error: Invalid Location
myCircle.draw();

// let x = {} is similar to => let x = new Object();
// let str = new String();    //"", ''. ``
// let isDone = new Boolean();  //true, false
// let num = new Number() // 1,2,3

//call()
// apply()

// value Types vs reference Types
// ***********************************************

// Privitives are copied by their value (Number, String, Boolean, Symbol, undefined, null)
// Objects are copied by their reference.(Object, Function, Array)

// primitives
let x1 = 11;
let y1 = x1;
x1 = 22;
console.log('x1: ', x1); //22
console.log('y1: ', y1); //11

//Non-primitives
//ex1:
let x = 10;
function moreX(x) {
  x++;
  console.log(x);
}

moreX(x); //11
console.log('x: ', x); //10

//ex2:
let obj1 = { value: 100 };
function increaseValue(obj1) {
  obj1.value++;
  console.log(obj1.value);
}

increaseValue(obj1); //101
console.log(obj1.value); //101

//stopwatch exercise
// **************************************

function Stopwatch() {
  let startTime,
    endTime,
    running,
    duration = 0;

  this.start = function () {
    if (running) throw new Error('Stopwatch has already started.');

    running = true;
    startTime = new Date();
  };

  this.stop = function () {
    if (!running) throw new Error("Stopwatch hasn't been started.");
    running = false;
    endTime = new Date();
    const seconds = (endTime.getTime() - startTime.getTime()) / 1000;
    duration += seconds;
  };

  this.reset = function () {
    startTime = null;
    endTime = null;
    running = false;
    duration = 0;
  };

  Object.defineProperty(this, 'duration', {
    get: function () {
      return duration;
    },
  });
}

// const sw = new Stopwatch();
// console.log(sw);
// console.log(sw.start());
// console.log(sw.stop());
// console.log(sw.duration);
// sw.reset();
