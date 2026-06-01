// collapse header
const navbar = document.getElementById("navbar"),
  collapse = document.getElementById("collapse"),
  headerButton = document.querySelectorAll(".c-nav__li"),
  sections = document.querySelectorAll("section");

var lastScrollTop = 0,
  header = document.getElementById("header"),
  headerContainer = document.querySelector(".c-header")

collapse.addEventListener("click", () => {
  navbar.classList.toggle("active");
});

window.addEventListener("scroll", () => {
  // let current = "";
  // sections.forEach((section) => {
  //   const sectionTop = section.offsetTop;
  //   const sectionHeight = section.clientHeight;
  //   if (pageYOffset >= sectionTop) {
  //     current = section.getAttribute("id");
  //   }
  // });

  headerButton.forEach((li) => {
    navbar.classList.remove("active");
    li.classList.remove("button-active");
    if (li.classList.contains(current)) {
      li.classList.add("button-active");
    }
  });
  // var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  // if (scrollTop > lastScrollTop) {
  //   header.classList.add("hidden-header");
  // } else {
  //   header.classList.remove("hidden-header");
  // }
  // lastScrollTop = scrollTop;

  // headerContainer.classList.toggle("slidedown", window.scrollY > 0)
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
