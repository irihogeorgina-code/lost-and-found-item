```javascript
const itemForm = document.getElementById("itemForm");
const itemList = document.getElementById("itemList");
const searchInput = document.getElementById("search");

// Load saved reports from the browser
let items = JSON.parse(localStorage.getItem("lostFoundItems")) || [];

displayItems(items);

// Add a new report
itemForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const item = {
        id: Date.now(),
        name: document.getElementById("itemName").value.trim(),
        type: document.getElementById("itemType").value,
        description: document.getElementById("description").value.trim(),
        location: document.getElementById("location").value.trim(),
        contact: document.getElementById("contact").value.trim()
    };

    items.push(item);
    saveItems();
    displayItems(items);
    itemForm.reset();
});

// Search reports
searchInput.addEventListener("input", function() {
    const searchText = searchInput.value.toLowerCase();

    const filteredItems = items.filter(function(item) {
        return item.name.toLowerCase().includes(searchText) ||
            item.type.toLowerCase().includes(searchText) ||
            item.description.toLowerCase().includes(searchText) ||
            item.location.toLowerCase().includes(searchText);
    });

    displayItems(filteredItems);
});

// Display reports
function displayItems(itemsToDisplay) {
    itemList.innerHTML = "";

    if (itemsToDisplay.length === 0) {
        itemList.textContent = "No items found.";
        return;
    }

    itemsToDisplay.forEach(function(item) {
        const card = document.createElement("div");
        card.className = "item-card";

        const title = document.createElement("h3");
        title.textContent = item.name;

        const type = document.createElement("p");
        type.textContent = "Type: " + item.type;

        const description = document.createElement("p");
        description.textContent = "Description: " + item.description;

        const location = document.createElement("p");
        location.textContent = "Location: " + item.location;

        const contact = document.createElement("p");
        contact.textContent = "Contact: " + item.contact;

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-button";

        deleteButton.addEventListener("click", function() {
            deleteItem(item.id);
        });

        card.append(title, type, description, location, contact, deleteButton);
        itemList.appendChild(card);
    });
}

// Delete one report
function deleteItem(id) {
    items = items.filter(function(item) {
        return item.id !== id;
    });

    saveItems();
    displayItems(items);
}

// Save reports in the browser
function saveItems() {
    localStorage.setItem("lostFoundItems", JSON.stringify(items));
}
```
