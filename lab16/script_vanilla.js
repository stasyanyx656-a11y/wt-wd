document.addEventListener("DOMContentLoaded", () => {
    /* ==========================================================================
       1. MOBILE MENU TOGGLE
       ========================================================================== */
    const menuToggle = document.getElementById("menuToggle");
    const navbarMenu = document.getElementById("navbarMenu");

    menuToggle.addEventListener("click", () => {
        navbarMenu.classList.toggle("active");
        menuToggle.classList.toggle("open"); // For potential hamburger animation
    });

    // Close menu when clicking a link (on mobile)
    const navLinks = document.querySelectorAll(".nav-link");
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            navbarMenu.classList.remove("active");
        });
    });


    /* ==========================================================================
       2. MODAL CONTROLLERS (VANILLA)
       ========================================================================== */
    // Helper to open a modal
    const openModal = (modalElement) => {
        modalElement.classList.remove("hidden");
        document.body.style.overflow = "hidden"; // Prevent scrolling
    };

    // Helper to close a modal
    const closeModal = (modalElement) => {
        modalElement.classList.add("hidden");
        document.body.style.overflow = ""; // Enable scrolling
    };

    // Set up modal listeners for close buttons and outside clicks
    const setupModalListeners = (modalElement) => {
        const closeCross = modalElement.querySelector(".modal-close-cross");
        const closeBtns = modalElement.querySelectorAll(".modal-close-btn");

        if (closeCross) {
            closeCross.addEventListener("click", () => closeModal(modalElement));
        }

        closeBtns.forEach(btn => {
            btn.addEventListener("click", () => closeModal(modalElement));
        });

        // Close on outside click
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

    // 2c. Global Escape Key Listener to close all modals
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            const openModals = document.querySelectorAll(".modal:not(.hidden)");
            openModals.forEach(modal => closeModal(modal));
        }
    });


    /* ==========================================================================
       3. CONTACT FORM SUBMISSION
       ========================================================================== */
    const contactForm = document.getElementById("contactForm");
    
    contactForm.addEventListener("submit", (e) => {
        e.preventDefault();
        
        const name = document.getElementById("contactName").value;
        alert(`Дякуємо, ${name}! Ваше повідомлення успішно надіслано.`);
        
        contactForm.reset();
    });
});
