let addBtn = document.getElementById('add-btn')
let productEl = document.getElementById('product-el')
let modelEl = document.getElementById('model-el')
let errorEl = document.getElementById('error-el')

let prodsObj = []

addBtn.addEventListener('click', (e) => {
    //form elements validation
    e.preventDefault()
    if (productEl.value == '' || modelEl.value == '') {
        errorEl.innerText = "Please enter values"

    }
    //get localstorage data - we arre splitingg this -JSON.parse(localStorage.getItem('products'))
    let store = localStorage.getItem('products')

    //localstorage validation
    if (store == null) {
        //localdata object making empty
        prodsObj = []
    } else {
        //localdata assigned to probs object
        prodsObj = JSON.parse(store)
    }
    //creating new object
    let myObj = {
        product: productEl.value,
        model: modelEl.value
    }
    //push new object to prods object
    prodsObj.push(myObj)
    //setting as a item in local storage in products
    localStorage.setItem('products', JSON.stringify(prodsObj))

    //making form element values as empty
    productEl.value = '';
    modelEl.value = '';

    showProducts()
})

function showProducts() {
    let store = localStorage.getItem('products')

    //localstorage validation
    if (store == null) {
        //localdata object making empty
        prodsObj = []
    } else {
        //localdata assigned to probs object
        prodsObj = JSON.parse(store)
    }

    //creating html template
    let html = ''
    prodsObj.forEach((el, index) => {
        html += `<tr><td>${el.product}</td><td>${el.model}</td><td><button class="btn btn-primary btn-sm" id="${index}"onclick="editProd(this.id)">Edit</button></td><td><button class="btn btn-danger btn-sm" id="${index}" onclick="deleteProd(this.id)">Delete</button></td></tr>`
    });
    let allProdsEl = document.getElementById('all-prods')
    if (allProdsEl.length != 0) {
        allProdsEl.innerHTML = html

    } else {
        errorEl.innerHTML = "Please Enter Product details"
    }
}

//Delete selected product element
function deleteProd(index) {
    let confirmDel = confirm("Delete this Product??")

    if (confirmDel == true) {
        let store = localStorage.getItem('products')
        //localstorage validation
        if (store == null) {
            //localdata object making empty
            prodsObj = []
        } else {
            //localdata assigned to probs object
            prodsObj = JSON.parse(store)
        }

        prodsObj.splice(index, 1)
        localStorage.setItem("products", JSON.stringify(prodsObj))
        showProducts()

    }
}

//Edit selected product element

function editProd(index) {
    let store = localStorage.getItem('products')

    if (productEl.value !== '' || modelEl.value !== '') {
        return alert("Please clear all form values")
    }
    
    let confirmDel = confirm("Delete this Product??")
    //localstorage validation
    if (store == null) {
        //localdata object making empty
        prodsObj = []
    } else {
        //localdata assigned to probs object
        prodsObj = JSON.parse(store)
    }
    prodsObj.findIndex((el, index) => {
        productEl.value = el.product;
        modelEl.value = el.model;
    })

    prodsObj.splice(index, 1)
    localStorage.setItem("products", JSON.stringify(prodsObj))
    showProducts()

}

showProducts()