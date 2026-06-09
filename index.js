// collapse header
const navbar = document.getElementById("navbar"),
  collapse = document.getElementById("collapse"),
  headerButton = document.querySelectorAll(".c-nav__li"),
  sections = document.querySelectorAll("section");

var lastScrollTop = 0,
  header = document.getElementById("header"),
  headerContainer = document.querySelector(".c-header");

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

// filterServices
const filterButtons = document.querySelectorAll(".c-services-filter btutton");
const filterContainer = document.querySelectorAll(
  ".c-services-cards-container .c-service-card ",
);

//
const filterCard = (e) => {
  document.querySelector(".active").classList.remove("active");
  e.target.classList.add("active");

  filterContainer.forEach((card) => {
    card.classList.add("hide");

    if (
      card.dataset.name === e.target.dataset.name ||
      e.target.dataset.name === "all"
    ) {
      card.classList.remove("hide");
    }
  });
};
// console.log(filterButtons, filterContainer);

filterButtons.forEach((button) => button.addEventListener("click", filterCard));

// filterSkills
const skillButtons = document.querySelectorAll(".bgcolor-guide button");
const skillItems = document.querySelectorAll(".skills-tech-container .skill");

const highlightSkills = (e) => {
  const currentActive = document.querySelector(".bgcolor-guide button.active");
  if (currentActive) {
    currentActive.classList.remove("active");
  }

  e.target.classList.add("active");

  const filterName = e.target.dataset.name;

  skillItems.forEach((skill) => {
    skill.classList.remove("highlighted", "dimmed");

    if (filterName === "all") {
      return;
    }

    if (skill.dataset.name === filterName) {
      skill.classList.add("highlighted");
    } else {
      skill.classList.add("dimmed");
    }
  });
};

skillButtons.forEach((button) =>
  button.addEventListener("click", highlightSkills),
);

const copyRight = (document.getElementById("copyRight").innerHTML =
  "©" + new Date().getFullYear());

// theme-switch
let darkmode = localStorage.getItem("darkmode");
const themeSwitch = document.querySelectorAll(".theme-switch");

const enableDarkMode = () => {
  document.body.classList.add("darkmode");
  localStorage.setItem("darkmode", "active");
};
const disableDarkMode = () => {
  document.body.classList.remove("darkmode");
  localStorage.setItem("darkmode", null);
};

if (darkmode === "active") enableDarkMode();

themeSwitch.forEach((button) => {
  button.addEventListener("click", () => {
    darkmode = localStorage.getItem("darkmode");
    darkmode !== "active" ? enableDarkMode() : disableDarkMode();
  });
});
