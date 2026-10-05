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

const punishments = [
  "bro lock in 😭",
  "twin... what was that",
  "bro the code is fighting back",
  "you had ONE job",
  "nah bro, run that back",
  "respectfully, fix your code",
  "the computer is disappointed in you",
  "bro is NOT beating the syntax allegations",
  "lock in before the semicolons start laughing",
  "we are NOT shipping this"
];

function showError(title, message) {
  const punishment = punishments[Math.floor(Math.random() * punishments.length)];
  errorTitle.textContent = punishment;
  errorMessage.textContent = message;
  errorOverlay.hidden = false;
}

function hideError() {
  errorOverlay.hidden = true;
}

function validateHTML(code) {
  const voidTags = new Set([
    "area", "base", "br", "col", "embed", "hr", "img",
    "input", "link", "meta", "param", "source", "track", "wbr"
  ]);

  const stack = [];
  const tagPattern = /<!--[sS]*?-->|<\/?([a-zA-Z][\w-]*)(?:\s[^<>]*?)?\s*\/?>/g;
  let match;

  while ((match = tagPattern.exec(code)) !== null) {
    const token = match[0];

    if (token.startsWith("<!--")) continue;

    const tag = match[1].toLowerCase();
    const isClosing = token.startsWith("</");
    const isSelfClosing = /\/\s*>$/.test(token);

    if (voidTags.has(tag) || isSelfClosing) {
      if (isClosing) {
        throw new Error(`<${tag}> is a self-closing HTML element, so it should not have a closing tag.`);
      }
      continue;
    }

    if (isClosing) {
      if (!stack.length) {
        throw new Error(`You closed <${tag}> but there is no matching opening tag.`);
      }

      const expected = stack.pop();

      if (expected !== tag) {
        throw new Error(`You closed </${tag}>, but <${expected}> was still open. Check your tags.`);
      }
    } else {
      stack.push(tag);
    }
  }

  if (stack.length) {
    const tag = stack[stack.length - 1];
    throw new Error(`<${tag}> is still open. Add </${tag}> before running your code.`);
  }
}

function runCode() {
  try {
    const code = editor.value;

    if (!code.trim()) {
      throw new Error("Your editor is empty. Put some HTML in there and try again.");
    }

    validateHTML(code);
    hideError();

    const errorReporter = `
      <script>
        window.addEventListener("error", (event) => {
          parent.postMessage({
            type: "code-teacher-error",
            title: "Your code broke.",
            message: event.message || "Something went wrong inside the preview."
          }, "*");
        });

        window.addEventListener("unhandledrejection", (event) => {
          parent.postMessage({
            type: "code-teacher-error",
            title: "Your code broke.",
            message: event.reason?.message || String(event.reason || "Unhandled promise rejection.")
          }, "*");
        });
      <\/script>
    `;

    preview.srcdoc = errorReporter + code;
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

window.addEventListener("message", (event) => {
  if (event.source !== preview.contentWindow) return;

  if (event.data?.type === "code-teacher-error") {
    showError(
      event.data.title || "Your code broke.",
      event.data.message || "Something went wrong inside the preview."
    );
  }
});

if (preview && editor) {
  runCode();
}
