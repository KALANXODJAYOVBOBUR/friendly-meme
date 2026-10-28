
const $ = (selector) => document.querySelector(selector);

const products = [
  {
    id: 1,
    name: "Truffle Burger",
    category: "Asosiy taom",
    price: 89000,
    tag: "CHEF TANLOVI",
    desc: "Shirali mol go‘shti, truffle sousi va briosh noni.",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=85"
  },
  {
    id: 2,
    name: "Margherita Pizza",
    category: "Pitsa",
    price: 76000,
    tag: "KLASSIKA",
    desc: "Pomidor, mozzarella va yangi rayhon.",
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=800&q=85"
  },
  {
    id: 3,
    name: "Burrata Salat",
    category: "Salat",
    price: 68000,
    tag: "YANGI",
    desc: "Burrata pishlog‘i, pomidor va zaytun moyi.",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=85"
  },
  {
    id: 4,
    name: "Grill Steak",
    category: "Asosiy taom",
    price: 189000,
    tag: "PREMIUM",
    desc: "Grilda pishirilgan go‘sht va maxsus sous.",
    image: "https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=800&q=85"
  },
  {
    id: 5,
    name: "Pasta Alfredo",
    category: "Asosiy taom",
    price: 84000,
    tag: "MASHHUR",
    desc: "Qaymoqli sous, parmesan va italyancha pasta.",
    image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=800&q=85"
  },
  {
    id: 6,
    name: "Chocolate Fondant",
    category: "Desert",
    price: 49000,
    tag: "SWEET MOMENT",
    desc: "Shokoladli desert va vanilli muzqaymoq.",
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=85"
  },
  {
    id: 7,
    name: "Berry Cheesecake",
    category: "Desert",
    price: 45000,
    tag: "YANGI",
    desc: "Mayin krem-pishloq va rezavor mevalar.",
    image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=800&q=85"
  },
  {
    id: 8,
    name: "Fresh Lemonade",
    category: "Ichimlik",
    price: 26000,
    tag: "FRESH",
    desc: "Limon, yalpiz va muzli tetiklantiruvchi ichimlik.",
    image: "https://images.unsplash.com/photo-1513558161293-cdae350d3c?auto=format&fit=crop&w=800&q=85"
  },
  {
    id: 9,
    name: "Pepperoni Pizza",
    category: "Pitsa",
    price: 92000,
    tag: "MASHHUR",
    desc: "Pepperoni, mozzarella va pomidor sousi.",
    image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=800&q=85"
  },
  {
    id: 10,
    name: "Caesar Salat",
    category: "Salat",
    price: 59000,
    tag: "KLASSIKA",
    desc: "Tovuq filesi, parmesan va Caesar sousi.",
    image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?auto=format&fit=crop&w=800&q=85"
  },
  {
    id: 11,
    name: "Iced Latte",
    category: "Ichimlik",
    price: 29000,
    tag: "CHILLED",
    desc: "Espresso, sut va muz bilan tayyorlangan qahva.",
    image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=800&q=85"
  },
  {
    id: 12,
    name: "Salmon Bowl",
    category: "Asosiy taom",
    price: 115000,
    tag: "FRESH CHOICE",
    desc: "Baliq, guruch va mavsumiy sabzavotlar.",
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=800&q=85"
  }
];

let activeCategory = "Barchasi";
let cart = [];
let toastTimer;

// Narxni so‘m formatida chiqarish
function money(price) {
  return new Intl.NumberFormat("uz-UZ").format(price) + " so‘m";
}

// Xabar ko‘rsatish
function showToast(message) {
  const toast = $("#toast");

  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(toastTimer);

  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2600);
}

// Mahsulotlarni chiqarish
function renderProducts() {
  const query = $("#searchInput").value.trim().toLowerCase();

  const filtered = products.filter((product) => {
    const categoryMatches =
      activeCategory === "Barchasi" ||
      product.category === activeCategory;

    const searchMatches =
      `${product.name} ${product.desc} ${product.category}`
        .toLowerCase()
        .includes(query);

    return categoryMatches && searchMatches;
  });

  $("#productGrid").innerHTML = filtered.map((product) => `
    <article class="product-card">
      <div class="product-photo">
        <img
          src="${product.image}"
          alt="${product.name}"
          loading="lazy"
        >
        <span class="product-tag">${product.tag}</span>
      </div>

      <div class="product-info">
        <div class="product-top">
          <h3>${product.name}</h3>
          <span class="product-price">${money(product.price)}</span>
        </div>

        <p>${product.desc}</p>

        <div class="product-bottom">
          <span>★ 4.9 · ${product.category}</span>
          <button
            class="add-button"
            data-add="${product.id}"
            aria-label="${product.name} savatga qo‘shish"
          >+</button>
        </div>
      </div>
    </article>
  `).join("");

  $("#emptyState").classList.toggle(
    "hidden",
    filtered.length !== 0
  );
}

