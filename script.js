document.addEventListener("DOMContentLoaded", function () {
  const header = document.querySelector(".container-header");
  const searchInput = document.querySelector(".search-input");

  // Menghitung tinggi header dan menetapkan posisi search input
  const headerHeight = header.offsetHeight;
  const additionalOffset = window.innerHeight * 0.01; // 3% dari tinggi viewport

  // Tetapkan posisi search input agar berada 3% di bawah header
  searchInput.style.top = `${headerHeight + additionalOffset}px`;
});


// Enable Swiping on the Tabs
const menuTabs = document.querySelector('.menu-tabs');

let isDown = false;
let startX;
let scrollLeft;

menuTabs.addEventListener('mousedown', (e) => {
  isDown = true;
  menuTabs.classList.add('active');
  startX = e.pageX - menuTabs.offsetLeft;
  scrollLeft = menuTabs.scrollLeft;
});

menuTabs.addEventListener('mouseleave', () => {
  isDown = false;
  menuTabs.classList.remove('active');
});

menuTabs.addEventListener('mouseup', () => {
  isDown = false;
  menuTabs.classList.remove('active');
});

menuTabs.addEventListener('mousemove', (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - menuTabs.offsetLeft;
  const walk = (x - startX) * 2; // Adjust scrolling speed
  menuTabs.scrollLeft = scrollLeft - walk;
});

// Fungsi untuk scroll ke kategori yang sesuai
function scrollToCategory(category) {
  const categoryElement = document.getElementById(category);
  
  // Scroll ke elemen kategori dengan smooth scrolling
  window.scrollTo({
    top: categoryElement.offsetTop, 
    behavior: 'smooth'
  });
}

// Fungsi toggle untuk menampilkan/hide menu saat hamburger ditekan
function toggleMenu() {
  const menuTabs = document.querySelector('.menu-tabs');
  menuTabs.classList.toggle('show');
}


// Get the floating search button and input field
const floatingSearch = document.getElementById('floatingSearch');
const searchInput = document.getElementById('searchInput');

// Add click event to the search button
floatingSearch.addEventListener('click', () => {
    // Toggle the active class to show/hide the search input
    searchInput.classList.toggle('active');

    // If the search input is active, focus on it
    if (searchInput.classList.contains('active')) {
        searchInput.focus();
    } else {
        // If search input is not active, clear the text
        searchInput.value = '';
        
        // Optionally, you can also hide menu items when the search input is closed
        const menuItems = document.querySelectorAll('.menu-item');
        menuItems.forEach(item => {
            item.style.display = 'block'; // Ensure all items are visible when the search is cleared
        });
    }
});

document.addEventListener('DOMContentLoaded', function () {
  const menuItems = document.querySelectorAll('.menu-item');
  
  // Function to handle search input
  searchInput.addEventListener('input', function () {
    const query = searchInput.value.toLowerCase();
    
    // Loop through each menu item and check if it matches the search query
    menuItems.forEach(item => {
      const title = item.querySelector('h4').textContent.toLowerCase();
      const price = item.querySelector('p').textContent.toLowerCase();
      const category = item.getAttribute('data-category').toLowerCase();
      
      // Check if the title, price, or category matches the search query
      if (title.includes(query) || price.includes(query) || category.includes(query)) {
        item.style.display = 'block'; // Show item if it matches
      } else {
        item.style.display = 'none'; // Hide item if it doesn't match
      }
    });
  });
});




