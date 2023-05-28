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
        button.textContent = "Agregar al carrito";
        button.addEventListener('click', addToCart)
    } else {
        // Crear un elemento 'button' con la clase 'btn btn-danger' y establecer el texto
        var button = document.createElement("button");
        button.className = "btn btn-danger";
        button.textContent = "Remover";
        button.addEventListener('click', removeFromCart)

        description.textContent = `Cantidad: ${item.quantity}`
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

    cart.items.forEach(cartItem => {
        generateProduct(cartItem, "col-lg-2 col-md-4 col-sm-6", "delete")
    });

    saveCart()
}

function dropCart() {
    document.getElementById("product-container").innerHTML = ""
    cart = {items: []}
    saveCart()
}

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart))
}

function loadCart() {
    cart = JSON.parse(localStorage.getItem("cart"))??{items:[]}
    return cart
}

export default{generateProduct, saveCart, loadCart}