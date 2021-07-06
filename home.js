console.log('Hello');
// alert('yoo');

// var age = prompt('What is your age');
// document.getElementById('someText').innerHTML = age;


function greeting () {
    var name = prompt('What is you name?');
    var result = "Hello " + name;
    console.log(result);
}

//greeting();

function sumNumbers (num1, num2) {
    var result = num1 + num2;
    console.log(result);
}

//sumNumbers(10, 10);


function greetings(yourName){
    var result = "Hello " + yourName;
    console.log(result);
}

//var title = prompt('What is you name?');
//greetings(title);


/*
var num = 0;
while (num < 100){
    num += 1;
    console.log(num);
}
*/

/*for (num=0; num<100; num++){
    console.log(num);
}*/

// Data Types
let yourAge = 18;
let yourName = 'Bob';
let name = {first: 'Jane', last: 'Doe'};
let truth = false;
let groceries = ['apple', 'banana', 'oranges'];
let random;
let nothing = null;

//Strings in Javascript

let fruit = 'banana';
let moreFruits = 'banana\napple' //new line

console.log(fruit.length);
console.log(fruit.indexOf('nan'));
console.log(fruit.slice(2, 6));
console.log(fruit.replace('ban', '123'));
console.log(fruit.toUpperCase());
console.log(fruit.toLowerCase());
console.log(fruit.charAt(2));
console.log(fruit[2]);
console.log(fruit.split(',')); //split by comma
console.log(fruit.split('')); // split by char


//Array

let fruits = ['banana', 'apple', 'orange', 'watemelon'];
let moreFruit = new Array('banana', 'apple', 'orange', 'watemelon');

console.log(fruits[2]); //access value at index 2nd

fruits[0] = 'pear';

console.log(fruits);

for(let i = 0; i < fruits.length; i++){
    console.log(fruits[i]);
}


//array common methods

console.log('to string', fruits.toString());
console.log(fruits.join(' * '));
console.log(fruits.pop(), fruits);
console.log(fruits.push('blackberries'), fruits);

fruits[fruits.length] = 'kiwi';
console.log(fruits);

let vegetables = ['asparagus', 'tomato', 'broccoli'];
let allGroceries = fruits.concat(vegetables);
console.log(allGroceries);
console.log(allGroceries.reverse());
console.log(allGroceries.sort());


let someNumbers = [5, 10, 2, 12, 7, 22, 15];
console.log(someNumbers.sort(function(a, b) {return a-b}));
console.log(someNumbers.sort(function(a, b) {return b-a}));


let emptyArray = new Array();
for (let num = 0; num <=10; num++){
    emptyArray.push(num);
}
console.log(emptyArray);

// Objects in Javascript

let student = {
    first: 'Motahar',
    last: 'Hossain',
    age:30,
    height:165,
    studentinfo: function (){
        return this.first + '\n' + this.last;
    }
}

console.log(student.studentinfo());
student.age++
console.log(student.age);

