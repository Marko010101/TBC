"use strict";

// Slider

const slider = function () {
  const slides = document.querySelectorAll(".slider-list-item");
  const btnLeft = document.querySelector(".partners-btn-prev");
  const btnRight = document.querySelector(".partners-btn-next");
  const dotContainer = document.querySelector(".dots");

  let curSlide = 0;
  const maxSlide = slides.length;

  let interval;

  // Functions
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        "beforeend",
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll(".dots__dot")
      .forEach((dot) => dot.classList.remove("dots__dot--active"));
    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add("dots__dot--active");
  };

  const goToSlide = function (slide) {
    slides.forEach((s, i) => {
      if (i === slide) {
        s.classList.add("displayed");
        s.classList.remove("notDisplayed");
      } else {
        s.classList.remove("displayed");
        s.classList.add("notDisplayed");
      }
    });

    // Mark the clicked dot as displayed
    const dots = document.querySelectorAll(".dots__dot");
    dots.forEach((dot, i) => {
      if (i === slide) {
        dot.classList.add("displayed");
      } else {
        dot.classList.remove("displayed");
      }
    });
  };

  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = function () {
    goToSlide(0);
    createDots();
    activateDot(0);
  };
  init();

  const setNewInterval = function () {
    clearInterval(interval);
    interval = setInterval(nextSlide, 3000);
  };

  setNewInterval();

  // Event handlers
  btnRight.addEventListener("click", function () {
    nextSlide();
    setNewInterval();
  });

  btnLeft.addEventListener("click", function () {
    prevSlide();
    setNewInterval();
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") {
      prevSlide();
      setNewInterval();
    }
    if (e.key === "ArrowRight") {
      nextSlide();
      setNewInterval();
    }
  });

  dotContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("dots__dot")) {
      const slide = parseInt(e.target.dataset.slide, 10);
      goToSlide(slide);
      activateDot(slide);
      setNewInterval();
    }
  });

  // Touch event handlers
  let touchStartX = 0;
  let touchEndX = 0;

  document.addEventListener("touchstart", function (e) {
    touchStartX = e.touches[0].clientX;
  });

  document.addEventListener("touchend", function (e) {
    touchEndX = e.changedTouches[0].clientX;
    handleSwipe();
  });

  const handleSwipe = function () {
    const swipeThreshold = 50;

    if (touchStartX - touchEndX > swipeThreshold) {
      // Swipe left
      nextSlide();
      setNewInterval();
    } else if (touchEndX - touchStartX > swipeThreshold) {
      // Swipe right
      prevSlide();
      setNewInterval();
    }
  };
};

slider();
