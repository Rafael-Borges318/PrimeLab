const portfolioTrack = document.getElementById("portfolioTrack");
const portfolioCards = document.querySelectorAll(".portfolio-card");
const prevBtn = document.getElementById("portfolioPrev");
const nextBtn = document.getElementById("portfolioNext");
const dotsContainer = document.getElementById("portfolioDots");

let currentSlide = 0;
let autoPlay;

function createDots() {
  if (!dotsContainer) return;

  portfolioCards.forEach((_, index) => {
    const dot = document.createElement("button");
    if (index === 0) dot.classList.add("active");

    dot.addEventListener("click", () => {
      goToSlide(index);
      resetAutoplay();
    });

    dotsContainer.appendChild(dot);
  });
}

function updateDots() {
  if (!dotsContainer) return;

  const dots = dotsContainer.querySelectorAll("button");
  dots.forEach((dot, index) => {
    dot.classList.toggle("active", index === currentSlide);
  });
}

function goToSlide(index) {
  if (!portfolioTrack) return;

  currentSlide = index;

  portfolioTrack.scrollTo({
    left: portfolioTrack.clientWidth * currentSlide,
    behavior: "smooth",
  });

  updateDots();
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % portfolioCards.length;
  goToSlide(currentSlide);
}

function prevSlide() {
  currentSlide =
    (currentSlide - 1 + portfolioCards.length) % portfolioCards.length;
  goToSlide(currentSlide);
}

function startAutoplay() {
  if (!portfolioCards.length) return;
  autoPlay = setInterval(nextSlide, 4000);
}

function resetAutoplay() {
  clearInterval(autoPlay);
  startAutoplay();
}

if (nextBtn) {
  nextBtn.addEventListener("click", () => {
    nextSlide();
    resetAutoplay();
  });
}

if (prevBtn) {
  prevBtn.addEventListener("click", () => {
    prevSlide();
    resetAutoplay();
  });
}

window.addEventListener("resize", () => {
  goToSlide(currentSlide);
});

function smoothScrollTo(targetY, duration = 1200) {
  const startY = window.pageYOffset;
  const distance = targetY - startY;
  let startTime = null;

  function easeInOutQuad(t) {
    return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
  }

  function animation(currentTime) {
    if (!startTime) startTime = currentTime;

    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);
    const ease = easeInOutQuad(progress);

    window.scrollTo(0, startY + distance * ease);

    if (timeElapsed < duration) {
      requestAnimationFrame(animation);
    }
  }

  requestAnimationFrame(animation);
}

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", function (e) {
    const targetId = this.getAttribute("href");

    if (!targetId || targetId === "#") return;

    const target = document.querySelector(targetId);
    if (!target) return;

    e.preventDefault();

    const header = document.querySelector(".topbar");
    const headerHeight = header ? header.offsetHeight : 0;

    const targetPosition =
      target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

    smoothScrollTo(targetPosition, 1400);
  });
});

createDots();
startAutoplay();
