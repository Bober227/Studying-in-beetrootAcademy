// const age = prompt("Скільки вам років?")
// if (isNaN(age)) {
//     console.log("Ви ввели неправильні дані")
// }
// else if (age <= 11) {
//     console.log("Ви дитина")
// }
// else if (age <= 17) {
//     console.log("Ви підліток")
// }
// else if (age <= 59) {
//     console.log("Ви дорослий")
// }
// else if (age >= 60) {
//     console.log("Ви пенсіонер")
// }



// const num = prompt("Введіть число від 0 до 9");
// if (isNaN(num)){
//     console.log("Ви ввели неправильні дані")
// }
// else if (num < 0 || num > 9){
//     console.log("Ви ввели число менше 0 або більше 9, будь ласка введіть число від 0 до 9 ")
// }
// switch (num){
//     case "1":
//     console.log("!");
//     break;

//     case "2":
//     console.log("@");
//     break;

//     case "3":
//     console.log("#");
//     break;

//     case "4":
//     console.log("$");
//     break;

//     case "5":
//     console.log("%");
//     break;

//     case "6":
//     console.log("^");
//     break;

//     case "7":
//     console.log("&");
//     break;

//     case "8":
//     console.log("*");
//     break;

//     case "9":
//     console.log("(");
//     break;

//     case "0":
//     console.log(")");
//     break;
// }



// const start_num =  parseInt (prompt ("Введіть початковий номер"));
// const end_num = parseInt (prompt("Введіть кінцевий номер"));
// let sum = 0; 
// if (isNaN(start_num) || isNaN(end_num)) {
//     console.log("Ви ввели неправильні дані")
// }
// else if (start_num > end_num) {
//     console.log("Початковий номер не може бути більше кінцевого")
// } else {
//     for (let i = start_num; i <= end_num; i++){
//         sum += i;
//     }
//     console.log(`Суму чисел в діапозоні від ${start_num} до ${end_num} становить ${sum}`)
// }



// const num_1 = parseInt(prompt("Введіть перше число"));
// const num_2 = parseInt(prompt("Введіть друге число"));
// let ncd
// if (isNaN(num_1) || isNaN(num_2)) {
//     console.log("Ви ввели неправильні дані")
// } else {
//     for (let i = 1; i <= num_1 && i <= num_2; i++) {
//         if (num_1 % i === 0 && num_2 % i === 0) {
//             ncd = i
//         }
//     }
//     console.log(`Найбільший спільник дільник цих чисел ${ncd}`)
// }



// const num = parseInt(prompt("Введіть число"));
// let d; 
// if (isNaN(num) || num <= 0 ) {
//     console.log("Ви ввели неправильні дані")
// } else {
//     console.log(`Дільниками числа ${num} є`)
//     for (let i = 1; i <= num; i++) {
//         if (num % i === 0)
//         console.log(i);
//     }
// }



// const suma_product = Number(prompt(`Введіть суму покупки:`));
// let result;
// if (suma_product < 200) {
//     result = suma_product;
// }
// else if (suma_product >= 200 && suma_product < 300) {
//     result = suma_product - (suma_product * 0.03);
// }
// else if (suma_product >= 300 && suma_product < 500) {
//     result = suma_product - (suma_product * 0.05);
// }
// else if (suma_product >= 500) {
//     result = suma_product - (suma_product * 0.07);
// }
// alert(`Сума до сплати зі знижкою: ${result}`)



// let positiveCount = 0;
// let negativeCount = 0;
// let zeroCount = 0;
// let evenCount = 0;
// let oddCount = 0;

// for (let i = 1; i <= 10; i++) {
//   const number = prompt(`Введіть число ${i}:`);

//   if (number > 0) {
//     positiveCount++;
//   } else if (number < 0) {
//     negativeCount++;
//   } else {
//     zeroCount++;
//   }

//   if (number % 2 === 0) {
//     evenCount++;
//   } else {
//     oddCount++;
//   }
// }

// console.log(`Додатніх чисел: ${positiveCount}`);
// console.log(`Ві'ємних чисел: ${negativeCount}`);
// console.log(`Нулів: ${zeroCount}`);
// console.log(`Парних чисел: ${evenCount}`);
// console.log(`Непарних чисел: ${oddCount}`);



// let day_Of_Week = "понеділок";
// let next_Day_Of_Week;
// let answer = true;

// while (answer) {
//   switch (day_Of_Week) {
//     case "понеділок":
//         next_Day_Of_Week = "вівторок";
//       break;
//     case "вівторок":
//         next_Day_Of_Week = "середа";
//       break;
//     case "середа":
//         next_Day_Of_Week = "четвер";
//       break;
//     case "четвер":
//         next_Day_Of_Week = "п'ятниця";
//       break;
//     case "п'ятниця":
//         next_Day_Of_Week = "субота";
//       break;
//     case "субота":
//         next_Day_Of_Week = "неділя";
//       break;
//     case "неділя":
//         next_Day_Of_Week = "понеділок";
//       break;
//     default:
//       break;
//   }

//   answer = confirm(`Сьогодні ${day_Of_Week}. Хочеш побачити наступний день?`);
//   day_Of_Week = next_Day_Of_Week;
// }



// function numbers(a, b) {
//     if (a < b) {
//         return -1;
//     }
//     else if (a < b) {
//         return 1;
//     }
//     else {
//         return 0;
//     }
// }

// function compare(a, b, c){
//     return Number(`${a}${b}${c}`);
// }

// console.log(compare(5,8,5));
// console.log(compare(86,33,21));



// function randomNumber(min, max) {
//     return Math.floor(Math.random() * (max - min + 1) + min);
// }

// console.log(randomNumber(10, 15))

// function factorial(n) {
//     if (n === 0 || n === 1) { 
//       return 1;
//     } else { 
//       return n * factorial(n - 1);
//     }
//   }

// console.log(factorial(3));