// Savatni yangilash
function renderCart() {
  const count = cart.reduce(
    (sum, item) => sum + item.qty, 0
  );

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.qty, 0
  );

  $("#cartCount").textContent = count;
  $("#cartTotal").textContent = money(total);

  if (cart.length === 0) {
    $("#cartItems").innerHTML = `
      <div class="cart-empty">
        Savat hozircha bo‘sh.<br>
        Yoqtirgan taomingizni qo‘shing!
      </div>
    `;
    return;
  }

  $("#cartItems").innerHTML = cart.map((item) => `
    <div class="cart-item">
      <img src="${item.image}" alt="${item.name}">

      <div>
        <h4>${item.name}</h4>
        <small>${money(item.price)}</small>

        <div class="quantity">
          <button
            data-qty="${item.id}"
            data-delta="-1"
            aria-label="Kamaytirish"
          >−</button>

          <span>${item.qty}</span>

          <button
            data-qty="${item.id}"
            data-delta="1"
            aria-label="Ko‘paytirish"
          >+</button>
        </div>
      </div>

      <button
        class="remove-item"
        data-remove="${item.id}"
        aria-label="Mahsulotni o‘chirish"
      >×</button>
    </div>
  `).join("");
}

// Savatga mahsulot qo‘shish
function addToCart(id) {
  const product = products.find((item) => item.id === id);

  if (!product) return;

  const existing = cart.find((item) => item.id === id);

  if (existing) {
    existing.qty++;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  renderCart();
  showToast(`${product.name} savatga qo‘shildi!`);
}

// Telefon raqami bilan kirish
$("#loginForm").addEventListener("submit", (event) => {
  event.preventDefault();

  const digits = $("#phone").value.replace(/\D/g, "");

  if (digits.length !== 9) {
    $("#phoneError").textContent =
      "9 ta raqamni to‘liq kiriting.";
    return;
  }

  $("#phoneError").textContent = "";
  $("#loginScreen").classList.add("hidden");
  $("#site").classList.remove("hidden");

  showToast("Xush kelibsiz! Menyudan taom tanlang.");
});

// Telefon maydoniga faqat raqam yozish
$("#phone").addEventListener("input", (event) => {
  event.target.value = event.target.value
    .replace(/\D/g, "")
    .slice(0, 9);

  $("#phoneError").textContent = "";
});

// Kategoriyalarni almashtirish
$("#categories").addEventListener("click", (event) => {
  const button = event.target.closest("[data-category]");

  if (!button) return;

  activeCategory = button.dataset.category;

  document.querySelectorAll(".category").forEach((item) => {
    item.classList.toggle("active", item === button);
  });

  renderProducts();
});

// Taomlarni qidirish
$("#searchInput").addEventListener("input", renderProducts);

// Mahsulotni savatga qo‘shish
$("#productGrid").addEventListener("click", (event) => {
  const button = event.target.closest("[data-add]");

  if (button) {
    addToCart(Number(button.dataset.add));
  }
});

// Savatni ochish va yopish
$("#cartButton").addEventListener("click", () => {
  $("#cartDrawer").classList.remove("hidden");
});

function closeCart() {
  $("#cartDrawer").classList.add("hidden");
}

$("#closeCart").addEventListener("click", closeCart);
$("#cartBackdrop").addEventListener("click", closeCart);

// Savatdagi mahsulotlar sonini o‘zgartirish
$("#cartItems").addEventListener("click", (event) => {
  const quantityButton = event.target.closest("[data-qty]");
  const removeButton = event.target.closest("[data-remove]");

  if (quantityButton) {
    const id = Number(quantityButton.dataset.qty);
    const delta = Number(quantityButton.dataset.delta);

    const item = cart.find((product) => product.id === id);

    if (item) {
      item.qty += delta;

      if (item.qty <= 0) {
        cart = cart.filter((product) => product.id !== id);
      }
    }

    renderCart();
  }

  if (removeButton) {
    const id = Number(removeButton.dataset.remove);

    cart = cart.filter((product) => product.id !== id);
    renderCart();
  }
});

// Buyurtma berish — demo rejimi
$("#orderButton").addEventListener("click", () => {
  if (cart.length === 0) {
    showToast("Avval savatga taom qo‘shing.");
    return;
  }

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.qty, 0
  );

  showToast(`Demo buyurtma tayyor. Jami: ${money(total)}`);

  cart = [];
  renderCart();
  closeCart();
});

// Stol band qilish — demo rejimi
$("#reservationForm").addEventListener("submit", (event) => {
  event.preventDefault();

  const name = $("#guestName").value.trim();
  const date = $("#reserveDate").value;

  if (!name || !date) {
    showToast("Barcha kerakli maydonlarni to‘ldiring.");
    return;
  }

  const selectedDate = new Date(date + "T00:00:00");
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (selectedDate < today) {
    showToast("Bugungi yoki kelajakdagi sanani tanlang.");
    return;
  }

  showToast(
    `Rahmat, ${name}! Stol band qilish so‘rovi tayyor.`
  );

  event.target.reset();
});

// O‘tgan sanalarni tanlashni cheklash
const today = new Date();

const minDate =
  `${today.getFullYear()}-` +
  `${String(today.getMonth() + 1).padStart(2, "0")}-` +
  `${String(today.getDate()).padStart(2, "0")}`;

$("#reserveDate").min = minDate;

// Saytni ishga tushirish
renderProducts();
renderCart();
