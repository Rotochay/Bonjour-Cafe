/* =========================================
   BONJOUR EPSOM
   ========================================= */

/* ---------- MENU DATA ---------- */

const menuData = {

    brunch: [
        { name: "Smash Cheeseburger", description: "Double patty, cheese, onions, house sauce & fries", price: "£15" },
        { name: "Croque Madame", description: "Tiger bloomer, ham, cheddar, béchamel & fried egg", price: "£13" },
        { name: "Croque Monsieur", description: "Tiger bloomer, ham, cheddar & béchamel", price: "£11" },
        { name: "Avocado on Toast", description: "Smashed avocado, chilli & poached egg on sourdough", price: "£9" },
        { name: "Brasserie Pancakes", description: "Fluffy pancakes with maple syrup & seasonal berries", price: "£8" },
        { name: "3 Egg Omelette", description: "French-style omelette with cheese or ham & side salad", price: "£11" },
        { name: "Tuna Baguette", description: "Tuna mayo, red onions & cucumber", price: "£8" },
        { name: "Mussels & Frites", description: "Classic mussels served with French fries", price: "£19" }
    ],

    pizza: [
        { name: "The Queen", description: "Tomato, mozzarella di bufala & fresh basil", price: "£11" },
        { name: "The Charcutier", description: "Tomato, mozzarella & pepperoni", price: "£13" },
        { name: "The Forester", description: "Tomato, mozzarella & sliced mushrooms", price: "£13" },
        { name: "The Three Musketeers", description: "Mozzarella, ricotta & parmesan", price: "£14" },
        { name: "The Sailor", description: "Mozzarella, salted anchovies & capers", price: "£14" },
        { name: "The Carnivore", description: "Pepperoni, ham & seasoned ground beef", price: "£16" },
        { name: "Vegetarian", description: "Mushrooms, roasted peppers & onions", price: "£12" }
    ],

    drinks: [
        { name: "Espresso", description: "Classic shot of espresso", price: "£3" },
        { name: "Cappuccino", description: "Espresso with frothy steamed milk & cocoa", price: "£4" },
        { name: "Flat White", description: "Espresso with silky steamed milk", price: "£4" },
        { name: "Latte", description: "Espresso blended with steamed milk", price: "£4" },
        { name: "Matcha Latte", description: "Matcha with creamy steamed milk", price: "£5" },
        { name: "Iced Latte", description: "Espresso and milk served over ice", price: "£4.50" },
        { name: "Fresh Orange Juice", description: "Freshly squeezed in-house", price: "£4.50" },
        { name: "Homemade Lemonade", description: "Fresh lemon with Fairtrade sugar", price: "£3.50" }
    ],

    sweet: [
        { name: "Bonjour Hot Chocolate", description: "Signature thick hot chocolate with mini macarons", price: "£5.20" },
        { name: "Brasserie Pancakes", description: "Fluffy pancakes with maple syrup & berries", price: "£8" },
        { name: "Wild Berry", description: "Strawberries, raspberries, blueberries & yoghurt", price: "£6.50" },
        { name: "Tropical Gold", description: "Mango, pineapple, passion fruit & coconut milk", price: "£6.50" }
    ]
};


/* ---------- HELPERS ---------- */

// Menu text is our own, but escape anyway so edits can't break the markup.
function esc(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
}


/* ---------- MENU ---------- */

const menuGrid = document.getElementById("menuGrid");
const tabs = Array.from(document.querySelectorAll(".menu-tab"));

function renderMenu(category) {
    if (!menuGrid || !menuData[category]) return;

    menuGrid.innerHTML = menuData[category].map(item => `
        <article class="menu-item">
            <div class="menu-item-top">
                <h3>${esc(item.name)}</h3>
                <span class="menu-leader" aria-hidden="true"></span>
                <span class="menu-price">${esc(item.price)}</span>
            </div>
            <p>${esc(item.description)}</p>
        </article>
    `).join("");
}

function selectTab(tab, moveFocus) {
    tabs.forEach(t => {
        const active = t === tab;
        t.classList.toggle("active", active);
        t.setAttribute("aria-selected", active);
        t.tabIndex = active ? 0 : -1;
    });

    menuGrid.setAttribute("aria-labelledby", tab.id);
    renderMenu(tab.dataset.category);
    if (moveFocus) tab.focus();
}

tabs.forEach((tab, i) => {
    tab.addEventListener("click", () => selectTab(tab, false));

    // Arrow-key navigation between tabs
    tab.addEventListener("keydown", e => {
        let next = null;
        if (e.key === "ArrowRight") next = tabs[(i + 1) % tabs.length];
        if (e.key === "ArrowLeft")  next = tabs[(i - 1 + tabs.length) % tabs.length];
        if (e.key === "Home")       next = tabs[0];
        if (e.key === "End")        next = tabs[tabs.length - 1];
        if (next) {
            e.preventDefault();
            selectTab(next, true);
        }
    });
});


/* ---------- MOBILE NAV ---------- */

const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");

function setNav(open) {
    nav.classList.toggle("open", open);
    menuToggle.setAttribute("aria-expanded", open);
    menuToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
}

if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
        setNav(!nav.classList.contains("open"));
    });

    nav.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => setNav(false));
    });

    document.addEventListener("keydown", e => {
        if (e.key === "Escape" && nav.classList.contains("open")) {
            setNav(false);
            menuToggle.focus();
        }
    });
}


/* ---------- OPENING HOURS (London time) ---------- */

const HOURS = {
    weekday: { open: "07:00", close: "17:30" },
    weekend: { open: "08:00", close: "17:30" }
};

const toMinutes = hhmm => {
    const [h, m] = hhmm.split(":").map(Number);
    return h * 60 + m;
};

function londonNow() {
    const parts = new Intl.DateTimeFormat("en-GB", {
        timeZone: "Europe/London",
        weekday: "short",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false
    }).formatToParts(new Date());

    const get = type => parts.find(p => p.type === type).value;
    const dayIndex = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(get("weekday"));

    return {
        day: dayIndex,
        minutes: (Number(get("hour")) % 24) * 60 + Number(get("minute"))
    };
}

function updateOpenStatus() {
    const { day, minutes } = londonNow();
    const isWeekend = day === 0 || day === 6;
    const today = isWeekend ? HOURS.weekend : HOURS.weekday;

    const isOpen = minutes >= toMinutes(today.open) && minutes < toMinutes(today.close);

    // Top bar badge
    const badge = document.getElementById("openStatus");
    if (badge) {
        badge.className = "open-status " + (isOpen ? "is-open" : "is-closed");

        if (isOpen) {
            badge.textContent = "Open now · until " + today.close;
        } else if (minutes < toMinutes(today.open)) {
            badge.textContent = "Closed · opens today at " + today.open;
        } else {
            const tomorrow = (day + 1) % 7;
            const next = tomorrow === 0 || tomorrow === 6 ? HOURS.weekend : HOURS.weekday;
            badge.textContent = "Closed · opens tomorrow at " + next.open;
        }
    }

    // Highlight today's row in the hours card
    document.querySelectorAll(".hours-row").forEach(row => {
        const days = row.dataset.days.split(",").map(Number);
        row.classList.toggle("is-today", days.includes(day));
    });
}


/* ---------- FOOTER YEAR ---------- */

const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();


/* ---------- INIT ---------- */

renderMenu("brunch");
updateOpenStatus();
setInterval(updateOpenStatus, 60000);
