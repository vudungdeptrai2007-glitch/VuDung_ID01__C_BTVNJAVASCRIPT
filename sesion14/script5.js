const searchInput = document.getElementById("search-input");

searchInput.addEventListener("input", function() {


    const keyword = searchInput.value.toLowerCase();

 
    const items = document.querySelectorAll(".product-item");

   
    items.forEach(function(item) {

        const productName = item
            .querySelector(".product-name")
            .textContent
            .toLowerCase();

   
        if (productName.includes(keyword)) {
            item.style.display = "";
        } else {
            item.style.display = "none";
        }

    });
});