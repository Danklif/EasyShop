import product from "./product.js"

var cart = product.loadCart()

var total = 0
var totalLabel = document.getElementById("total-label");

cart.items.forEach(item => {
    product.generateProduct(item, "col-lg-2 col-md-4 col-sm-6", "delete")
    total += item.price.split('$')[1] * item.quantity
});
totalLabel.innerText = `Subtotal: $${total}`

$("a").on("click", () => {
    product.saveCart()
})

$("#btnDropCart").on("click", () => {
    product.dropCart()
})

$("#btnBuyCart").on("click", () => {
    product.buyCart()
})