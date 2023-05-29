import lang from "../localization/lang.json" assert {type:"json"}

const footer = document.querySelector('#page-footer')
const nav_home = document.querySelector('#nav-home')
const nav_catalogue = document.querySelector('#nav-catalogue')
const nav_cart = document.querySelector('#nav-cart')
const index_header = document.querySelector('#index-header')
const index_description = document.querySelector('#index-description')
const index_featured = document.querySelector('#index-featured')

if (document.querySelector('html').lang === "es") {
    footer.innerText = lang.global.footer.es
    nav_home.innerHTML = '<i class="ri-home-2-fill"></i> ' + lang.global.home.es
    nav_catalogue.innerHTML = '<i class="ri-shopping-basket-2-fill"></i> ' + lang.global.catalogue.es
    nav_cart.innerHTML = '<i class="ri-shopping-cart-fill"></i> ' + lang.global.cart.es
    index_header.innerText = lang.index.header.es
    index_description.innerText = lang.index.description.es
    index_featured.innerText = lang.index.featured.es
} else {
    footer.innerText = lang.global.footer.en
    nav_home.innerHTML = '<i class="ri-home-2-fill"></i> ' + lang.global.home.en
    nav_catalogue.innerHTML = '<i class="ri-shopping-basket-2-fill"></i> ' + lang.global.catalogue.en
    nav_cart.innerHTML = '<i class="ri-shopping-cart-fill"></i> ' + lang.global.cart.en
    index_header.innerText = lang.index.header.en
    index_description.innerText = lang.index.description.en
    index_featured.innerText = lang.index.featured.en
}