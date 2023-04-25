let shopingList = [
    { name: 'Яйця', number: 10, sold: true, priceForOne: 5, suma: 50 },
    { name: 'Молоко', number: 1, sold: false, priceForOne: 4, suma: 4 },
    { name: 'Банан', number: 7, sold: false, priceForOne: 3, suma: 21 },
    { name: 'Яблуко', number: 2, sold: true, priceForOne: 2, suma: 4 },
]

function displayShopingList(list) {
    const sortedLIst = list.sort((a, b) => a.sold - b.sold)
    sortedLIst.forEach(element => {
        console.log(`\nНазва: ${element.name} \nкількість: ${element.number} \nпродано:${element.sold} \nціна за штуку: ${element.priceForOne} \nсума: ${element.suma}`)
    });
}

function buyProduct(productName) {
    const elementIndex = shopingList.findIndex(element => element.name === productName);
    if (elementIndex !== 1) {
        shopingList[elementIndex].sold = true;
    }
}
function deleteProduct(productName) {
    const remowedList = shopingList.filter(element => element.name !== productName);
    shopingList = remowedList
}
function addProduct(productName, number, priceForOne) {
    const elementIndex = shopingList.findIndex(element => element.name === productName);
    if (elementIndex !== -1) {
        shopingList[elementIndex].number += number;
        shopingList[elementIndex].suma = shopingList[elementIndex].priceForOne * shopingList[elementIndex].number;
    } else {
        const newProduct = {
            name: productName,
            number: number,
            sold: false,
            priceForOne: priceForOne,
            suma: number * priceForOne,
        };
        shopingList.push(newProduct);
    }

}

function sumaOfAllProducts(shopingList) {
    let suma = 0;
    shopingList.forEach(element => {
        suma += element.priceForOne * element.number;
    })
    console.log(`Сума всіх продуктів в списку становить:${suma}`)
}


function sumaAllSoldProduct(shopingList) {
    let sumaOfSold = 0;
    shopingList.forEach(element => {
        if(element.sold){
            sumaOfSold += element.suma
        }
    })
    console.log(`Сума всіх проданих товарів в списку становить:${sumaOfSold}`)
}
function sumaAllNotSoldProduct(shopingList) {
    let sumaOfNotSold = 0;
    shopingList.forEach(element => {
        if(!element.sold){
            sumaOfNotSold += element.suma
        }
    })
    console.log(`Сума всіх наявних товарів в списку становить:${sumaOfNotSold}`)
}



sortBySuma(shopingList)