document.addEventListener("DOMContentLoaded", function () {
  const tabs = document.querySelectorAll(".tab");
  const categories = document.querySelectorAll(".menu-category");
  const menuTabsWrapper = document.querySelector(".menu-tabs-wrapper");
  const menuTabs = document.querySelector(".menu-tabs");
  const hamburger = document.getElementById("hamburger-menu");

  // Fungsi untuk menandai tab aktif
  function setActiveTabByCategory(categoryId) {
    tabs.forEach(tab => tab.classList.remove("active")); // Reset semua tab
    const activeTab = document.querySelector(`[onclick="scrollToCategory('${categoryId}')"]`);
    if (activeTab) activeTab.classList.add("active"); // Tandai tab sesuai kategori

    // Geser tab aktif ke arah hamburger
    scrollActiveTabToLeft(activeTab);
  }

  // Fungsi untuk menggeser tab aktif ke arah hamburger
  function scrollActiveTabToLeft(activeTab) {
    if (!activeTab) return;

    // Hitung jarak dari tab aktif ke tombol hamburger
    const activeTabPosition = activeTab.offsetLeft;
    const scrollOffset = activeTabPosition - hamburger.offsetWidth - 10; // Tambahkan jarak sedikit dari hamburger

    // Geser container menu-tabs
    menuTabs.scrollTo({
      left: scrollOffset,
      behavior: "smooth",
    });
  }

  // Intersection Observer untuk memantau kategori
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveTabByCategory(entry.target.id); // Aktifkan tab sesuai ID kategori
        }
      });
    },
    {
      root: null, // Default viewport
      threshold: 0.5 // Kategori dianggap terlihat jika 50% masuk viewport
    }
  );

  // Observasi setiap kategori
  categories.forEach(category => observer.observe(category));

  // Scroll ke kategori dengan mempertimbangkan tinggi header
  function scrollToCategory(categoryId) {
    const categoryElement = document.getElementById(categoryId);
    const headerHeight = document.querySelector(".container-header").offsetHeight;

    // Hitung posisi scroll dengan mempertimbangkan tinggi header
    const scrollPosition = categoryElement.offsetTop - headerHeight;

    // Smooth scroll ke posisi yang telah disesuaikan
    window.scrollTo({
      top: scrollPosition,
      behavior: "smooth",
    });

    // Tambahkan efek interaktif pada tab
    setActiveTab(categoryId);
  }

  // Menandai tab aktif
  function setActiveTab(categoryId) {
    tabs.forEach(tab => tab.classList.remove("active"));
    const activeTab = document.querySelector(`[onclick="scrollToCategory('${categoryId}')"]`);
    if (activeTab) activeTab.classList.add("active");
    scrollActiveTabToLeft(activeTab); // Pastikan tab aktif digeser ke kiri
  }

  // Set tab aktif default ke "Promo & Package"
  setActiveTabByCategory("promo");
});


// Script untuk mengatur status tombol Coffee O'Clock berdasarkan jam
document.addEventListener("DOMContentLoaded", function () {
  const coffeeOClockButton = document.querySelector('#promo .menu-item:nth-child(3) .add-btn');

  // Fungsi untuk mengecek waktu
  function checkTimeForCoffee() {
    const currentHour = new Date().getHours();

    // Cek apakah waktu antara pukul 14:00 - 17:00
    if (currentHour >= 14 && currentHour < 17) {
      coffeeOClockButton.textContent = "Add";
      coffeeOClockButton.disabled = false; // Aktifkan tombol
      coffeeOClockButton.classList.remove("disabled"); // Hapus class tambahan jika ada
    } else {
      coffeeOClockButton.textContent = "Close";
      coffeeOClockButton.disabled = true; // Nonaktifkan tombol
      coffeeOClockButton.classList.add("disabled"); // Tambahkan class untuk visual tambahan
    }
  }

  // Panggil fungsi saat halaman dimuat
  checkTimeForCoffee();

  // Periksa ulang waktu setiap menit (opsional)
  setInterval(checkTimeForCoffee, 60000); // Update setiap 60 detik
});

// Script untuk mengatur status tombol pada Brunch Menu berdasarkan jam
document.addEventListener("DOMContentLoaded", function () {
  const brunchButtons = document.querySelectorAll('#brunch .add-btn');

  // Fungsi untuk mengecek waktu dan mengatur tombol
  function checkTimeForBrunch() {
    const currentHour = new Date().getHours();

    // Iterasi setiap tombol pada kategori brunch
    brunchButtons.forEach(button => {
      if (currentHour >= 9 && currentHour < 13) {
        button.textContent = "Add";
        button.disabled = false; // Aktifkan tombol
        button.classList.remove("disabled"); // Hapus class tambahan jika ada
      } else {
        button.textContent = "Close";
        button.disabled = true; // Nonaktifkan tombol
        button.classList.add("disabled"); // Tambahkan class untuk visual tambahan
      }
    });
  }

  // Panggil fungsi saat halaman dimuat
  checkTimeForBrunch();

  // Periksa ulang waktu setiap menit (opsional)
  setInterval(checkTimeForBrunch, 60000); // Update setiap 60 detik
});



// deskripsiiiiii
  // Data dummy untuk setiap item (dapat diambil dari backend)
