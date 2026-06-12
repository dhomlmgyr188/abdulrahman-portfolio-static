// تعريف المتغيرات
const navbar = document.getElementById("navbar"),
  collapse = document.getElementById("collapse"),
  headerButton = document.querySelectorAll(".c-nav__li"),
  sections = document.querySelectorAll("section");
let lastScrollTop = 0,
  header = document.getElementById("header"),
  headerContainer = document.querySelector(".c-header");

// عند الضغط على زر collapse يعطى الصنف active وعند الضغط مرة اخرى باستخدام خاصية toggle يزال الصنف active
collapse.addEventListener("click", () => {
  navbar.classList.toggle("active");
});

// عند التمرير لكل قسم يعطى لون لزر القائمة يثبت ان المستخدم يقف على هذا القسم
window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (scrollY >= sectionTop - 64) {
      current = section.getAttribute("id");
    }
  });

  headerButton.forEach((li) => {
    navbar.classList.remove("active");
    li.classList.remove("button-active");
    if (li.classList.contains(current)) {
      li.classList.add("button-active");
    }
  });

  // عند النزول السفلي في الصفحة يضيف الصنف hidder-header اذا شيء اخر يزيل العنصر hidden-header
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  if (scrollTop > lastScrollTop) {
    header.classList.add("hidden-header");
  } else {
    header.classList.remove("hidden-header");
  }
  lastScrollTop = scrollTop;

  headerContainer.classList.toggle("slidedown", window.scrollY > 0);
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

// يضيف الصنف active على ال الزر المفعل ويزيله من باقي الاصناف التي لها اسماء مختلفة
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

// يضيف السنة الحالية في عنصر داخل مستند html ويحدثها مع مرور كل سنة دون العودة لكتابتها يدوياً
const copyRight = (document.getElementById("copyRight").innerHTML =
  "©" + new Date().getFullYear());

/*
 يغير ثيم الصفحة من خلال اضافة الصنف active على الbody
 ويخزن قيمته في الذاكرة بحيث حتى لو المستخدم حدث الصفحة يضل الصنف مفعل
 */
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