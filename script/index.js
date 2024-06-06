// const data = [
// {
//     id: 1,
//     img: "./images/jaqueta.svg",
//     nameItem: "Lightweight Jacket",
//     description: "Adicione um pouco de energia ao seu guarda-roupa de inverno com esta jaqueta vibrante...",
//     value: 100,
//     addCart: "Adicionar ao carrinho",
//     tag: ["Camisetas"],
// },

const mainCardsUl = document.querySelector('.cards-content')
const searchProduct = document.querySelector('.search-input')
const productsFilter = document.querySelectorAll('.filter-button')
const searchBtn = document.querySelector('.search-button')
const cartEmpty = document.querySelector('.cart-empty')
const aside = document.querySelector('aside')
const divCartProducts = document.querySelector('.cart-products')
const ulCartList = document.querySelector('.cart-list')
const cartDetails = document.querySelector('.cart-details')
const qntItems = document.querySelector('.qnt-value')
const totalValue = document.querySelector('.total-price')

let qntCount = 0;
let qntValue = 0; 

function renderCards(list) {

    for (let i = 0; i < list.length; i++) {
        //creating elements:
        const productsList = document.createElement('li');
        const productImg = document.createElement('img');
        const divContent = document.createElement('div')
        const productSpecification = document.createElement('span');
        const productTitle = document.createElement('h3');
        const productDescription = document.createElement('span');
        const productPrice = document.createElement('span');
        const productToCart = document.createElement('button');

        // configuring elements
        productsList.className = 'products'
        productImg.className = 'image'
        divContent.className = 'content'
        productSpecification.className = 'specification'
        productTitle.className = 'product-title'
        productDescription.className = 'about'
        productPrice.className = 'price'
        productToCart.className = 'to-cart'
        productsList.id = `${list[i].id}`
        productImg.src = `${list[i].img}`;
        productSpecification.innerHTML = `${list[i].tag}`;
        productTitle.innerHTML = `${list[i].nameItem}`;
        productDescription.innerHTML = `${list[i].description}`;
        productPrice.innerHTML = `R$ ${list[i].value},00`;
        productToCart.innerHTML = `${list[i].addCart}`;
        productToCart.id = `${list[i].id}`
        
        productToCart.addEventListener('click', function (e) { 

            cartEmpty.style.display = "none";
            divCartProducts.style.display = "block";
            cartDetails.style.display = "flex";

            const productInCart = document.createElement('li');
            const productImgCart = document.createElement('img');
            const productTitleCart = document.createElement('h3');
            const productPriceCart = document.createElement('span');
            const divContentInCart = document.createElement('div');
            const cartProductInfo = document.createElement('div')
            const bottomRemoveProduct = document.createElement('button')

            productInCart.className = 'product-li-in-cart'
            divContentInCart.className = 'content-product'
            cartProductInfo.className = 'product-info-in-cart'
            productImgCart.className = 'product-img-in-cart'
            productTitleCart.className = 'product-title-in-cart'
            productPriceCart.className = 'product-price-in-cart'
            bottomRemoveProduct.className = `remove${data[i].id}`
            productImgCart.src = `${list[i].img}`
            productTitleCart.innerHTML = `${list[i].nameItem}`
            productPriceCart.innerHTML = `R$ ${list[i].value},00`
            bottomRemoveProduct.innerText = 'Remover produto'

            qntCount++
            qntValue += data[i].value
            qntItems.innerHTML = `${qntCount}`
            totalValue.innerHTML = `R$ ${qntValue},00`

            bottomRemoveProduct.addEventListener('click', function (e) {
                qntCount--
                qntValue -= data[i].value
                qntItems.innerHTML = `${qntCount}`
                totalValue.innerHTML = `R$ ${qntValue},00`
                productInCart.remove()
                divContentInCart.remove()
                
                if(qntCount === 0){
                    cartEmpty.style.display = "flex";
                    divCartProducts.style.display = "none";
                    cartDetails.style.display = "none";
                
                } 
            })

            divContentInCart.append(productImgCart, cartProductInfo)
            cartProductInfo.append(productTitleCart, productPriceCart, bottomRemoveProduct)
            productInCart.appendChild(divContentInCart)
            ulCartList.appendChild(productInCart)
            divCartProducts.appendChild(ulCartList)
            aside.append(divCartProducts, cartDetails)
        })

        productsList.append(productImg, divContent)
        divContent.append(productSpecification, productTitle,productDescription,productPrice,productToCart)
        mainCardsUl.appendChild(productsList);
        divCartProducts.remove()
        cartDetails.remove()

    }
}

let arrAccessory = []
let arrShirts = []

function newDatabase(list) {
    //Accessory
    for (i = 0; i < list.length; i++) {
        if (list[i].tag[0] == "Acessórios") {
            arrAccessory.push(list[i])
        } else {
            arrShirts.push(list[i])
        }
    }
}

function filterCard(btnList) {

    for (i = 0; i < btnList.length; i++) {
        btnList[i].addEventListener('click', function (e) {// adicionando evento para cara botao de filtro
            let btnText = e.target.textContent // adicionando variavel
            if (btnText == "Todos") {
                mainCardsUl.innerHTML = ""
                renderCards(data)
            } else if (btnText == "Acessórios") {
                mainCardsUl.innerHTML = ""
                renderCards(arrAccessory)
            } else if (btnText == "Camisetas") {
                mainCardsUl.innerHTML = ""
                renderCards(arrShirts)
            }
        })
    }
}

searchBtn.addEventListener("click", function (e) {
    searchingProduct(searchProduct.value, data)
})

function searchingProduct(text, list) {

    let filteredProducts = []
    let products = list.filter(product => {
        if (product.nameItem.toLowerCase().includes(text.toLowerCase())) {
            filteredProducts.push(product)
        }
    })

    mainCardsUl.innerHTML = ""
    renderCards(filteredProducts)

}
newDatabase(data)
filterCard(productsFilter)
renderCards(data)