import product from "./product.js"
import catalogue from "./navbar.js"

const currentId = window.location.href.split('?id=')[1]
const header = document.getElementById('header')
let currentElement = {}
let cart = product.loadCart()

$(document).ready(function() {
    $('.carousel').slick({
        centerMode: true,
        dots: true,
        infinite: true,
        speed: 300,
        variableWidth: true,
        adaptiveHeight: true,
        autoplay: true,
        autoplaySpeed: 4000,
        prevArrow: false,
        nextArrow: false
    })
})

catalogue.list.forEach(element => {
    if (element.id === currentId) {
        currentElement = element
    }
});

header.innerText = currentElement.name

for (let index = 0; index < 5; index++) {
    const carousel = document.querySelector('.carousel')
    const divItem = document.createElement("div")

    const divImg = document.createElement("div")
    divImg.classList = "rounded-img mx-5"

    const divText = document.createElement("div")
    divText.classList = "mt-2 text-center h5 text-muted"

    const img = document.createElement("img")
    let randId = Math.floor(Math.random() * (currentElement.rangeMax - currentElement.rangeMin)) + currentElement.rangeMin
    img.src = `https://picsum.photos/id/${randId}/1080`
    img.alt = `Producto ${randId}`

    const text = document.createElement("p")
    text.innerText = `Producto ${randId}`

    divText.appendChild(text)
    divImg.appendChild(img)
    divItem.appendChild(divImg)
    divItem.appendChild(divText)
    carousel.appendChild(divItem)
}

for (let index = currentElement.rangeMin; index <= currentElement.rangeMax; index++) {
    const randomPrice = "$" + (Math.floor(Math.random() * 100) + 10)
    const item = {
        id: index,
        name: `Producto ${index}`,
        desc: "Lorem",
        price: randomPrice,
        quantity: 1
    }
    product.generateProduct(item, "col-lg-2 col-md-4 col-sm-6")
}