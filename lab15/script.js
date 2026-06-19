document.addEventListener("DOMContentLoaded", () => {
    
    // === 1. Привітання користувача ===
    const userNameInput = document.getElementById("userNameInput");
    const greetBtn = document.getElementById("greetBtn");
    const greetOutput = document.getElementById("greetOutput");

    greetBtn.addEventListener("click", () => {
        const name = userNameInput.value.trim();
        if (name.length < 2) {
            greetOutput.textContent = "Введіть ім’я довжиною не менше 2 символів";
            greetOutput.className = "output-message show error";
            return;
        }
        greetOutput.textContent = `Привіт, ${name}! Ласкаво просимо.`;
        greetOutput.className = "output-message show success";
    });

    // === 2. Валідація форми реєстрації ===
    const registerForm = document.getElementById("registerForm");
    const emailInput = document.getElementById("emailInput");
    const passwordInput = document.getElementById("passwordInput");
    const formMessage = document.getElementById("formMessage");

    registerForm.addEventListener("submit", (event) => {
        event.preventDefault(); // Забороняємо перезавантаження сторінки
        
        if (!emailInput.validity.valid || emailInput.value.trim() === "") {
            formMessage.textContent = "Введіть коректний email";
            formMessage.className = "output-message show error";
            return;
        }
        if (passwordInput.value.length < 6) {
            formMessage.textContent = "Пароль має містити не менше 6 символів";
            formMessage.className = "output-message show error";
            return;
        }
        
        formMessage.textContent = "Реєстрація успішна!";
        formMessage.className = "output-message show success";
        registerForm.reset(); // Очищення форми
    });

    // === 3. Модальне вікно ===
    const openModalBtn = document.getElementById("openModalBtn");
    const closeModalIcon = document.getElementById("closeModalIcon");
    const closeModalBtn = document.getElementById("closeModalBtn");
    const modalOverlay = document.getElementById("modalOverlay");

    const openModal = () => modalOverlay.classList.remove("hidden");
    const closeModal = () => modalOverlay.classList.add("hidden");

    openModalBtn.addEventListener("click", openModal);
    closeModalIcon.addEventListener("click", closeModal);
    closeModalBtn.addEventListener("click", closeModal);

    // Закриття кліком поза вікном
    modalOverlay.addEventListener("click", (e) => {
        if (e.target === modalOverlay) closeModal();
    });

    // Закриття клавішею Escape
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && !modalOverlay.classList.contains("hidden")) {
            closeModal();
        }
    });

    // === 4. Список завдань (Todo) ===
    let tasks = [
        { id: 1, text: "Вивчити основи DOM", done: true },
        { id: 2, text: "Зробити лабораторну №15", done: false },
        { id: 3, text: "Перевірити на помилки", done: false }
    ];
    let currentFilter = "all"; // all, active, done

    const todoInput = document.getElementById("todoInput");
    const addTodoBtn = document.getElementById("addTodoBtn");
    const taskList = document.getElementById("taskList");
    const filterBtns = document.querySelectorAll(".btn-filter");

    const renderTasks = () => {
        taskList.innerHTML = ""; // Очищаємо список перед рендерингом

        const filteredTasks = tasks.filter(task => {
            if (currentFilter === "active") return !task.done;
            if (currentFilter === "done") return task.done;
            return true; // all
        });

        filteredTasks.forEach(task => {
            const li = document.createElement("li");
            if (task.done) li.classList.add("done");
            
            const span = document.createElement("span");
            span.textContent = task.text;
            li.appendChild(span);
            
            const actionsDiv = document.createElement("div");
            actionsDiv.className = "actions";

            const toggleBtn = document.createElement("button");
            toggleBtn.className = "btn btn-outline btn-sm";
            toggleBtn.textContent = task.done ? "Відновити" : "Виконано";
            toggleBtn.addEventListener("click", () => toggleTask(task.id));
            
            const deleteBtn = document.createElement("button");
            deleteBtn.className = "btn btn-delete btn-sm";
            deleteBtn.textContent = "Видалити";
            deleteBtn.addEventListener("click", () => deleteTask(task.id));

            actionsDiv.appendChild(toggleBtn);
            actionsDiv.appendChild(deleteBtn);
            li.appendChild(actionsDiv);
            
            taskList.appendChild(li); // Використання appendChild
        });
    };

    const addTask = () => {
        const text = todoInput.value.trim();
        if (text === "") return;
        
        const newTask = {
            id: Date.now(),
            text: text,
            done: false
        };
        tasks.push(newTask);
        todoInput.value = "";
        renderTasks();
    };

    const toggleTask = (id) => {
        tasks = tasks.map(task => 
            task.id === id ? { ...task, done: !task.done } : task
        );
        renderTasks();
    };

    const deleteTask = (id) => {
        tasks = tasks.filter(task => task.id !== id);
        renderTasks();
    };

    addTodoBtn.addEventListener("click", addTask);
    todoInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") addTask();
    });

    filterBtns.forEach(btn => {
        btn.addEventListener("click", (e) => {
            // Видаляємо active у всіх, додаємо поточному
            filterBtns.forEach(b => b.classList.remove("active"));
            e.target.classList.add("active");
            
            currentFilter = e.target.getAttribute("data-filter");
            renderTasks();
        });
    });

    // Початковий рендер
    renderTasks();

    // === 5. Картки товарів (розгортання) ===
    const toggleButtons = document.querySelectorAll(".toggle-details-btn");

    toggleButtons.forEach(btn => {
        btn.addEventListener("click", (e) => {
            const card = e.target.closest(".product-card");
            const details = card.querySelector(".details");
            
            if (details.classList.contains("hidden")) {
                details.classList.remove("hidden");
                e.target.textContent = "Згорнути";
            } else {
                details.classList.add("hidden");
                e.target.textContent = "Детальніше";
            }
        });
    });
});
