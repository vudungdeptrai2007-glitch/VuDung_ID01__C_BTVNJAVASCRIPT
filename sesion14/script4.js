function renderProduct(product) {
    const li = document.createElement("li");
    li.classList.add("product-item");

    li.innerHTML = `
        <strong class="product-name">${product.name}</strong> - 
        <span class="product-price">
            ${Number(product.price).toLocaleString()} VND
        </span>
        <button class="edit-price-btn">Sửa giá</button>
        <button class="delete-btn">Xóa</button>
    `;

    productList.appendChild(li);
}