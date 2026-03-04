
const products = [
    { id: 1, name: "Bánh Chưng", price: 150000 },
    { id: 2, name: "Giò Lụa", price: 180000 },
];


const productList = document.getElementById("product-list");
const form = document.getElementById("product-form");
const nameInput = document.getElementById("product-name");
const priceInput = document.getElementById("product-price");


function renderProduct(product) {
    const li = document.createElement("li");
    li.classList.add("product-item");

    li.innerHTML = `
        <strong>${product.name}</strong> - 
        ${Number(product.price).toLocaleString()} VND
    `;

    productList.appendChild(li);
}


products.forEach(renderProduct);



form.addEventListener("submit", function(event) {


    event.preventDefault();


    const name = nameInput.value.trim();
    const price = priceInput.value.trim();

    if (name === "" || price === "") {
        alert("Vui lòng nhập đầy đủ thông tin!");
        return;
    }

 
    const newProduct = {
        id: products.length + 1,
        name: name,
        price: Number(price)
    };

  
    products.push(newProduct);

    
    renderProduct(newProduct);


    nameInput.value = "";
    priceInput.value = "";
});