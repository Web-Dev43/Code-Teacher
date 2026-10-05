const lessonButton = document.querySelector("#lessonButton");

lessonButton.addEventListener("click", () => {
  lessonButton.textContent = "lesson loading...";
  setTimeout(() => {
    window.location.hash = "lessons";
    lessonButton.textContent = "Let's code";
  }, 450);
});