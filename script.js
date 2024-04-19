document.addEventListener('DOMContentLoaded', function() {
    // 1. Create a list of dishes
    let dishes = [
        { name: 'Croquette du Nécromancien', price: 9, category: 'spicy', image: './img/dish_ribbon_croquettes.png', history: 'Les croquettes du Nécromancien sont une spécialité de la maison. Elles sont préparées avec des ingrédients frais et de qualité. Le secret de leur saveur unique réside dans l\'utilisation d\'épices rares et d\'un soupçon de magie noire.', picture: './img/menu_croquettes.png' },
        { name: 'Les Yeux du Cultiste', price: 12, category: 'gluten_free', image: './img/dish_yeux.png', history: 'Les yeux du Cultiste sont une entrée raffinée et délicieuse. Ils sont préparés avec soin par nos cuisiniers et servis avec une sauce secrète qui ravira vos papilles.', picture: './img/menu_yeux.png'  },
        { name: 'Tentacules de l\'Abomination', price: 23, category: 'spicy', image: './img/dish_tentacules.png', history: 'Les tentacules de l\'Abomination sont un plat exotique et épicé. Ils sont préparés avec des tentacules de créatures marines rares et servis avec une sauce piquante qui réveillera vos sens.', picture: './img/menu_tentacules.png'},
        { name: 'La Tarte du Démon', price: 15, category: 'vegan', image: './img/dish_tarte.png', history: 'La tarte du Démon est un dessert divin. Elle est préparée avec des fruits frais et une pâte croustillante. Sa saveur unique et son goût sucré en font un dessert incontournable.', picture: './img/menu_tartes.png'  },
        // Add more dishes as needed...
    ];

    // Function to create a card for each dish
    function createDishCard(dish) {
        let card = document.createElement('div');
        card.classList.add('card');

        // Create an image element if the dish has an image property
        if (dish.image) {
            let img = document.createElement('img');
            img.src = dish.image;
            img.alt = `Image of ${dish.name}`;
            img.style.width = '300px'; // Set a specific width or handle via CSS
            img.addEventListener('click', () => displayDishDetails(dish));
            card.appendChild(img);
        }

        // Add the text content for the dish
        let text = document.createElement('div');
        text.textContent = `${dish.name}: ${dish.price}€`;
        card.appendChild(text);

        let categoryClass = dish.category.replace(/\s+/g, '-'); // Replace whitespace with hyphen
        card.classList.add(categoryClass);

        let addButton = document.createElement('button');
        addButton.textContent = 'Ajouter au panier';
        addButton.addEventListener('click', (event) => {
            event.stopPropagation(); // Prevent the card's click event from firing
            addToCart(dish);
        });
        card.appendChild(addButton);

        return card;
    }

    // Function to display dish details in the aside element
    function displayDishDetails(dish) {
        let detailsDiv = document.getElementById('dishDetails');
        detailsDiv.innerHTML = ''; // Clear previous details
        detailsDiv.style.display = 'block'; // Make the aside visible

        let dishPicture = document.createElement('img');
        dishPicture.src = dish.picture;
        dishPicture.alt = `Image of ${dish.name}`;
        dishPicture.style.width = '300px'; // Adjust the size as needed

        let dishName = document.createElement('h3');
        dishName.textContent = dish.name;

        let dishPrice = document.createElement('p');
        dishPrice.textContent = `Prix: ${dish.price}€`;

        let dishCategory = document.createElement('p');
        dishCategory.textContent = `Catégorie: ${dish.category}`;

        let dishHistory = document.createElement('p');
        dishHistory.textContent = `Description: ${dish.history}`

        detailsDiv.appendChild(dishPicture);
        detailsDiv.appendChild(dishName);
        detailsDiv.appendChild(dishPrice);
        detailsDiv.appendChild(dishCategory);
        detailsDiv.appendChild(dishHistory);
    }

    // Function to filter dishes by category
    function filterDishes(category) {
        let dishContainer = document.getElementById('dishes');
        dishContainer.innerHTML = '';
        let filteredDishes = category === 'all' ? dishes : dishes.filter(dish => dish.category === category);
        filteredDishes.forEach(dish => {
            dishContainer.appendChild(createDishCard(dish));
        });
    }

    // Initialize event listeners for filter rows
    document.querySelectorAll('.filter_row').forEach(filterOption => {
        filterOption.addEventListener('click', function() {
            let category = this.dataset.category;
            filterDishes(category);
        });
    });

    // Shopping cart logic
    let cart = [];
    function addToCart(dish) {
        cart.push(dish);
        updateCartDisplay();
    }

    function toggleCart() {
        const cartButton = document.getElementById("cart-button");
        const cart = document.getElementById("cart");
        const body = document.body;
        const main = document.querySelector("main"); // Ensure this selects only the content you want to blur

        cartButton.addEventListener("click", function () {
            cart.classList.toggle("cart-active");
            body.classList.toggle("no-scroll");
            main.classList.toggle("filter"); // This toggles the blur effect on and off
        });
    }

    toggleCart();


    let lastScrollTop = 0;
    window.addEventListener("scroll", function () {
        let currentScroll = window.pageYOffset || document.documentElement.scrollTop;

        if (currentScroll > lastScrollTop) {
            document.querySelector("header").classList.remove("sticky");
        } else {
            document.querySelector("header").classList.add("sticky");
        }
        if (currentScroll <= 0) {
            document.querySelector("header").classList.remove("sticky");
        }
        lastScrollTop = currentScroll;
    });

// Function to update cart display
    function updateCartDisplay() {
        let cartContainer = document.getElementById('cart');
        cartContainer.innerHTML = '';
        let total = 0;
        cart.forEach(dish => {
            let item = document.createElement('div');
            item.textContent = `${dish.name}: ${dish.price}€`;
            cartContainer.appendChild(item);
            total += dish.price;
        });
        let totalDisplay = document.createElement('div');
        totalDisplay.textContent = `Total du panier: ${total}€`;
        cartContainer.appendChild(totalDisplay);
    }


    // Dark mode switch logic
    document.getElementById("dark-mode-switch").addEventListener("change", function() {
        document.body.classList.toggle("dark-mode");
        // Toggling additional styles for specific elements
        var dishDetails = document.getElementById("dishDetails"); // Directly using getElementById for single element
        if (document.body.classList.contains("dark-mode")) {
            dishDetails.style.color = "#fff"; // Set text color to white in dark mode
            dishDetails.style.backgroundColor = "#333"; // Optional: change background too if needed
        } else {
            dishDetails.style.color = "#000"; // Set text color to black in light mode
            dishDetails.style.backgroundColor = "#fff"; // Optional: revert background color
        }
    });


    // Display all dishes at start
    filterDishes('all');
});