const menuItems = [
    {
        id: 1,
        name: "Sweet Candles Package A",
        price: "Rp159.000",
        description: "3 Viennoseries + 2 Pastries with option Viennoseries (The Monsier Spoon Croissant, Black Chocolatin).",
        image: "img/display/packagea.jpg"
    },
    {
      id: 2,
        name: "Sweet Candles Package B",
        price: "Rp188.000",
        description: "Sweet Candles A / B?.",
        image: "img/display/packageb.jpg"
    },
    {
        id: 3,
        name: "Coffe O'Clock",
        price: "Rp39.000",
        description: "Start from 14.00 - 17.00.",
        image: "img/display/clock.jpg"
      },
      {
        id: 4,
        name: "Super Healthy Bowl",
        price: "Rp0.000",
        description: "Strawberry, banana, Granola, Coconut Flake & Goji Berry yg disajikan dengan dragon & Banana Smoothies (Fresh, Sweet & Soury).",
        image: "img/brunch/healthybowls.jpg"
      },
      {
        id: 5,
        name: "Avocado Bruschetta",
        price: "Rp0.000",
        description: "Sourdough with topping mashed avocado & feta cheese (Salty  & Soury).",
        image: "img/brunch/bruschetta.jpg"
      },
      {
        id: 6,
        name: "Basilico Prawn Croissant Cup",
        price: "Rp0.000",
        description: "Start from 14.00 - 17.00.",
        image: "img/brunch/basilicoprawncroissantcup.jpg"
      },
      {
        id: 7,
        name: "Beef Bacon Egg On Toast",
        price: "Rp0.000",
        description: "Multi bread yang disajikan dengan beef bacon onion caramelize & Egg (Sweet & Savoury).",
        image: "img/brunch/beefbacon.jpg"
      },
      {
        id: 8,
        name: "Cheese & Tomato Croissant Cup",
        price: "Rp0.000",
        description: "Croissant cup with basic parmesan cheese and tomato fondue mixed with red onion inside (Umamy, Creamy, Soury).",
        image: "img/brunch/cheeseandtomatocroissantcup.jpg"
      },
      {
        id: 9,
        name: "Croissant Benedict",
        price: "Rp0.000",
        description: "Croissant toast with beef mortadella yang di topping dengan poach egg & hollandaise sauce (Creamy).",
        image: "img/brunch/benedict.jpg"
      },
      {
        id: 10,
        name: "French Toast",
        price: "Rp0.000",
        description: "Roti brioche dengan topping fruit compoted & lemon mix (Sweet & Sour).",
        image: "img/brunch/frenchtoast.jpg"
      },
      {
        id: 11,
        name: "Quiche Lorraine",
        price: "Rp0.000",
        description: "Puff pastry dengan isi bacon yang disajikan dengan mix salad (Salty & Savoury).",
        image: "img/brunch/quiche.jpg"
      },
      {
        id: 12,
        name: "Monsier Spoon Granola",
        price: "Rp0.000",
        description: "Healthy food with mix fruit & peanut yang disajikan dengan yogurth (Sweet & SOury).",
        image: "img/brunch/granola.jpg"
      },
      {
        id: 13,
        name: "Wagyu Signature",
        price: "Rp95.000",
        description: "Wagyu beef patty, Scrambled eggs, onion, lettuce, cheddar cheese & BBQ sauce on house-made croger bun.",
        image: "img/sandwich/wagyusignature.jpg"
      },
      {
        id: 14,
        name: "Buttermilk Chicken",
        price: "Rp69.000",
        description: "Crispy buttermilk chicken with mozza cheese, caramelized onion, lettuce and aioil on house-made croger bun (Tasty, Creamy, Crispy outside).",
        image: "img/sandwich/buttermilkchicken.jpg"
      },
      {
        id: 15,
        name: "Pulled Brisket & Egg",
        price: "Rp79.000",
        description: "Croger with pulled brisket, sunny side up egg, bega cheese & BBQ sauce.",
        image: "img/sandwich/pulledbrisketandegg.jpg"
      },
      {
        id: 16,
        name: "Tamago Katsu Mortadella",
        price: "Rp75.000",
        description: "Tamago katsu, beef mortadella, tomato, iceberg & Japanese mayo on house-made croger bun.",
        image: "img/sandwich/tamagokatsumortadella.jpg"
      },
      {
        id: 17,
        name: "Truffle Scrambled Egg",
        price: "Rp65.000",
        description: "Creamy french scrambled eggs, truffle oil, sauted mushrooms & porcini salt.",
        image: "img/sandwich/truffle scrambled egg.jpg"
      },
      {
        id: 18,
        name: "Smoked Chicken Croissant",
        price: "Rp69.000",
        description: "Smoked chicken, romain lettuce, smoked paprika jam, red onion & Emmental cheese.",
        image: "img/sandwich/Smoked Chicken Croissant.jpeg"
      },
      {
        id: 19,
        name: "Double Cheese and Ham",
        price: "Rp76.000",
        description: "Cheese croissant, melted Emmental cheese, beef ham, fresh tomato & salad. ADD BEEF BACON/HAM +20.",
        image: "img/sandwich/doublecheeseandham.jpg"
      },
      {
        id: 20,
        name: "The Monsier Spoon Club Sandwich",
        price: "Rp75.000",
        description: "White toast, rosemary chicken, creamy egg mayo, tomato, lettuce, mozzarella cheese, and aioil (creamy).",
        image: "img/sandwich/themonsierspoonclubsandwhich.jpg"
      },
      {
        id: 21,
        name: "French Dip Pulled Beef Baguette",
        price: "Rp99.000",
        description: "Baguette, daging sapi suwir yang dimasak perlahan, fondue tomat, bawang karamel, krim parmesan, dan keju mozzarella disajikan dengan saus au jus (saus kaldu daging).",
        image: "img/sandwich/frenchdippulledbeefbaguette.jpg"
      },
      {
        id: 22,
        name: "Toasted Mushroom Baguette",
        price: "Rp69.000",
        description: "Baguette, sauted mushrooms, garlic butter, mozzarella cheese, and parmesan.",
        image: "img/sandwich/toastedmushroombaguette.jpg"
      },
      {
        id: 23,
        name: "Peach Salad",
        price: "Rp65.000",
        description: "Mixed greens, peach, feta cheese, red onion, and a sweet chili dressing.",
        image: "img/salad&soup/peachsalad.jpg"
      },
      {
        id: 24,
        name: "Shrimp Avocado Salsa Salad",
        price: "Rp69.000",
        description: "Garlic sauteéd shrimp, avocado, romaine, and salsa dressing (saus segar & sedikit pedas).",
        image: "img/salad&soup/shrimpavocadosalsasalad.jpg"
      },
      {
        id: 25,
        name: "Watermelon Feta Salad",
        price: "Rp59.000",
        description: "Fresh watermelon, feta cheese, olive oil, lemon, and basil.",
        image: "img/salad&soup/watermelonfetasalad.jpg"
      },
      {
        id: 26,
        name: "Clasic Caesar Salad",
        price: "Rp59.000",
        description: "Romaine lettuce, croutons, boiled egg, bacon, grana padano, and anchovy dressing.",
        image: "img/salad&soup/classiccaesarsalad.jpg"
      },
      {
        id: 27,
        name: "Smoked Chicken Salad",
        price: "Rp75.000",
        description: "Smoked chicken, romaine lettuce, red onions, cherry tomatoes, and plum sugar dressing.",
        image: "img/salad&soup/smokedchickensalad.jpg"
      },
      {
        id: 28,
        name: "Vegetarian Nicoise Salad",
        price: "Rp65.000",
        description: "A super summer salad, green beans, cherry tomatoes, kalamata olives, lettuce, and red onions.",
        image: "img/salad&soup/vegetariannicoisesalad.jpg"
      },
      {
        id: 29,
        name: "Leafy Green Salad",
        price: "Rp29.000",
        description: "A mix of green salad dressed with a house vinaigrette.",
        image: "img/salad&soup/leafygreensalad.jpeg"
      },
      {
        id: 30,
        name: "French Onion Soup",
        price: "Rp55.000",
        description: "A comforting blend of caramelized onions, melted emmental cheese, and a slice of toasted sourdough bread. Hearty and satisfying.",
        image: "img/soup/frenchonionsoup.jpg"
      },
      {
        id: 31,
        name: "Mushroom Soup",
        price: "Rp59.000",
        description: "Rich flavor, lembut, dan dipenuhi dengan kebaikan jamur yang earthy. Favorit klasik yang terasa seperti pelukan dalam mangkuk.",
        image: "img/soup/mushroom soup.jpg"
      },
      {
        id: 32,
        name: "Pumpkin Soup",
        price: "Rp59.000",
        description: "Creamy pumpkin soup swirled with crème fraîche and topped with caramelized onion and feta cheese bruchetta.",
        image: "img/soup/pumpkin soup.jpg"
      },
      {
        id: 33,
        name: "Sweet Corn Brulee Soup",
        price: "Rp55.000",
        description: "Sup jagung manis panggang, jagung manis panggang, kue jagung kering, dan minyak hijau..",
        image: "img/soup/sweet corn brule soup.jpg"
      },
      {
        id: 34,
        name: "Croque Madame",
        price: "Rp68.000",
        description: "Creamy bechamel, egg, beef ham, emmental cheese, grana padano, and parsley (Crispy outside creamy inside).",
        image: "img/sandwich/croquemadame.jpg"
      },
      {
        id: 35,
        name: "Truffle Egg In Jar",
        price: "Rp49.000",
        description: "Telur, mash potato, cheese & mushroom yang di sajikan di dalam jar dengan sourdough (Savoury).",
        image: "img/brunch/truffleegginjar.jpeg"
      },
      {
        id: 36,
        name: "Beef Bacon Croquette",
        price: "Rp65.000",
        description: "Croquette stuffed with beef bacon and creamy parmesan.",
        image: "img/sidedish/beefbaconcroquette.jpg"
      },
      {
        id: 37,
        name: "L'Escargot",
        price: "Rp82.000",
        description: "Snails yang di panggang dengan garlic butter, mushroom, beef bacon & spinach (bayam).",
        image: "img/sidedish/leescargot.jpg"
      },
      {
        id: 38,
        name: "Gnocchi Chicken Musroom",
        price: "Rp99.000",
        description: "Gnocchi served with chicken and sautéed shiitake mushrooms in black pepper sauce).",
        image: "img/entree/gnochichickenmushroom.jpg"
      },
      {
        id: 39,
        name: "Sauteed Mushroom",
        price: "Rp39.000",
        description: "Campuran tiga jamur lokal yang ditumis ringan dengan butter dan rempah-rempah).",
        image: "img/entree/sautedmushroom.jpg"
      },
      {
        id: 40,
        name: "Truffle & Parmesan French Fries",
        price: "Rp65.000",
        description: "French fries, parmesan, truffle oil, and porcini salt.",
        image: "img/sidedish/truffleparmesanfrenchfries.jpg"
      },
      {
        id: 41,
        name: "Hand Cut French Fries",
        price: "Rp45.000",
        description: "Traditionally thin, hand cut, crispy fries....scrumptious!.",
        image: "img/sidedish/handcutfrenchfries.jpg"
      },
      {
        id: 42,
        name: "Mashed Potato",
        price: "Rp37.000",
        description: "Kentang yang dihaluskan dengan butter dan krim.",
        image: "img/sidedish/mashedpotato.jpg"
      },
      {
        id: 43,
        name: "Potato Gratin",
        price: "Rp37.000",
        description: "Kentang yang dihaluskan dengan butter, keju dan krim.",
        image: "img/sidedish/pottatogratin.jpg"
      },
    // Tambahkan data lainnya
  ];
  
  let cart = []; // Array untuk menyimpan item di keranjang
  
  // Fungsi untuk membuka modal
  function openModal(itemId) {
    const item = menuItems.find(menuItem => menuItem.id === itemId);
    if (!item) return;
  
    // Isi konten modal
    document.getElementById("modalImage").src = item.image;
    document.getElementById("modalTitle").innerText = item.name;
    document.getElementById("modalPrice").innerText = item.price;
    document.getElementById("modalDescription").innerText = item.description;
  
    // Tampilkan modal
    document.getElementById("itemModal").classList.remove("hidden");
  
    // Tambahkan event listener untuk tombol Add to Cart
    const addToCartBtn = document.getElementById("addToCartBtn");
    addToCartBtn.onclick = () => addToCart(item);
  }
  
  // Fungsi untuk menutup modal
  function closeModal() {
    document.getElementById("itemModal").classList.add("hidden");
  }
  
  // Fungsi untuk menambahkan item ke cart
  function addToCart(item) {
    cart.push(item);
    alert(`${item.name} telah ditambahkan ke keranjang.`);
    closeModal();
  }
  
  // Event listener untuk setiap menu item
  document.querySelectorAll(".menu-item").forEach((menuItem, index) => {
    menuItem.addEventListener("click", () => openModal(index + 1));
  });


  

