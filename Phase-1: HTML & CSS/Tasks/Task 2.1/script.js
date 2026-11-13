// Toggle mobile menu
document.addEventListener('DOMContentLoaded', function () {
  const toggleButton = document.querySelector('.navbar .mobile-menu-toggle');
  const mobileMenu = document.querySelector('.navbar .mobile-menu-items');

  toggleButton.addEventListener('click', function () {
    mobileMenu.classList.toggle('active');
  });
});

// Change navbar background on scroll
window.addEventListener('scroll', function () {
  const navbar = document.querySelector('.navbar');

  if (window.scrollY > 0) {
    navbar.classList.add('navbar-scroll');
  } else {
    navbar.classList.remove('navbar-scroll');
  }
});

// Close Booking Offer Notification
const offerToast = document.querySelector('#offerToast');
const offerClose = document.querySelector('.offer-close');

if (offerToast && offerClose) {
  offerClose.addEventListener('click', function () {
    offerToast.remove();
  });
}

//Frequently QnA toggle
document.addEventListener("DOMContentLoaded", function () {

  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");

    if (!question || !answer) return;

    // Set initial state
    const isInitiallyOpen = item.classList.contains("active");

    answer.hidden = !isInitiallyOpen;
    question.setAttribute(
      "aria-expanded",
      String(isInitiallyOpen)
    );

    // Toggle on click
    question.addEventListener("click", function () {
      const isOpen = item.classList.contains("active");

      // Close all FAQ items
      faqItems.forEach((faq) => {
        faq.classList.remove("active");

        const faqQuestion = faq.querySelector(".faq-question");
        const faqAnswer = faq.querySelector(".faq-answer");

        faqQuestion.setAttribute("aria-expanded", "false");
        faqAnswer.hidden = true;
      });

      // Open selected FAQ if it was closed
      if (!isOpen) {
        item.classList.add("active");
        answer.hidden = false;
        question.setAttribute("aria-expanded", "true");
      }
    });
  });

});

