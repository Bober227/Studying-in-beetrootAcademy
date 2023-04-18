// function numberOfArguments() {
//     console.log(arguments.length)
// }
// numberOfArguments(1, 2, 3, 4, 5, 6)



// function numbers(a, b) {
//     if (a < b) {
//         return -1;
//     }
//     else if (a > b) {
//         return 1;
//     }
//     else {
//         return 0;
//     }
// }
// console.log(numbers(7,6))



// function factorial(n) {
//     if (n === 0 || n === 1) { 
//       return 1;
//     } else { 
//       return n * factorial(n - 1);
//     }
//   }
// console.log(factorial(5));



// function compare(a, b, c){
//     return Number(`${a}${b}${c}`);
// }

// console.log(compare(5,8,5));
// console.log(compare(86,33,21));



// function areaOfRectangle(length, width) {
//     if (width === undefined ){
//         return length * length
//     }
//     else {
//       return length * width
//     }

// }
// console.log(areaOfRectangle(5,1))


function perfectNumber(a) {
    let sum = 0;
    let ostacha;
    for (let i = 1; i < a - 1; i++) {
        ostacha = a % i;
        if (ostacha === 0) {
            sum += i;
        }
    }
    return a === sum
    // if (a === sum) {
    //     console.log("Ваше число є ідеальним");
    // } else {
    //     console.log("Ваше число не є ідеальним");
    // }
}


function diapozon(min, max) {
    for (let i = min; i <= max; i++) {
        if (perfectNumber(i)) {
            console.log(`Ідеальні числа в цьому діапозоні:${i}`)
        } 
    }
}
console.log(diapozon(1, 500000000))


