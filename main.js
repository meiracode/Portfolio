
  /* wait until document is loaded in html */
document.addEventListener("DOMContentLoaded", () => {

  /* select all reveals classes and put it in a list */
  const reveals = document.querySelectorAll(".reveal");

  /* monitor elements and callback whenever something enters or leaves view */
  const observer = new IntersectionObserver(
    (entries) => {
        /* if it is in view, add in-view class to trigger css animation*/
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
        }
      });
    },   /* animation starts when 15% in view */
    { threshold: 0.15, rootMargin: "0px 0px -5% 0px" }
  );

    /* observe for each element */
  reveals.forEach((el) => observer.observe(el));

  /* SCROLLABLE SECTIONS */
  const scrollSections = [

    /* array of objects to be reused */
    {
      scroll: document.querySelector(".exp-scroll"),
      left:   document.querySelector(".exp-scroll-wrap .exp-arrow.left"),
      right:  document.querySelector(".exp-scroll-wrap .exp-arrow.right"),
    },
    {
      scroll: document.querySelector(".award-scroll"),
      left:   document.querySelector(".award-scroll-wrap .exp-arrow.left"),
      right:  document.querySelector(".award-scroll-wrap .exp-arrow.right"),
    },
  ];

  const scrollAmount = 340;

  /* loop thorugh each object with our initialization */
  scrollSections.forEach(({ scroll, left, right }) => {
    if (!scroll || !left || !right) return;

    /* hide arrows when not needed */
    function updateArrows() {
      const maxScroll = scroll.scrollWidth - scroll.clientWidth;
      left.classList.toggle("hidden", scroll.scrollLeft <= 5);
      right.classList.toggle("hidden", scroll.scrollLeft >= maxScroll - 5);
    }

    /* event listener to style movement */
    right.addEventListener("click", () => scroll.scrollBy({ left: scrollAmount, behavior: "smooth" }));
    left.addEventListener("click",  () => scroll.scrollBy({ left: -scrollAmount, behavior: "smooth" }));

    /* update which arrows are visible */
    scroll.addEventListener("scroll", updateArrows);
    window.addEventListener("resize", updateArrows);

      /* run once page loads */
    updateArrows();
  });

});