// Fungsi untuk membuka modal
function openModal(itemId) {
    const item = menuItems.find(menuItem => menuItem.id === itemId);
    if (!item) return;
  
    // Isi konten modal
    document.getElementById("modalImage").src = item.image;
    document.getElementById("modalTitle").innerText = item.name;
    document.getElementById("modalPrice").innerText = item.price;
    document.getElementById("modalDescription").innerText = item.description;
  
    // Tampilkan modal
    document.getElementById("itemModal").classList.remove("hidden");
  
    // Tambahkan event listener untuk tombol Add to Cart
    const addToCartBtn = document.getElementById("addToCartBtn");
    addToCartBtn.onclick = () => addToCart(item);
  }
  
  
  // Fungsi untuk menutup modal
  function closeModal() {
    document.getElementById("itemModal").classList.add("hidden");
  }
  
 // Fungsi untuk menambahkan item ke cart
function addToCart(item) {
    // Cari item di keranjang berdasarkan id
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
  
    if (existingItem) {
      // Jika item sudah ada, tambahkan quantity
      existingItem.quantity += 1;
    } else {
      // Jika item belum ada, tambahkan item baru dengan quantity 1
      cart.push({ ...item, quantity: 1 });
    }
  
    updateCart();
    
    // Play sound effect
    const audio = new Audio('ting.mp3');
    audio.play();
    
    alert(`${item.name} telah ditambahkan ke keranjang.`);
    closeModal();
  }
  
  
  // Fungsi untuk memperbarui jumlah cart dan total harga
