import lang from "../localization/lang.json" assert {type:"json"}

let cart = {items: []}

function generateProduct(item, distribution, type = "add") {
    // Obtener el elemento 'row' por su id
    var row = document.getElementById("product-container");

    // Crear un nuevo elemento 'div' con la clase 'col-lg-2 col-md-4 col-sm-6 p-2'
    var colDiv = document.createElement("div");
    colDiv.className = `${distribution} p-2`;

    // Crear un nuevo elemento 'div' con la clase 'card'
    var cardDiv = document.createElement("div");
    cardDiv.className = "card";

    // Crear un nuevo elemento 'div'
    var imgDiv = document.createElement("div");

    // Crear un elemento 'img' y establecer el atributo 'src' y 'alt'
    var img = document.createElement("img");
    img.src = `https://picsum.photos/id/${item.id}/1080`;
    img.alt = item.name;
    img.className = "card-img"
    img.onerror = function() {
        this.onerror = null
        this.src = '../img/default.png'
        this.parentElement.className = "p-4"
        Swal.fire({
            position: 'top-end',
            icon: 'error',
            text: 'Ocurrió un error al cargar las imágenes de algunos productos',
            showConfirmButton: false,
            timer: 8000,
            toast: true,
        })
    }

    // Crear un nuevo elemento 'div' con la clase 'card-body'
    var cardBodyDiv = document.createElement("div");
    cardBodyDiv.className = "card-body";

    // Crear un elemento 'h5' con la clase 'card-title' y establecer el texto
    var title = document.createElement("h5");
    title.className = "card-title";
    title.textContent = item.name;

    // Crear un elemento 'p' con la clase 'card-text' y establecer el texto
    var description = document.createElement("p");
    description.className = "card-text";
    description.textContent = item.desc;

    // Crear un elemento 'p' con la clase 'card-price' y establecer el texto
    var price = document.createElement("p");
    price.className = "card-price";
    price.textContent = item.price;

    if (type === "add") {
        // Crear un elemento 'button' con la clase 'btn btn-primary' y establecer el texto
        var button = document.createElement("button");
        button.className = "btn btn-primary";
        button.textContent = `${document.querySelector('html').lang === "es" ? lang.global.add.es : lang.global.add.en}`;
        button.addEventListener('click', addToCart)
    } else {
        // Crear un elemento 'button' con la clase 'btn btn-danger' y establecer el texto
        var button = document.createElement("button");
        button.className = "btn btn-danger";
        button.textContent = `${document.querySelector('html').lang === "es" ? lang.global.remove.es : lang.global.remove.en}`;
        button.addEventListener('click', removeFromCart)

        description.textContent = `${document.querySelector('html').lang === "es" ? lang.global.quantity.es : lang.global.quantity.en}: ${item.quantity}`
    }
    
    cardBodyDiv.appendChild(title);
    cardBodyDiv.appendChild(description);
    cardBodyDiv.appendChild(price);
    cardBodyDiv.appendChild(button);
    imgDiv.appendChild(img);
    cardDiv.appendChild(imgDiv);
    cardDiv.appendChild(cardBodyDiv);
    colDiv.appendChild(cardDiv);
    row.appendChild(colDiv);
}

function addToCart(event) {
    const product = event.target.parentElement

    const productName = product.querySelector('.card-title').innerText;
    const productDesc = product.querySelector('.card-text').innerText;
    const productPrice = product.querySelector('.card-price').innerText;

    const item = {
        id: productName.split(' ')[1],
        name: productName,
        desc: productDesc,
        price: productPrice,
        quantity: 1
    }

    let itemExists = false

    if (cart.items.length) {
        cart.items.forEach(cartItem => {
            if (cartItem.name === item.name) {
                cartItem.quantity++
                itemExists = true
            }
        });
        if (!itemExists) {
            cart.items.push(item)
        }
    } else {
        cart.items.push(item)
    }

    saveCart()

    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: productName,
        text: 'Se ha añadido el producto al carrito.',
        showConfirmButton: false,
        timer: 4000,
        toast: true,
    })
}

function removeFromCart(event) {
    document.getElementById("product-container").innerHTML = ""

    const product = event.target.parentElement

    const productName = product.querySelector('.card-title').innerText;

    cart.items.forEach((cartItem, index) => {
        if (cartItem.id === productName.split(' ')[1]) {
            cartItem.quantity--
            if (cartItem.quantity <= 0) {
                cart.items.splice(index, 1)
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: productName,
                    text: 'Se ha eliminado el producto del carrito.',
                    showConfirmButton: false,
                    timer: 4000,
                    toast: true,
                })
            }
        }
    })

    var total = 0
    var totalLabel = document.getElementById("total-label");

    cart.items.forEach(item => {
        generateProduct(item, "col-lg-2 col-md-4 col-sm-6", "delete")
        total += item.price.split('$')[1] * item.quantity
    });

    if (cart.items.length === 0) {
        total = 0
    }

    totalLabel.innerText = `Subtotal: $${total}`

    saveCart()
}

function dropCart() {
    var totalLabel = document.getElementById("total-label");
    if (cart.items.length > 0) {
        Swal.fire({
            title: '¿Está seguro?',
            text: 'Esta acción no se puede deshacer.',
            showCancelButton: true,
            confirmButtonText: 'Limpiar',
            confirmButtonColor: '#d33',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                document.getElementById("product-container").innerHTML = ""
                cart = {items: []}
                saveCart()
                Swal.fire({
                    position: 'top-end',
                    icon: 'info',
                    text: 'Se ha limpiado el carrito.',
                    showConfirmButton: false,
                    timer: 4000,
                    toast: true,
                })
                totalLabel.innerText = `Subtotal: $0`
            }
        })
    } else {
        Swal.fire({
            position: 'top-end',
            icon: 'info',
            text: 'Su carrito está vacío.',
            showConfirmButton: false,
            timer: 4000,
            toast: true,
        })
    }
}

function buyCart() {
    var totalLabel = document.getElementById("total-label");
    if (cart.items.length > 0) {
        Swal.fire({
            title: '¿Desea comprar este carrito?',
            text: `Su compra tiene un valor total de${totalLabel.innerText.split(':')[1]}`,
            showCancelButton: true,
            confirmButtonText: 'Comprar',
            confirmButtonColor: '#198754',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                document.getElementById("product-container").innerHTML = ""
                cart = {items: []}
                saveCart()
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    text: '¡Compra exitosa!',
                    showConfirmButton: false,
                    timer: 4000,
                    toast: true,
                })
                totalLabel.innerText = `Subtotal: $0`
            }
        })
    } else {
        Swal.fire({
            position: 'top-end',
            icon: 'info',
            text: 'Su carrito está vacío.',
            showConfirmButton: false,
            timer: 4000,
            toast: true,
        })
    }
}

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart))
}

function loadCart() {
    cart = JSON.parse(localStorage.getItem("cart"))??{items:[]}
    return cart
}

export default{generateProduct, saveCart, loadCart, dropCart, buyCart}