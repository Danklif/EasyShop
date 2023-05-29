import lang from "../localization/lang.json" assert {type:"json"}

let home = ""
let beauty = "s"
let cuisine = ""
let toys = ""

if (document.querySelector('html').lang === "es") {
    home = lang.global.catalogue.list.home.es
    beauty = lang.global.catalogue.list.beauty.es
    cuisine = lang.global.catalogue.list.cuisine.es
    toys = lang.global.catalogue.list.toys.es
} else {
    home = lang.global.catalogue.list.home.en
    beauty = lang.global.catalogue.list.beauty.en
    cuisine = lang.global.catalogue.list.cuisine.en
    toys = lang.global.catalogue.list.toys.en
}


const catalogueList = document.getElementById('catalogue-list')
const list = [
    {id: '1', name: home, rangeMin: 1, rangeMax: 99},
    {id: '2', name: beauty, rangeMin: 100, rangeMax: 299},
    {id: '3', name: cuisine, rangeMin: 300, rangeMax: 499},
    {id: '4', name: toys, rangeMin: 500, rangeMax: 799},
]

list.forEach(element => {
    let li = document.createElement("li");
    let cat = document.createElement("a");
    cat.classList = "dropdown-item"
    if (window.location.href.includes('view')) {
        cat.href = `../view/catalogue.html?id=${element.id}`
    } else {
        cat.href = `./view/catalogue.html?id=${element.id}`
    }
    cat.innerText = element.name
    li.appendChild(cat)
    catalogueList.appendChild(li)
});

export default{list}