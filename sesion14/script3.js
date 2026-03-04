function renderProduct(product) {
    const li = document.createElement("li");
    li.classList.add("product-item");

    li.innerHTML = `
        <strong>${product.name}</strong> - 
        ${Number(product.price).toLocaleString()} VND
        <button class="delete-btn">Xóa</button>
    `;

    productList.appendChild(li);
}