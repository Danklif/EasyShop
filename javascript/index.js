import product from "./product.js"

product.loadCart()

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

document.getElementById("product-container").innerHTML = ""
for (let index = 1; index <= 6; index++) {
    const randomId = Math.floor(Math.random() * 91)
    const randomPrice = "$" + (Math.floor(Math.random() * 91) + 10)

    const item = {
        id: randomId,
        name: `Producto ${randomId}`,
        desc: "Lorem",
        price: randomPrice,
        quantity: 1
    }
    
    product.generateProduct(item, "col-lg-2 col-md-4 col-sm-6")
}

$("a").on("click", () => {
    product.saveCart()
})