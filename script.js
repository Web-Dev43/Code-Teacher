const lessonButton = document.querySelector("#lessonButton");
const playground = document.querySelector("#lessonPlayground");
const editor = document.querySelector("#codeEditor");
const preview = document.querySelector("#codePreview");
const runButton = document.querySelector("#runCode");
const resetButton = document.querySelector("#resetCode");

const starterCode = "<h1>Hello, world!</h1>";

function runCode() {
  preview.srcdoc = editor.value;
}

lessonButton?.addEventListener("click", () => {
  playground.hidden = false;
  playground.scrollIntoView({ behavior: "smooth", block: "start" });
  runCode();
});

runButton?.addEventListener("click", runCode);

resetButton?.addEventListener("click", () => {
  editor.value = starterCode;
  runCode();
});

if (preview && editor) {
  runCode();
}
