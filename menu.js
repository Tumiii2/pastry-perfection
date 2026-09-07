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

// Auto-select filter from URL (?category=small-chops)
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
