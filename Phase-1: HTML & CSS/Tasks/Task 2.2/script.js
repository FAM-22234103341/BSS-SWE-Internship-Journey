
document.addEventListener("DOMContentLoaded", () => {

  // Mobile Menu
  const menuToggle = document.querySelector(".mobile-menu-toggle");
  const mobileMenu = document.querySelector(".mobile-menu-items");
  const mobileLinks = document.querySelectorAll(".mobile-menu-list a");

  if (menuToggle && mobileMenu) {
    const menuIcon = menuToggle.querySelector("i");

    function closeMenu() {
      mobileMenu.classList.remove("active");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open mobile menu");

      if (menuIcon) {
        menuIcon.classList.remove("fa-xmark");
        menuIcon.classList.add("fa-bars");
      }
    }

    function openMenu() {
      mobileMenu.classList.add("active");
      menuToggle.setAttribute("aria-expanded", "true");
      menuToggle.setAttribute("aria-label", "Close mobile menu");

      if (menuIcon) {
        menuIcon.classList.remove("fa-bars");
        menuIcon.classList.add("fa-xmark");
      }
    }

    menuToggle.addEventListener("click", () => {
      if (mobileMenu.classList.contains("active")) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    mobileLinks.forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("click", (event) => {
      if (
        !mobileMenu.contains(event.target) &&
        !menuToggle.contains(event.target)
      ) {
        closeMenu();
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 768) {
        closeMenu();
      }
    });
  }


  // About Tabs
  const tabButtons = document.querySelectorAll(".tab-btn");
  const tabContents = document.querySelectorAll(".tab-content");

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {

      tabButtons.forEach((btn) => {
        btn.classList.remove("active");
        btn.setAttribute("aria-selected", "false");
      });

      tabContents.forEach((content) => {
        content.classList.remove("active");
        content.hidden = true;
      });

      button.classList.add("active");
      button.setAttribute("aria-selected", "true");

      const targetId = button.getAttribute("aria-controls");
      const targetContent = document.getElementById(targetId);

      if (targetContent) {
        targetContent.hidden = false;
        targetContent.classList.add("active");
      }
    });
  });


  // Food Carousel
  const foodTrack = document.querySelector(".food-track");
  const foodPrev = document.querySelector(".food-btn.food-prev");
  const foodNext = document.querySelector(".food-btn.food-next");
  const foodSlider = document.querySelector(".food-slider");

  if (foodTrack && foodPrev && foodNext && foodSlider) {

    const originalCards = Array.from(
      foodTrack.querySelectorAll(".food-card")
    );

    if (!originalCards.length) return;

    let currentIndex = 0;
    let cardsPerView = 4;
    let autoPlay;
    let isAnimating = false;
    const autoPlayDelay = 3000;

    function getCardsPerView() {
      if (window.innerWidth <= 768) return 1;
      if (window.innerWidth <= 1024) return 2;
      return 4;
    }

    function getCardStep() {
      const card = foodTrack.querySelector(".food-card");

      if (!card) return 0;

      const gap = parseFloat(
        getComputedStyle(foodTrack).gap
      ) || 0;

      return card.getBoundingClientRect().width + gap;
    }

    function moveSlider(animate = true) {
      foodTrack.style.transition = animate
        ? "transform 0.4s ease"
        : "none";

      const moveAmount = getCardStep() * currentIndex;

      foodTrack.style.transform =
        `translateX(-${moveAmount}px)`;
    }

    function setupSlider() {
      foodTrack.style.transition = "none";
      foodTrack.innerHTML = "";

      cardsPerView = getCardsPerView();

      const beforeClones = originalCards
        .slice(-cardsPerView)
        .map(card => card.cloneNode(true));

      const afterClones = originalCards
        .slice(0, cardsPerView)
        .map(card => card.cloneNode(true));

      beforeClones.forEach((card) => {
        card.setAttribute("aria-hidden", "true");
        foodTrack.appendChild(card);
      });

      originalCards.forEach((card) => {
        foodTrack.appendChild(card);
      });

      afterClones.forEach((card) => {
        card.setAttribute("aria-hidden", "true");
        foodTrack.appendChild(card);
      });

      currentIndex = cardsPerView;
      isAnimating = false;

      moveSlider(false);
    }

    function nextSlide() {
      if (isAnimating) return;

      isAnimating = true;
      currentIndex++;
      moveSlider(true);
    }

    function prevSlide() {
      if (isAnimating) return;

      isAnimating = true;
      currentIndex--;
      moveSlider(true);
    }

    foodTrack.addEventListener("transitionend", (event) => {
      if (event.target !== foodTrack ||
          event.propertyName !== "transform") {
        return;
      }

      if (currentIndex >= originalCards.length + cardsPerView) {
        currentIndex = cardsPerView;
        moveSlider(false);
      }

      if (currentIndex < cardsPerView) {
        currentIndex = originalCards.length + currentIndex;
        moveSlider(false);
      }

      isAnimating = false;
    });

    function startAutoPlay() {
      stopAutoPlay();

      if (document.hidden) return;

      autoPlay = setInterval(() => {
        nextSlide();
      }, autoPlayDelay);
    }

    function stopAutoPlay() {
      clearInterval(autoPlay);
    }

    foodNext.addEventListener("click", () => {
      nextSlide();
      startAutoPlay();
    });

    foodPrev.addEventListener("click", () => {
      prevSlide();
      startAutoPlay();
    });

    foodSlider.addEventListener("mouseenter", stopAutoPlay);
    foodSlider.addEventListener("mouseleave", startAutoPlay);

    foodSlider.addEventListener("focusin", stopAutoPlay);
    foodSlider.addEventListener("focusout", (event) => {
      if (!foodSlider.contains(event.relatedTarget)) {
        startAutoPlay();
      }
    });

    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        stopAutoPlay();
      } else {
        startAutoPlay();
      }
    });

    let previousCardsPerView = getCardsPerView();

    window.addEventListener("resize", () => {
      const newCardsPerView = getCardsPerView();

      if (newCardsPerView !== previousCardsPerView) {
        previousCardsPerView = newCardsPerView;
        setupSlider();
      } else {
        moveSlider(false);
      }
    });

    setupSlider();
    startAutoPlay();
  }

});