function updateCart() {
    const cartCount = document.getElementById("cartCount");
    const totalPrice = cart.reduce((sum, item) => {
      const price = parseInt(item.price.replace("Rp", "").replace(".", ""));
      return sum + price * item.quantity; // Hitung harga total berdasarkan quantity
    }, 0);
  
    // Perbarui jumlah di floating cart
    cartCount.innerText = cart.reduce((sum, item) => sum + item.quantity, 0);
  
    // Perbarui console log total harga (opsional, untuk debugging)
    console.log(`Total Harga: Rp${totalPrice.toLocaleString("id-ID")}`);
  }
  
  
  /* // Fungsi untuk menampilkan daftar pesanan di floating cart
  function showCart() {
    if (cart.length === 0) {
      alert("Keranjang kosong. Silakan tambahkan item ke keranjang!");
      return;
    }
  
    // Buat daftar pesanan
    let cartDetails = "Pesanan Anda:\n";
    let totalPrice = 0;
  
    cart.forEach((item, index) => {
      const price = parseInt(item.price.replace("Rp", "").replace(".", ""));
      totalPrice += price;
      cartDetails += `${index + 1}. ${item.name} - ${item.price}\n`;
    });
  
    cartDetails += `\nTotal Harga: Rp${totalPrice.toLocaleString("id-ID")}`;
    
    // Tampilkan daftar pesanan (bisa disesuaikan untuk ditampilkan di modal)
    alert(cartDetails);
  }
  
  // Event listener untuk setiap menu item
  document.querySelectorAll(".menu-item").forEach((menuItem, index) => {
    menuItem.addEventListener("click", () => openModal(index + 1));
  });
  
  // Tambahkan event klik ke floating cart untuk menampilkan daftar pesanan
  document.getElementById("floatingCart").addEventListener("click", showCart); */




