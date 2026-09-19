const menuData = {

    brunch: [
        {
            name: "Smash Cheeseburger",
            description: "Double patty, cheese, onions, house sauce & fries",
            price: "£15"
        },
        {
            name: "Croque Madame",
            description: "Tiger bloomer, ham, cheddar, béchamel & fried egg",
            price: "£13"
        },
        {
            name: "Croque Monsieur",
            description: "Tiger bloomer, ham, cheddar & béchamel",
            price: "£11"
        },
        {
            name: "Avocado on Toast",
            description: "Smashed avocado, chilli & poached egg on sourdough",
            price: "£9"
        },
        {
            name: "Brasserie Pancakes",
            description: "Fluffy pancakes with maple syrup & seasonal berries",
            price: "£8"
        },
        {
            name: "3 Egg Omelette",
            description: "French-style omelette with cheese or ham & side salad",
            price: "£11"
        },
        {
            name: "Tuna Baguette",
            description: "Tuna mayo, red onions & cucumber",
            price: "£8"
        },
        {
            name: "Mussels & Frites",
            description: "Classic mussels served with French fries",
            price: "£19"
        }
    ],

    pizza: [
        {
            name: "The Queen",
            description: "Tomato, mozzarella di bufala & fresh basil",
            price: "£11"
        },
        {
            name: "The Charcutier",
            description: "Tomato, mozzarella & pepperoni",
            price: "£13"
        },
        {
            name: "The Forester",
            description: "Tomato, mozzarella & sliced mushrooms",
            price: "£13"
        },
        {
            name: "The Three Musketeers",
            description: "Mozzarella, ricotta & parmesan",
            price: "£14"
        },
        {
            name: "The Sailor",
            description: "Mozzarella, salted anchovies & capers",
            price: "£14"
        },
        {
            name: "The Carnivore",
            description: "Pepperoni, ham & seasoned ground beef",
            price: "£16"
        },
        {
            name: "Vegetarian",
            description: "Mushrooms, roasted peppers & onions",
            price: "£12"
        }
    ],

    drinks: [
        {
            name: "Espresso",
            description: "Classic shot of espresso",
            price: "£3"
        },
        {
            name: "Cappuccino",
            description: "Espresso with frothy steamed milk & cocoa",
            price: "£4"
        },
        {
            name: "Flat White",
            description: "Espresso with silky steamed milk",
            price: "£4"
        },
        {
            name: "Latte",
            description: "Espresso blended with steamed milk",
            price: "£4"
        },
        {
            name: "Matcha Latte",
            description: "Matcha with creamy steamed milk",
            price: "£5"
        },
        {
            name: "Iced Latte",
            description: "Espresso and milk served over ice",
            price: "£4.50"
        },
        {
            name: "Fresh Orange Juice",
            description: "Freshly squeezed in-house",
            price: "£4.50"
        },
        {
            name: "Homemade Lemonade",
            description: "Fresh lemon with Fairtrade sugar",
            price: "£3.50"
        }
    ],

    sweet: [
        {
            name: "Bonjour Hot Chocolate",
            description: "Signature thick hot chocolate with mini macarons",
            price: "£5.20"
        },
        {
            name: "Brasserie Pancakes",
            description: "Fluffy pancakes with maple syrup & berries",
            price: "£8"
        },
        {
            name: "Wild Berry",
            description: "Strawberries, raspberries, blueberries & yoghurt",
            price: "£6.50"
        },
        {
            name: "Tropical Gold",
            description: "Mango, pineapple, passion fruit & coconut milk",
            price: "£6.50"
        }
    ]
};


const menuGrid = document.getElementById("menuGrid");
const tabs = document.querySelectorAll(".menu-tab");


function renderMenu(category) {

    menuGrid.innerHTML = "";

    menuData[category].forEach(item => {

        const card = document.createElement("article");

        card.className = "menu-item";

        card.innerHTML = `
            <div>
                <h3>${item.name}</h3>
                <p>${item.description}</p>
            </div>

            <span class="menu-price">
                ${item.price}
            </span>
        `;

        menuGrid.appendChild(card);
    });
}


tabs.forEach(tab => {

    tab.addEventListener("click", () => {

        tabs.forEach(button => {
            button.classList.remove("active");
        });

        tab.classList.add("active");

        renderMenu(tab.dataset.category);

    });

});


/* MOBILE NAV */

const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");

menuToggle.addEventListener("click", () => {
    nav.classList.toggle("open");
});


document.querySelectorAll("#nav a").forEach(link => {

    link.addEventListener("click", () => {
        nav.classList.remove("open");
    });

});


/* YEAR */

document.getElementById("year").textContent =
    new Date().getFullYear();


/* INITIAL MENU */

renderMenu("brunch");