function addToLocalStorage(newData) {
    let existingData = JSON.parse(localStorage.getItem("data") || "[]");
    existingData.push(newData);
    localStorage.setItem("data", JSON.stringify(existingData));
}

function addToCart(button) {
    const itemElement = button.parentElement;
    const title = itemElement.querySelector("h4").textContent.trim();
    const img = itemElement.querySelector("img").getAttribute("src");
    const priceText = button.textContent.replace("Rp.", "").replace(".", "").trim();
    const price = parseInt(priceText); // Ubah harga menjadi angka

    const newdata = {
        title: title,
        image: img,
        price: price
    };
    
    addToLocalStorage(newdata);
    getCountItem();
    updateSubtotal();
}

function getCountItem() {
    const countItems = JSON.parse(localStorage.getItem("data")) || [];
    const shopLink = document.querySelector("a[href='#shop']");

    if (shopLink) {
        let countDisplay = shopLink.querySelector(".item-count");

        if (!countDisplay) {
            countDisplay = document.createElement("span");
            countDisplay.classList.add("item-count");
            shopLink.appendChild(countDisplay);
        }
        
        countDisplay.textContent = `(${countItems.length})`;
    }
}

function deleteItemFromCart(index) {
    let items = JSON.parse(localStorage.getItem("data")) || [];
    
    if (index > -1) {
        items.splice(index, 1);
        localStorage.setItem("data", JSON.stringify(items));
        getCountItem();
        showCartItems();
        updateSubtotal(); // Update subtotal setelah item dihapus
    }
}

function showCartItems() {
    const itemList = document.getElementById("itemList");
    itemList.innerHTML = "";

    const items = JSON.parse(localStorage.getItem("data")) || [];
    
    if (items.length === 0) {
        itemList.innerHTML = "<li>Data tidak ada.</li>";
    } else {
        items.forEach((item, index) => {
            const listItem = document.createElement("li");
            listItem.style.backgroundColor = "orange";
            listItem.style.padding = "10px";
            listItem.style.marginBottom = "5px";
            listItem.style.display = "flex";
            listItem.style.alignItems = "center";

            const imgElement = document.createElement("img");
            imgElement.src = item.image;
            imgElement.alt = item.title;
            imgElement.style.width = "50px";
            imgElement.style.height = "50px";
            imgElement.style.marginRight = "10px";

            const titleText = document.createTextNode(`${item.title} - Rp.${item.price.toLocaleString()}`);

            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.style.marginLeft = "auto";
            deleteButton.style.padding = "5px 10px";
            deleteButton.onclick = () => deleteItemFromCart(index);

            listItem.appendChild(imgElement);
            listItem.appendChild(titleText);
            listItem.appendChild(deleteButton);
            itemList.appendChild(listItem);
        });
    }
}

function updateSubtotal() {
    const items = JSON.parse(localStorage.getItem("data")) || [];
    const subtotal = items.reduce((total, item) => total + item.price, 0);
    document.getElementById("subtotal").textContent = `Rp. ${subtotal.toLocaleString()}`;
}

document.getElementById("submitBtn").addEventListener("click", () => {
    alert("Checkout berhasil!");
    localStorage.removeItem("data");
    getCountItem();
    showCartItems();
    updateSubtotal();
    document.getElementById("cartModal").style.display = "none";
});

// Modal functionality
const shopLink = document.querySelector("a[href='#shop']");
const modal = document.getElementById("cartModal");
const closeModalBtn = document.querySelector(".close-btn");

shopLink.addEventListener("click", (event) => {
    event.preventDefault();
    showCartItems(); 
    updateSubtotal();
    modal.style.display = "flex";
});

closeModalBtn.addEventListener("click", () => {
    modal.style.display = "none";
});

window.addEventListener("click", (event) => {
    if (event.target == modal) {
        modal.style.display = "none";
    }
});

getCountItem();