// Fungsi untuk membuka modal keranjang
function showCart() {
    const cartModal = document.getElementById("cartModal");
    const cartItemsContainer = document.getElementById("cartItems");
  
    // Bersihkan kontainer keranjang sebelum menambahkan item
    cartItemsContainer.innerHTML = "";
  
    if (cart.length === 0) {
      cartItemsContainer.innerHTML = "<p>Keranjang kosong. Silakan tambahkan item ke keranjang!</p>";
    } else {
      // Tampilkan setiap item di keranjang
      cart.forEach((item, index) => {
        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");
  
        // Struktur HTML untuk item pesanan dan catatan
        cartItem.innerHTML = `
          <div class="cart-item-header">
            <p>${index + 1}. ${item.name} - ${item.price}</p>
            <div class="quantity-control">
              <button class="decrease-btn" id="decrease-${item.id}">-</button>
              <span id="quantity-${item.id}">${item.quantity}</span>
              <button class="increase-btn" id="increase-${item.id}">+</button>
            </div>
          </div>
          <div class="cart-item-note">
            <p id="note-text-${item.id}" class="note-text">${item.note || "Your Special Request"}</p>
            <textarea id="note-${item.id}" class="item-note hidden" placeholder="Tambahkan catatan...">${item.note || ""}</textarea>
            <span class="edit-note-btn" id="edit-note-${item.id}" title="Edit Catatan">&#9998;</span>
          </div>
        `;
  
        // Event listener untuk tombol decrease
        const decreaseBtn = cartItem.querySelector(`#decrease-${item.id}`);
        decreaseBtn.addEventListener("click", () => {
          if (item.quantity > 1) {
            item.quantity -= 1;
            document.getElementById(`quantity-${item.id}`).innerText = item.quantity;
            updateCart();
          } else {
            alert("Jumlah tidak boleh kurang dari 1.");
          }
        });
  
        // Event listener untuk tombol increase
        const increaseBtn = cartItem.querySelector(`#increase-${item.id}`);
        increaseBtn.addEventListener("click", () => {
          item.quantity += 1;
          document.getElementById(`quantity-${item.id}`).innerText = item.quantity;
          updateCart();
        });
  
        // Event listener untuk ikon edit
        const editNoteBtn = cartItem.querySelector(`#edit-note-${item.id}`);
        editNoteBtn.addEventListener("click", () => {
          toggleNoteInput(item.id);
        });
  
        // Simpan perubahan catatan saat pengguna mengetik
        const noteField = cartItem.querySelector(`#note-${item.id}`);
        noteField.addEventListener("blur", (e) => {
          const newNote = e.target.value.trim();
          item.note = newNote || "Your Special Request"; // Simpan catatan di objek item
          document.getElementById(`note-text-${item.id}`).innerText = item.note;
          toggleNoteInput(item.id); // Kembali menampilkan teks catatan
        });
  
        cartItemsContainer.appendChild(cartItem);
      });
    }
  
    // Tampilkan modal keranjang
    cartModal.classList.remove("hidden");
    cartModal.style.display = "block";
  }
  
  // Fungsi untuk toggle antara textbox dan teks catatan
  function toggleNoteInput(itemId) {
    const noteText = document.getElementById(`note-text-${itemId}`);
    const noteInput = document.getElementById(`note-${itemId}`);
    noteText.classList.toggle("hidden");
    noteInput.classList.toggle("hidden");
  
    // Jika membuka textbox, fokuskan ke input
    if (!noteInput.classList.contains("hidden")) {
      noteInput.focus();
    }
  }
  
  
  

  
  
  // Fungsi untuk menutup modal keranjang
  function closeCartModal() {
    const cartModal = document.getElementById("cartModal");
    cartModal.style.display = "none";
  }
  
