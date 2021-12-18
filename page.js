const toTopBtn = document.querySelector(".back-to-top-button");
const pokeSearchForm = document.querySelector("#poke-search-form");

window.addEventListener("scroll", () => {
    if (window.scrollY > 300) toTopBtn.classList.add("show");
    else toTopBtn.classList.remove("show");
});

toTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

pokeSearchForm.addEventListener("submit", (e) => e.preventDefault());
