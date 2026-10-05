const lessonButton = document.querySelector("#lessonButton");
const playground = document.querySelector("#lessonPlayground");
const editor = document.querySelector("#codeEditor");
const preview = document.querySelector("#codePreview");
const runButton = document.querySelector("#runCode");
const resetButton = document.querySelector("#resetCode");
const errorOverlay = document.querySelector("#errorOverlay");
const errorTitle = document.querySelector("#errorTitle");
const errorMessage = document.querySelector("#errorMessage");
const closeError = document.querySelector("#closeError");

const starterCode = "<h1>Hello, world!</h1>";

function showError(title, message) {
  errorTitle.textContent = title;
  errorMessage.textContent = message;
  errorOverlay.hidden = false;
}

function hideError() {
  errorOverlay.hidden = true;
}

function runCode() {
  try {
    const code = editor.value;

    if (!code.trim()) {
      throw new Error("Your editor is empty. Put some HTML in there and try again.");
    }

    preview.srcdoc = code;
  } catch (error) {
    showError("Your code broke.", error.message || "Something went wrong while running your code.");
  }
}

lessonButton?.addEventListener("click", () => {
  playground.hidden = false;
  playground.scrollIntoView({ behavior: "smooth", block: "start" });
  runCode();
});

runButton?.addEventListener("click", runCode);

resetButton?.addEventListener("click", () => {
  editor.value = starterCode;
  hideError();
  runCode();
});

closeError?.addEventListener("click", hideError);

errorOverlay?.addEventListener("click", (event) => {
  if (event.target === errorOverlay) hideError();
});

if (preview && editor) {
  runCode();
}
