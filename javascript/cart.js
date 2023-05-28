import product from "./product.js"

var cart = product.loadCart()

cart.items.forEach(item => {
    product.generateProduct(item, "col-lg-2 col-md-4 col-sm-6", "delete")
});

$("a").on("click", () => {
    product.saveCart()
})