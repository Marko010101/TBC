const buttons = document.querySelectorAll(".btn-opener");
const paragraphs = document.querySelectorAll(".section-questions-paragraph");
const arrows = document.querySelectorAll(".arrowDown");

buttons.forEach((button, index) => {
  button.addEventListener("click", () => {
    paragraphs.forEach((paragraph, i) => {
      if (index === i) {
        paragraph.style.transition = "max-height 0.2s ";
        paragraph.classList.toggle("show");
      } else {
        paragraph.style.transition = "max-height 0.4s ";
        paragraph.classList.remove("show");
      }
    });

    const isOpen = paragraphs[index].classList.contains("show");

    arrows[index].classList.toggle("arrowDown", !isOpen);
    arrows[index].classList.toggle("arrowUp", isOpen);

    isOpen &&
      paragraphs.forEach((p, i) => {
        if (index !== i) {
          p.style.transition = "max-height 0s ease";
          p.classList.remove("show");
          arrows[i].classList.remove("arrowUp");
          arrows[i].classList.add("arrowDown");
        }
      });
  });
});
