// const suma = 0.1 + 0.2; 
// alert (suma.toFixed(1));

// const number = ("1");
// const suma_2 = Number(number) + 2; 
// alert (suma_2);

// let size_of_flash = prompt("Введіть розмір флешки в гб:");
// size_of_flash = size_of_flash * 1000; 
// const amount_of_files = size_of_flash / 820; 
// alert(`Кількість файлів розміром 820мб що поміститься на флешку: ${amount_of_files.toFixed()}`);

// const suma_money = prompt("Введіть суму грошей в гаманці:");
// const chockolate = prompt("Введіть ціну шоколадки:");
// let number_of_chockolate = Math.floor(suma_money / chockolate);
// let reshta =  suma_money - number_of_chockolate * chockolate;
// alert (`Ви можете купити ${number_of_chockolate} шоколадок і ваша решта становить ${reshta.toFixed(2)}`);


// const number = prompt("Введіть тризначне:");
// const reversedNumber = number.split("").reverse().join("");
// alert(`Введене число ${number} обернене ${reversedNumber}.`);

// const deposit = parseFloat(prompt("Введіть суму депозиту:"));
// const monthlyRate = 0.05 / 12;
// const twoMonthRate = monthlyRate * 2;
// const interestAccrued = deposit * twoMonthRate;
// alert(`Відсотки нараховані на депозит в розмірі ${deposit} за 2 місяці при річній ставці 5% становить ${interestAccrued.toFixed(2)}.`);

// let arr = ["1", "2", "3", 4, ["some", "okay"], 5];

// for (let i = 0; i < arr.length; i++) {
//   console.log( arr[i] ); 
//     if(Array.isArray(element)){
//         for (let j = 0; i < element.length, j++){
//             console.log()
//         }
//     }
// }

// let count = Number(prompt("Введіть число:")) 
// while (count > 0 ){
//     console.log(count);
//     count-- ;
// }

// let number = prompt("Введіть кількість овець:"); 
//  if (number < 0 ) {
//     console.log("Ви ввели від'ємне число")
//  }
//  else {
//     let sheep = "";
//     for (let i = 1; i <= number; i++) {
//         sheep += i + " вівця...";
//       }
//       console.log(sheep);
//     }
 
let number = prompt("Введіть число");

for (let i = number; i > 0; i--){
    console.log(i);
}





