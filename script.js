// Animate chat messages
document.addEventListener("DOMContentLoaded", () => {
  const messages = document.querySelectorAll(".chat-message");
  messages.forEach((msg, index) => {
    msg.style.animationDelay = `${index * 0.5 + 1}s`;
  });

  // Smooth scroll for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // Intersection Observer for fade-in animations
  const observerOptions = {
    threshold: 0.2,
    rootMargin: "0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  // Observe feature cards and room cards
  document.querySelectorAll(".feature-card, .room-card").forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = "all 0.6s ease-out";
    observer.observe(el);
  });

  // Donation buttons interaction
  const donationBtns = document.querySelectorAll(".donation-btn");
  donationBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      donationBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      if (btn.classList.contains("custom")) {
        const amount = prompt("Enter custom amount:", "50");
        if (amount) {
          btn.textContent = `$${amount}`;
        }
      }
    });
  });

  // Floating animation for hero image
  const heroImage = document.querySelector(".hero-image");
  let floatY = 0;
  let floatDirection = 1;

  function updateFloat() {
    floatY += 0.5 * floatDirection;
    if (Math.abs(floatY) > 20) {
      floatDirection *= -1;
    }
    heroImage.style.transform = `translateY(${floatY}px)`;
    requestAnimationFrame(updateFloat);
  }

  updateFloat();
});