// Fungsi untuk menangani checkout
function checkout() {
  if (cart.length === 0) {
      alert("Keranjang kosong, tidak bisa checkout.");
      return;
  }

  let orderMessage = "Request Order:\n";

  // Loop melalui setiap item di keranjang dan menyiapkan pesan
  cart.forEach((item, index) => {
      let orderItem = `${index + 1}) ${item.name}`;
      
      // Menambahkan catatan jika ada
      if (item.note && item.note !== "Your Special Request") {
          orderItem += ` (${item.note})`;
      }
      
      orderMessage += orderItem + "\n";
  });

  // Menghitung total harga dengan mengakses harga dari menuItems
  let totalPrice = 0;
  cart.forEach((item) => {
      const menuItem = menuItems.find(menu => menu.id === item.id); // Mencari item berdasarkan ID
      if (menuItem) {
          // Menghapus simbol Rp dan mengonversi harga ke angka
          const itemPrice = parseFloat(menuItem.price.replace("Rp", "").replace(".", "").trim());
          totalPrice += itemPrice * item.quantity; // Menghitung total harga
      }
  });

  // Menambahkan total harga ke dalam pesan (sebelum pajak & layanan)
  orderMessage += `\nTotal harga: Rp${totalPrice.toLocaleString()} (before tax & service)`;

  // Mengarahkan ke WhatsApp dengan pesan pesanan yang sudah diformat
  const whatsappLink = `https://wa.me/6285172352402/?text=${encodeURIComponent(orderMessage)}`;
  window.open(whatsappLink, "_blank");

  // Mengosongkan keranjang setelah checkout
  cart = []; // Mengosongkan keranjang
  updateCart();
  closeCartModal();
}
  
  // Event listener untuk tombol floating cart
  document.getElementById("floatingCart").addEventListener("click", showCart);
  
