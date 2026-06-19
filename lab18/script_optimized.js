document.addEventListener("DOMContentLoaded", () => {
    // 1. MOBILE MENU TOGGLE
    const menuToggle = document.getElementById("menuToggle");
    const navbarMenu = document.getElementById("navbarMenu");

    menuToggle.addEventListener("click", () => {
        navbarMenu.classList.toggle("active");
    });

    const navLinks = document.querySelectorAll(".nav-link");
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            navbarMenu.classList.remove("active");
        });
    });

    // 2. MODAL WINDOW CONTROLLERS
    const openModal = (modalElement) => {
        modalElement.classList.remove("hidden");
        document.body.style.overflow = "hidden";
    };

    const closeModal = (modalElement) => {
        modalElement.classList.add("hidden");
        document.body.style.overflow = "";
    };

    const setupModalListeners = (modalElement) => {
        const closeCross = modalElement.querySelector(".modal-close-cross");
        const closeBtns = modalElement.querySelectorAll(".modal-close-btn");

        if (closeCross) {
            closeCross.addEventListener("click", () => closeModal(modalElement));
        }

        closeBtns.forEach(btn => {
            btn.addEventListener("click", () => closeModal(modalElement));
        });

        modalElement.addEventListener("click", (e) => {
            if (e.target === modalElement) {
                closeModal(modalElement);
            }
        });
    };

    // 2a. Info Modal
    const infoModal = document.getElementById("infoModal");
    const openInfoModalBtn = document.getElementById("openInfoModal");
    setupModalListeners(infoModal);
    
    openInfoModalBtn.addEventListener("click", () => openModal(infoModal));

    // 2b. Buy Modal
    const buyModal = document.getElementById("buyModal");
    const modalProductTitle = document.getElementById("modalProductTitle");
    const buyButtons = document.querySelectorAll(".btn-buy");
    const confirmBuyBtn = document.getElementById("confirmBuyBtn");
    setupModalListeners(buyModal);

    buyButtons.forEach(button => {
        button.addEventListener("click", () => {
            const productName = button.getAttribute("data-product");
            modalProductTitle.textContent = productName;
            openModal(buyModal);
        });
    });

    confirmBuyBtn.addEventListener("click", () => {
        alert("Дякуємо за замовлення! Наш менеджер зв'яжеться з вами найближчим часом.");
        closeModal(buyModal);
    });

    // 2c. Escape Key Listener
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            const openModals = document.querySelectorAll(".modal:not(.hidden)");
            openModals.forEach(modal => closeModal(modal));
        }
    });

    // 3. CONTACT FORM SUBMISSION
    const contactForm = document.getElementById("contactForm");
    contactForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.getElementById("contactName").value;
        alert(`Дякуємо, ${name}! Ваше повідомлення успішно надіслано.`);
        contactForm.reset();
    });
});
