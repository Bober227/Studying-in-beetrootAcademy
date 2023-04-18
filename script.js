// Minimum 
// 2.
// Correct
let user_name;
let test123;
let $;
let _;

/* Wrong
let 1a; 
let test-t; 
let let; 
let return; 
let function; */

// Norma
const userName = prompt(`What is your name?`);
alert (`Hello ${userName}`);

const today_year = 2023; 
const year_of_birth = prompt(`Enter the year of your birth:`);
const your_year = today_year - year_of_birth;
alert (`You ${your_year} years old`);

const length_side_of_square = prompt(`The length of the side of the square:`);
const perimetr = length_side_of_square * 4; 
alert (`The perimeter of the square:${perimetr}`)

// Maximum
const radius = prompt(`Write the radius of a circle:`);
const circle_area = 3.14 * radius ** 2; 
alert (`The area of a circle: ${circle_area}`);

const distance = prompt("What is the distance in kilometers between the two cities?");
const time = prompt("How many hours do you want to take to reach your destination?");
const speed = distance / time;
alert(`You need to move at a speed of ${speed} km/hour to reach on time.`);

const dollars = prompt("Enter the amount in dollars:");
const exchange_rate = 0.92;
const euros = dollars * exchange_rate;
alert(`${dollars} dollars is equivalent to ${euros.toFixed(2)} euros.`);