// Replace your existing script.js with this file.
// Adds: MORE PRODUCTS + MOST POPULAR tabs + NEW ARRIVALS tabs + safe checks + same scroller behavior

document.addEventListener("DOMContentLoaded", () => {
  // --- MOBILE MENU TOGGLE (defensive checks) ---
  const hamburger = document.getElementById("hamburger");
  const mainNav = document.getElementById("mainNav");

  if (hamburger && mainNav) {
    hamburger.addEventListener("click", () => {
      mainNav.classList.toggle("active");
    });

    // Close mobile menu when clicking outside
    document.addEventListener("click", (e) => {
      if (!hamburger.contains(e.target) && !mainNav.contains(e.target)) {
        mainNav.classList.remove("active");
      }
    });

    // Close mobile menu when window is resized above mobile breakpoint
    window.addEventListener("resize", () => {
      if (window.innerWidth > 768) {
        mainNav.classList.remove("active");
      }
    });
  }

  // --- PRODUCTS DATA (added more items + `category` for tab filtering) ---
  const products = [
    { brand: "Ray-Ban", name: "Classic Aviator", imageUrl: "./assets/glass1.png", colors: ["#000000", "#8B4513"], originalPrice: 150, price: 120, category: "glasses" },
    { brand: "Oakley", name: "Sport Sunglasses", imageUrl: "./assets/glass2.png", colors: ["#FF0000", "#0000FF"], originalPrice: 200, price: 160, category: "sunglasses" },
    { brand: "Gucci", name: "Premium Square", imageUrl: "./assets/glass3.png", colors: ["#333333", "#FFD700"], originalPrice: 300, price: 250, category: "glasses" },
    { brand: "Prada", name: "Modern Cat-Eye", imageUrl: "./assets/glass4.png", colors: ["#FF69B4", "#800080"], originalPrice: 220, price: 180, category: "sunglasses" },
    { brand: "Versace", name: "Luxury Frames", imageUrl: "./assets/glass1.png", colors: ["#FFFFFF", "#000000"], originalPrice: 350, price: 300, category: "glasses" },
    { brand: "Prada", name: "Modern Cat-Eye (Limited)", imageUrl: "./assets/glass4.png", colors: ["#FF69B4", "#800080"], originalPrice: 220, price: 180, category: "sunglasses" },

    // More items
    { brand: "Persol", name: "Heritage Oval", imageUrl: "./assets/glass2.png", colors: ["#6B7280", "#D1D5DB"], originalPrice: 180, price: 140, category: "glasses" },
    { brand: "Tom Ford", name: "Bold Square", imageUrl: "./assets/glass3.png", colors: ["#1F2937", "#A78BFA"], originalPrice: 320, price: 280, category: "glasses" },
    { brand: "Maui Jim", name: "Coastal Sunglasses", imageUrl: "./assets/glass1.png", colors: ["#0EA5A4", "#60A5FA"], originalPrice: 210, price: 175, category: "sunglasses" },
    { brand: "Burberry", name: "Signature Round", imageUrl: "./assets/glass4.png", colors: ["#111827", "#FCA5A5"], originalPrice: 260, price: 215, category: "glasses" },
    { brand: "Carrera", name: "Racer Sunglass", imageUrl: "./assets/glass2.png", colors: ["#111827", "#FDE68A"], originalPrice: 190, price: 155, category: "sunglasses" },
    { brand: "Dolce & Gabbana", name: "Iconic Pilot", imageUrl: "./assets/glass3.png", colors: ["#000000", "#F97316"], originalPrice: 400, price: 350, category: "sunglasses" }
  ];

  // --- TESTIMONIALS / BLOG (unchanged) ---
  const testimonials = [
    { id: 1, avatarUrl: "https://randomuser.me/api/portraits/men/32.jpg", name: "Aatif Nayeem", date: "2 days ago", rating: 5, text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation." },
    { id: 2, avatarUrl: "https://randomuser.me/api/portraits/women/44.jpg", name: "Jane Doe", date: "1 week ago", rating: 5, text: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." },
    { id: 3, avatarUrl: "https://randomuser.me/api/portraits/men/3.jpg", name: "John Smith", date: "3 days ago", rating: 5, text: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto." },
    { id: 4, avatarUrl: "https://randomuser.me/api/portraits/women/65.jpg", name: "Emily White", date: "5 days ago", rating: 5, text: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt." }
  ];

  const blogPosts = [
    { imageUrl: "/assets/blog1.jpg", date: "14 Jan 2025", title: "Finding the Perfect Pair of Glasses: Budget-Friendly Prescription Choices." },
    { imageUrl: "/assets/blog2.jpg", date: "14 Jan 2025", title: "The Ultimate Guide to Choosing Sunglasses for Your Face Shape." },
    { imageUrl: "/assets/blog3.jpg", date: "14 Jan 2025", title: "How Blue Light Glasses Can Improve Your Sleep and Reduce Eye Strain." },
    { imageUrl: "/assets/blog1.jpg", date: "12 Jan 2025", title: "Caring for Your Eyewear: Tips to Make Your Glasses Last Longer." },
    { imageUrl: "/assets/blog3.jpg", date: "12 Jan 2025", title: "Caring for Your Eyewear: Tips to Make Your Glasses Last Longer." },
    { imageUrl: "/assets/blog2.jpg", date: "12 Jan 2025", title: "Caring for Your Eyewear: Tips to Make Your Glasses Last Longer." }
  ];

  // --- TEMPLATES ---
  function createProductCard(product) {
    const colorsHtml = (product.colors || []).map((color) => `<span class="color-swatch" style="background-color: ${color}"></span>`).join("");
    const originalHtml = product.originalPrice && product.originalPrice > product.price ? `<p class="original-price">£${product.originalPrice}</p>` : "";
    return `
      <div class="product-card-wrapper" >
        <div class="product-card">
          <button class="wishlist-btn" aria-label="Add to wishlist">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 016.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z" /></svg>
          </button>
          <div class="product-image-container">
            <img src="${product.imageUrl}" alt="${escapeHtml(product.name)}" />
          </div>
          <div class="add-to-cart-overlay">
            <button class="btn btn-primary">ADD TO CART</button>
          </div>
          <p class="brand">${escapeHtml(product.brand)}</p>
          <h3 class="name">${escapeHtml(product.name)}</h3>
          <div class="colors">${colorsHtml}</div>
          <div class="price-container">
            ${originalHtml}
            <p class="current-price">£${product.price}</p>
          </div>
        </div>
      </div>
    `;
  }

  function createTestimonialCard(testimonial) {
    const starsHtml = Array(testimonial.rating).fill(0).map(() => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 14.25l-4.243 2.23.81-4.724L3.43 8.25l4.743-.69L10 3l2.827 4.56L17.57 8.25l-3.136 3.506.81 4.724L10 14.25z" clip-rule="evenodd" /></svg>`).join("");
    return `
      <div class="testimonial-card-wrapper">
        <div class="testimonial-card">
          <div class="testimonial-card-header">
            <img src="${testimonial.avatarUrl}" alt="${escapeHtml(testimonial.name)}" />
            <div>
              <h4>${escapeHtml(testimonial.name)}</h4>
              <p>${escapeHtml(testimonial.date)}</p>
            </div>
          </div>
          <div class="testimonial-card-rating">${starsHtml}</div>
          <p class="testimonial-card-text">${escapeHtml(testimonial.text)}</p>
          <a href="#" class="testimonial-card-readmore">Read more</a>
        </div>
      </div>
    `;
  }

  function createBlogPostCard(post) {
    return `
      <div class="blog-card-wrapper">
        <div class="blog-card">
          <img src="${post.imageUrl}" alt="${escapeHtml(post.title)}" />
          <div class="blog-card-content">
            <p class="date">${escapeHtml(post.date)}</p>
            <h3 class="title">${escapeHtml(post.title)}</h3>
            <a href="#" class="readmore">Read more</a>
          </div>
        </div>
      </div>
    `;
  }

  // simple HTML escape helper for safety
  function escapeHtml(str = "") {
    return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
  }

  // --- INJECT STATIC SECTIONS (testimonials / blog) ---
  const testimonialsContainer = document.querySelector("#testimonials .scroll-container");
  if (testimonialsContainer) {
    testimonialsContainer.innerHTML = testimonials.map(createTestimonialCard).join("");
  }

  const blogContainer = document.querySelector("#blog-section .scroll-container");
  if (blogContainer) {
    blogContainer.innerHTML = blogPosts.map(createBlogPostCard).join("");
  }

  // --- MOST POPULAR: TAB LOGIC + RENDERING ---
// --- MOST POPULAR: TAB LOGIC + RENDERING ---
const glassesContainer = document.querySelector("#product-card-glasses");
const sunglassesContainer = document.querySelector("#product-card-sunglasses");
const mostPopularTabs = document.querySelector("#most-popular .tabs");

// Render function
function renderMostPopular() {
  if (!glassesContainer || !sunglassesContainer) return;

  const glasses = products.filter((p) => p.category === "glasses");
  const sunglasses = products.filter((p) => p.category === "sunglasses");

  // Always render both
  glassesContainer.innerHTML = glasses.map(createProductCard).join("");
  sunglassesContainer.innerHTML = sunglasses.map(createProductCard).join("");

  // Mobile: hide tab bar, show both sections stacked
  if (window.innerWidth <= 768) {
    mostPopularTabs.style.display = "none";
    document.getElementById("glasses-section").style.display = "block";
    document.getElementById("sunglasses-section").style.display = "block";
    document.getElementById("shop-for").style.display = "block";
  } else {
    // Desktop: show tab bar, only one section at a time
    mostPopularTabs.style.display = "flex";
    document.getElementById("shop-for").style.display = "none";
    const activeTab = document.querySelector("#most-popular .tabs .tab-btn.active");
    const category = activeTab ? activeTab.dataset.category : "glasses";
    toggleDesktopView(category);
  }
}

function toggleDesktopView(category) {
  if (category === "glasses") {
    document.getElementById("glasses-section").style.display = "block";
    document.getElementById("sunglasses-section").style.display = "none";
  } else {
    document.getElementById("glasses-section").style.display = "none";
    document.getElementById("sunglasses-section").style.display = "block";
  }
}

// Tab click (desktop)
document.querySelectorAll("#most-popular .tabs .tab-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll("#most-popular .tabs .tab-btn").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    toggleDesktopView(btn.dataset.category);
  });
});

// Init + resize
renderMostPopular();
window.addEventListener("resize", renderMostPopular);



  const initialMostActive = document.querySelector("#most-popular .tabs .tab-btn.active");
  const initialMostCategory = initialMostActive ? (initialMostActive.getAttribute("data-category") || initialMostActive.textContent).trim().toLowerCase() : "glasses";
  renderMostPopular(initialMostCategory);

  // --- NEW ARRIVALS: SAME TAB LOGIC + RENDERING ---
  const newArrivalsContainer = document.querySelector("#new-arrivals .scroll-container");
  const newArrivalsTabButtons = document.querySelectorAll("#new-arrivals .tabs .tab-btn");

  function renderNewArrivals(category = "glasses") {
    if (!newArrivalsContainer) return;
    // For new arrivals we might want the newest items first (keep same order as products array but show filtered)
    const filtered = products.filter((p) => p.category === category);
    if (!filtered.length) {
      newArrivalsContainer.innerHTML = `<div class="no-products">No products found for "${escapeHtml(category)}".</div>`;
      return;
    }
    // if you want newest-first behavior, reverse filtered copy:
    const newestFirst = [...filtered].reverse();
    newArrivalsContainer.innerHTML = newestFirst.map(createProductCard).join("");
  }

  if (newArrivalsTabButtons && newArrivalsTabButtons.length) {
    newArrivalsTabButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        newArrivalsTabButtons.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        const dataCat = btn.getAttribute("data-category");
        const cat = (dataCat || btn.textContent || "").trim().toLowerCase();
        renderNewArrivals(cat || "glasses");
      });
    });
  }

  const initialNewActive = document.querySelector("#new-arrivals .tabs .tab-btn.active");
  const initialNewCategory = initialNewActive ? (initialNewActive.getAttribute("data-category") || initialNewActive.textContent).trim().toLowerCase() : "glasses";
  renderNewArrivals(initialNewCategory);

  // --- HERO SLIDER (unchanged) ---
  const heroSection = document.getElementById("hero-section");
  if (heroSection) {
    const slides = heroSection.querySelectorAll(".hero-slide");
    const prevBtn = heroSection.querySelector(".hero-prev");
    const nextBtn = heroSection.querySelector(".hero-next");
    let currentIndex = 0;
    let intervalId;

    function showSlide(index) {
      slides.forEach((slide, i) => {
        slide.classList.toggle("active", i === index);
      });
      currentIndex = index;
    }

    function nextSlide() {
      showSlide((currentIndex + 1) % slides.length);
    }

    function prevSlide() {
      showSlide((currentIndex - 1 + slides.length) % slides.length);
    }

    function startSlider() {
      intervalId = setInterval(nextSlide, 5000);
    }

    function resetSlider() {
      clearInterval(intervalId);
      startSlider();
    }

    if (slides.length > 0 && prevBtn && nextBtn) {
      prevBtn.addEventListener("click", () => {
        prevSlide();
        resetSlider();
      });
      nextBtn.addEventListener("click", () => {
        nextSlide();
        resetSlider();
      });

      showSlide(0);
      startSlider();
    }
  }

  // --- GENERIC HORIZONTAL SCROLLER ---
  function setupScroller(containerSelector) {
    const container = document.querySelector(containerSelector);
    if (!container) return;

    const scrollContainer = container.querySelector(".scroll-container");
    const prevBtn = container.querySelector(".scroll-prev");
    const nextBtn = container.querySelector(".scroll-next");

    if (!scrollContainer || !prevBtn || !nextBtn) return;

    const scroll = (direction) => {
      const scrollAmount = Math.floor(scrollContainer.clientWidth * 0.8);
      if (direction === "left") {
        scrollContainer.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      } else {
        scrollContainer.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    };

    prevBtn.addEventListener("click", () => scroll("left"));
    nextBtn.addEventListener("click", () => scroll("right"));
  }

  // set up scrollers for the sections
  setupScroller("#most-popular");
  setupScroller("#new-arrivals");
  setupScroller("#testimonials");
  setupScroller("#blog-section");

  // Optional: keyboard accessibility for tabs (left/right to change) for both sections
  (function enableTabKeyboardNav() {
    const sections = ["#most-popular", "#new-arrivals"];
    sections.forEach((sel) => {
      const tabsWrap = document.querySelector(`${sel} .tabs`);
      if (!tabsWrap) return;
      tabsWrap.addEventListener("keydown", (e) => {
        const key = e.key;
        if (key !== "ArrowLeft" && key !== "ArrowRight") return;
        e.preventDefault();
        const buttons = Array.from(tabsWrap.querySelectorAll(".tab-btn"));
        const index = buttons.findIndex((b) => b.classList.contains("active"));
        if (index === -1) return;
        let nextIndex = index;
        if (key === "ArrowLeft") nextIndex = (index - 1 + buttons.length) % buttons.length;
        if (key === "ArrowRight") nextIndex = (index + 1) % buttons.length;
        buttons[nextIndex].click();
        buttons[nextIndex].focus();
      });
    });
  })();
});

const slides = document.querySelectorAll('.hero-slide');
const dots = document.querySelectorAll('.hero-indicators .dot');
let currentIndex = 0;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === index);
    dots[i].classList.toggle('active', i === index);
  });
}

dots.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    currentIndex = i;
    showSlide(currentIndex);
  });
});

// initialize
showSlide(currentIndex);

