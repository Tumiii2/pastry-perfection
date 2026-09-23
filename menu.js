// Menu page filter tabs
const filterTabs = document.querySelectorAll(".filter-tab");
const menuItems = document.querySelectorAll(".menu-item");

filterTabs.forEach((tab) => {
  tab.addEventListener("click", function () {
    filterTabs.forEach((t) => t.classList.remove("active"));
    this.classList.add("active");

    const filter = this.dataset.filter;

    menuItems.forEach((item) => {
      if (filter === "all" || item.dataset.category === filter) {
        item.classList.remove("hidden");
      } else {
        item.classList.add("hidden");
      }
    });
  });
});

const searchInput = document.querySelector("#menuSearch");

if (searchInput) {
  searchInput.addEventListener("input", function () {
    const searchTerm = this.value.toLowerCase();

    filterTabs.forEach((tab) => tab.classList.remove("active"));
    document
      .querySelector('.filter-tab[data-filter="all"]')
      .classList.add("active");

    menuItems.forEach((item) => {
      const itemName = item
        .querySelector(".item-name")
        .textContent.toLowerCase();

      if (itemName.includes(searchTerm)) {
        item.classList.remove("hidden");
      } else {
        item.classList.add("hidden");
      }
    });
  });
}

const sortSelect = document.querySelector("#sort");
const menuGrid = document.querySelector(".menu-grid");

if (sortSelect) {
  sortSelect.addEventListener("change", function () {
    const sortValue = this.value;
    const itemsArray = Array.from(menuItems);

    if (sortValue === "price-low") {
      itemsArray.sort((a, b) => {
        const priceA = parsePrice(a.querySelector(".item-price").textContent);
        const priceB = parsePrice(b.querySelector(".item-price").textContent);
        return priceA - priceB;
      });
    } else if (sortValue === "price-high") {
      itemsArray.sort((a, b) => {
        const priceB = parsePrice(b.querySelector(".item-price").textContent);
        const priceA = parsePrice(a.querySelector(".item-price").textContent);
        return priceB - priceA;
      });
    }

    itemsArray.forEach((item) => menuGrid.appendChild(item));
  });
}

const urlParams = new URLSearchParams(window.location.search);
const categoryParam = urlParams.get("category");

if (categoryParam) {
  const matchingTab = document.querySelector(
    `.filter-tab[data-filter="${categoryParam}"]`,
  );
  if (matchingTab) {
    matchingTab.click();
  }
}

const searchParam = urlParams.get("search");

if (searchParam && searchInput) {
  searchInput.value = searchParam;
  searchInput.dispatchEvent(new Event("input"));
}