document.addEventListener("DOMContentLoaded", () => {

  const customerTrack = document.querySelector(".customer-track");
  const customerPrev = document.querySelector(".customer-prev");
  const customerNext = document.querySelector(".customer-next");

  if (customerTrack && customerPrev && customerNext) {

    const customerSlides = customerTrack.querySelectorAll(".customer-slide");

    let currentCustomer = 0;

    function updateCustomerSlider() {
      const slideWidth = customerTrack.parentElement.clientWidth;

      customerTrack.style.transform =
        `translateX(-${currentCustomer * slideWidth}px)`;
    }

    customerNext.addEventListener("click", () => {
      currentCustomer =
        (currentCustomer + 1) % customerSlides.length;

      updateCustomerSlider();
    });

    customerPrev.addEventListener("click", () => {
      currentCustomer =
        (currentCustomer - 1 + customerSlides.length)
        % customerSlides.length;

      updateCustomerSlider();
    });

    window.addEventListener("resize", updateCustomerSlider);

    updateCustomerSlider();
  }

});


// Customer Review Slider

document.addEventListener("DOMContentLoaded", () => {

  const customerTrack = document.querySelector(".customer-track");
  const customerPrev = document.querySelector(".customer-prev");
  const customerNext = document.querySelector(".customer-next");

  if (customerTrack && customerPrev && customerNext) {

    const customerSlides = customerTrack.querySelectorAll(".customer-slide");

    let currentCustomer = 0;

    function updateCustomerSlider() {
      const slideWidth = customerTrack.parentElement.clientWidth;

      customerTrack.style.transform =
        `translateX(-${currentCustomer * slideWidth}px)`;
    }

    customerNext.addEventListener("click", () => {
      currentCustomer =
        (currentCustomer + 1) % customerSlides.length;

      updateCustomerSlider();
    });

    customerPrev.addEventListener("click", () => {
      currentCustomer =
        (currentCustomer - 1 + customerSlides.length)
        % customerSlides.length;

      updateCustomerSlider();
    });

    window.addEventListener("resize", updateCustomerSlider);

    updateCustomerSlider();
  }

  // Restaurant Video
  const customerPlayBtn = document.querySelector(".customer-play-btn");

  if (customerPlayBtn) {
    customerPlayBtn.addEventListener("click", () => {
      alert("Restaurant video is not available yet.");
    });
  }

});
