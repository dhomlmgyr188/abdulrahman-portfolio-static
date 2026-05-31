import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';

// collapse header
const collapse = document.getElementById("collapse");
const navbar = document.getElementById("navbar");
const header = document.getElementById("header");
const navButton = document.querySelectorAll(".js-hero-button");

collapse.addEventListener("click", function () {
  header.classList.add("active-is");
  navbar.classList.add("is-active");
  collapse.classList.toggle("hide");
});

navButton.forEach((link) => {
  link.addEventListener("click", () => {
    header.classList.remove("active-is");
    navbar.classList.remove("is-active");
    collapse.classList.remove("hide");
  });
});

const allSliders = document.querySelectorAll(".c-wrapper-slider");

allSliders.forEach((wrapperSlider) => {
  const carousel = wrapperSlider.querySelector(
    ".c-wrapper-slider__img-container__carousel",
  );
  const images = wrapperSlider.querySelectorAll(
    ".c-wrapper-slider__img-container__carousel__img",
  );
  const buttons = wrapperSlider.querySelectorAll(".carousel-button");

  let imageIndex = 0;
  let intervalId;

  const slideImage = () => {
    if (imageIndex >= images.length) {
      imageIndex = 0;
    } else if (imageIndex < 0) {
      imageIndex = images.length - 1;
    }

    carousel.style.transform = `translateX(+${imageIndex * 100}%)`;
  };

  const autoSlide = () => {
    intervalId = setInterval(() => {
      imageIndex++;
      slideImage();
    }, 2000);
  };

  autoSlide();

  buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
      clearInterval(intervalId);

      if (button.classList.contains("js-next-carousel")) {
        imageIndex--;
      } else {
        imageIndex++;
      }

      slideImage();
      autoSlide();
    });
  });

  wrapperSlider.addEventListener("mouseover", () => clearInterval(intervalId));
  wrapperSlider.addEventListener("mouseleave", autoSlide);
});

tippy('.class', {
  content: 'Tooltip',
})