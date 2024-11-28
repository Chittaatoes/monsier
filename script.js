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
  
  // Fungsi untuk menandai tab aktif
  function setActiveTabByCategory(categoryId) {
    tabs.forEach(tab => tab.classList.remove("active")); // Reset semua tab
    const activeTab = document.querySelector(`[onclick="scrollToCategory('${categoryId}')"]`);
    if (activeTab) activeTab.classList.add("active"); // Tandai tab sesuai kategori
  }

  // Intersection Observer untuk memantau kategori
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setActiveTabByCategory(entry.target.id); // Aktifkan tab sesuai ID kategori
      }
    });
  }, {
    root: null, // Default viewport
    threshold: 0.5 // Kategori dianggap terlihat jika 50% masuk viewport
  });

  // Observasi setiap kategori
  categories.forEach(category => observer.observe(category));

  // Set tab aktif default ke "Promo & Package"
  setActiveTabByCategory("promo");
});


// Menghitung tinggi header untuk memastikan kategori tidak tertutup
function scrollToCategory(categoryId) {
  const categoryElement = document.getElementById(categoryId);
  const headerHeight = document.querySelector('.container-header').offsetHeight; // Ambil tinggi header
  
  // Hitung posisi scroll dengan mempertimbangkan tinggi header
  const scrollPosition = categoryElement.offsetTop - headerHeight;

  // Smooth scroll ke posisi yang telah disesuaikan
  window.scrollTo({
    top: scrollPosition,
    behavior: 'smooth',
  });

  // Tambahkan efek interaktif pada tab
  setActiveTab(categoryId);
}

// Menandai tab aktif
function setActiveTab(categoryId) {
  // Hapus kelas aktif pada semua tab
  document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));

  // Tambahkan kelas aktif pada tab yang sesuai
  const activeTab = document.querySelector(`[onclick="scrollToCategory('${categoryId}')"]`);
  if (activeTab) activeTab.classList.add('active');
}

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
  
  // Fungsi untuk checkout (opsional)
  function checkout() {
    if (cart.length === 0) {
      alert("Keranjang kosong, tidak bisa checkout.");
      return;
    }
    alert("Checkout berhasil! Terima kasih atas pesanan Anda.");
    cart = []; // Kosongkan keranjang setelah checkout
    updateCart();
    closeCartModal();
  }
  
  // Event listener untuk tombol floating cart
  document.getElementById("floatingCart").addEventListener("click", showCart);
  