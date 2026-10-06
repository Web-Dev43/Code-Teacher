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

const SUPABASE_URL = "https://fbqzavqemtezakmmysak.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_XRydS36sm1aza5HcrVh9FA_1sFAiCyK";
const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);

const completeLessonButton = document.querySelector("#completeLesson");
const lessonPassed = document.querySelector("#lessonPassed");
const saveStatus = document.querySelector("#saveStatus");
const authToggle = document.querySelector("#authToggle");
const authOverlay = document.querySelector("#authOverlay");
const closeAuth = document.querySelector("#closeAuth");
const authEmail = document.querySelector("#authEmail");
const authPassword = document.querySelector("#authPassword");
const loginButton = document.querySelector("#loginButton");
const signupButton = document.querySelector("#signupButton");
const logoutButton = document.querySelector("#logoutButton");
const authStatus = document.querySelector("#authStatus");

const starterCode = "<p>Hello, world!</p>";
const lesson3Button = document.querySelector("#lesson3Button");
const lesson3Playground = document.querySelector("#lesson3Playground");
const lesson3Editor = document.querySelector("#lesson3Editor");
const lesson3Preview = document.querySelector("#lesson3Preview");
const lesson3Run = document.querySelector("#lesson3Run");
const lesson3Reset = document.querySelector("#lesson3Reset");
const lesson3Passed = document.querySelector("#lesson3Passed");
const lesson3SaveStatus = document.querySelector("#lesson3SaveStatus");

const lesson3StarterCode = '<a href="https://example.com">Visit Example</a>';

const lesson4Button = document.querySelector("#lesson4Button");
const lesson4Playground = document.querySelector("#lesson4Playground");
const lesson4Editor = document.querySelector("#lesson4Editor");
const lesson4Preview = document.querySelector("#lesson4Preview");
const lesson4Run = document.querySelector("#lesson4Run");
const lesson4Reset = document.querySelector("#lesson4Reset");
const lesson4Passed = document.querySelector("#lesson4Passed");
const lesson4SaveStatus = document.querySelector("#lesson4SaveStatus");

const lesson4StarterCode = '<img src="https://picsum.photos/300/180" alt="A random picture">';
const LESSON4 = "images";

function setLesson4SaveStatus(message) {
  if (lesson4SaveStatus) lesson4SaveStatus.textContent = message;
}

function markLesson4Passed() {
  if (lesson4Passed) lesson4Passed.hidden = false;
  if (lesson4Button) {
    lesson4Button.textContent = "Practice";
    lesson4Button.classList.add("practice-ready");
  }
}

function isImageLessonCorrect(code) {
  return /<img\b[^>]*\bsrc\s*=\s*["'][^"']+["'][^>]*\balt\s*=\s*["'][^"']+["'][^>]*>/i.test(code)
    || /<img\b[^>]*\balt\s*=\s*["'][^"']+["'][^>]*\bsrc\s*=\s*["'][^"']+["'][^>]*>/i.test(code);
}

async function saveLesson4Progress(completed = false) {
  if (!currentUser) {
    setLesson4SaveStatus("Log in to save your progress.");
    return;
  }

  setLesson4SaveStatus("Saving...");
  const { error } = await supabaseClient.from("code_teacher_lesson_progress").upsert({
    user_id: currentUser.id,
    course: COURSE,
    lesson_slug: LESSON4,
    completed,
    code: lesson4Editor.value,
    updated_at: new Date().toISOString()
  });

  if (error) {
    console.error(error);
    setLesson4SaveStatus("Couldn't save. Try again.");
    return;
  }

  setLesson4SaveStatus(completed ? "Saved ✓ Lesson complete." : "Saved ✓");
}

async function loadLesson4Progress() {
  if (!currentUser) return;
  const { data, error } = await supabaseClient
    .from("code_teacher_lesson_progress")
    .select("code, completed")
    .eq("user_id", currentUser.id)
    .eq("course", COURSE)
    .eq("lesson_slug", LESSON4)
    .maybeSingle();

  if (error) return console.error(error);

  if (data?.code) {
    lesson4Editor.value = data.code;
    if (data.completed) markLesson4Passed();
    setLesson4SaveStatus(data.completed ? "Lesson complete ✓" : "Progress loaded ✓");
    runLesson4();
  }
}

function runLesson4() {
  try {
    const code = lesson4Editor.value;
    if (!code.trim()) throw new Error("Your editor is empty. Put some HTML in there and try again.");
    validateHTML(code);
    hideError();

    lesson4Preview.srcdoc = code;

    if (isImageLessonCorrect(code)) {
      markLesson4Passed();
      saveLesson4Progress(true);
    } else {
      saveLesson4Progress(false);
    }
  } catch (error) {
    showError("Your code broke.", error.message || "Something went wrong while running your code.");
  }
}


const LESSON3 = "links";

const COURSE = "html";
const LESSON = "paragraphs";
let currentUser = null;

function markLessonPassed() {
  if (lessonPassed) lessonPassed.hidden = false;
  if (lessonButton) {
    lessonButton.textContent = "Practice";
    lessonButton.classList.add("practice-ready");
  }
}

function isParagraphLessonCorrect(code) {
  const matches = [...code.matchAll(/<p(?:\s[^>]*)?>([\\s\\S]*?)<\\/p>/gi)];
  return matches.some(match => match[1].replace(/<[^>]*>/g, "").trim().length > 0);
}

function setLesson3SaveStatus(message) {
  if (lesson3SaveStatus) lesson3SaveStatus.textContent = message;
}

function markLesson3Passed() {
  if (lesson3Passed) lesson3Passed.hidden = false;
  if (lesson3Button) {
    lesson3Button.textContent = "Practice";
    lesson3Button.classList.add("practice-ready");
  }
}

function isLinkLessonCorrect(code) {
  return /<a\b[^>]*\bhref\s*=\s*["'][^"']+["'][^>]*>\s*[^<]+\s*<\/a>/i.test(code);
}

async function saveLesson3Progress(completed = false) {
  if (!currentUser) {
    setLesson3SaveStatus("Log in to save your progress.");
    return;
  }

  setLesson3SaveStatus("Saving...");
  const { error } = await supabaseClient.from("code_teacher_lesson_progress").upsert({
    user_id: currentUser.id,
    course: COURSE,
    lesson_slug: LESSON3,
    completed,
    code: lesson3Editor.value,
    updated_at: new Date().toISOString()
  });

  if (error) {
    console.error(error);
    setLesson3SaveStatus("Couldn't save. Try again.");
    return;
  }

  setLesson3SaveStatus(completed ? "Saved ✓ Lesson complete." : "Saved ✓");
}

async function loadLesson3Progress() {
  if (!currentUser) return;
  const { data, error } = await supabaseClient
    .from("code_teacher_lesson_progress")
    .select("code, completed")
    .eq("user_id", currentUser.id)
    .eq("course", COURSE)
    .eq("lesson_slug", LESSON3)
    .maybeSingle();

  if (error) return console.error(error);

  if (data?.code) {
    lesson3Editor.value = data.code;
    if (data.completed) markLesson3Passed();
    setLesson3SaveStatus(data.completed ? "Lesson complete ✓" : "Progress loaded ✓");
    runLesson3();
  }
}

function runLesson3() {
  try {
    const code = lesson3Editor.value;
    if (!code.trim()) throw new Error("Your editor is empty. Put some HTML in there and try again.");
    validateHTML(code);
    hideError();

    lesson3Preview.srcdoc = code;

    if (isLinkLessonCorrect(code)) {
      markLesson3Passed();
      saveLesson3Progress(true);
    } else {
      saveLesson3Progress(false);
    }
  } catch (error) {
    showError("Your code broke.", error.message || "Something went wrong while running your code.");
  }
}

function setSaveStatus(message) {
  if (saveStatus) saveStatus.textContent = message;
}

function setAuthStatus(message) {
  if (authStatus) authStatus.textContent = message;
}

async function ensureProfile(user) {
  const { error } = await supabaseClient.from("code_teacher_profiles").upsert({
    id: user.id,
    display_name: user.email?.split("@")[0] || "coder"
  });
  if (error) console.error("Profile save failed:", error);
}

async function saveLessonProgress(completed = false) {
  if (!currentUser) {
    setSaveStatus("Log in to save your progress.");
    return;
  }

  setSaveStatus("Saving...");
  const { error } = await supabaseClient.from("code_teacher_lesson_progress").upsert({
    user_id: currentUser.id,
    course: COURSE,
    lesson_slug: LESSON,
    completed,
    code: editor.value,
    updated_at: new Date().toISOString()
  });

  if (error) {
    console.error(error);
    setSaveStatus("Couldn't save. Try again.");
    return;
  }

  if (completed) {
    await supabaseClient.from("code_teacher_course_progress").upsert({
      user_id: currentUser.id,
      course: COURSE,
      current_lesson: LESSON,
      percent: 100,
      updated_at: new Date().toISOString()
    });
  }

  setSaveStatus(completed ? "Saved ✓ Lesson complete." : "Saved ✓");
}

async function loadLessonProgress() {
  if (!currentUser) return;
  const { data, error } = await supabaseClient
    .from("code_teacher_lesson_progress")
    .select("code, completed")
    .eq("user_id", currentUser.id)
    .eq("course", COURSE)
    .eq("lesson_slug", LESSON)
    .maybeSingle();

  if (error) {
    console.error(error);
    return;
  }

  if (data?.code) {
    editor.value = data.code;
    if (data.completed) markLessonPassed();
    setSaveStatus(data.completed ? "Lesson complete ✓" : "Progress loaded ✓");
    runCode();
  }
}

function openAuth() {
  authOverlay.hidden = false;
  const loggedIn = !!currentUser;
  loginButton.hidden = loggedIn;
  signupButton.hidden = loggedIn;
  logoutButton.hidden = !loggedIn;
  if (loggedIn) authEmail.value = currentUser.email || "";
  setAuthStatus(loggedIn ? `Logged in as ${currentUser.email}` : "");
}

function closeAuthModal() {
  authOverlay.hidden = true;
}



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
  errorMessage.textContent = `${title} ${message}`;
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
  const tagPattern = /<!--[\\s\\S]*?-->|<\/?([a-zA-Z][\w-]*)(?:\s[^<>]*?)?\s*\/?>/g;
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

let completionSaving = false;

async function awaitLessonCompletion() {
  if (completionSaving || !currentUser) return;
  completionSaving = true;
  await saveLessonProgress(true);
  completionSaving = false;
}

function runCode() {
  try {
    const code = editor.value;

    if (!code.trim()) {
      throw new Error("Your editor is empty. Put some HTML in there and try again.");
    }

    validateHTML(code);
    hideError();

    if (isParagraphLessonCorrect(code)) {
      markLessonPassed();
      awaitLessonCompletion();
    }

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
    if (!isParagraphLessonCorrect(code)) saveLessonProgress(false);
  } catch (error) {
    showError("Your code broke.", error.message || "Something went wrong while running your code.");
  }
}


lesson4Button?.addEventListener("click", () => {
  lesson4Playground.hidden = false;
  lesson4Playground.scrollIntoView({ behavior: "smooth", block: "start" });
  runLesson4();
});

lesson4Run?.addEventListener("click", runLesson4);

lesson4Reset?.addEventListener("click", () => {
  lesson4Editor.value = lesson4StarterCode;
  runLesson4();
});

lesson3Button?.addEventListener("click", () => {
  lesson3Playground.hidden = false;
  lesson3Playground.scrollIntoView({ behavior: "smooth", block: "start" });
  runLesson3();
});

lesson3Run?.addEventListener("click", runLesson3);

lesson3Reset?.addEventListener("click", () => {
  lesson3Editor.value = lesson3StarterCode;
  runLesson3();
});

lessonButton?.addEventListener("click", () => {
  playground.hidden = false;
  playground.scrollIntoView({ behavior: "smooth", block: "start" });
  runCode();
});

runButton?.addEventListener("click", runCode);


authToggle?.addEventListener("click", openAuth);
closeAuth?.addEventListener("click", closeAuthModal);
authOverlay?.addEventListener("click", (event) => {
  if (event.target === authOverlay) closeAuthModal();
});

signupButton?.addEventListener("click", async () => {
  const email = authEmail.value.trim();
  const password = authPassword.value;
  if (!email || !password) return setAuthStatus("Enter an email and password.");
  setAuthStatus("Creating account...");
  const { data, error } = await supabaseClient.auth.signUp({ email, password });
  if (error) return setAuthStatus(error.message);
  if (data.user) {
    await ensureProfile(data.user);
    setAuthStatus(data.session ? "Account created. You're in." : "Account created. Check your email to confirm it.");
  }
});

loginButton?.addEventListener("click", async () => {
  const email = authEmail.value.trim();
  const password = authPassword.value;
  if (!email || !password) return setAuthStatus("Enter an email and password.");
  setAuthStatus("Logging in...");
  const { data, error } = await supabaseClient.auth.signInWithPassword({ email, password });
  if (error) return setAuthStatus(error.message);
  currentUser = data.user;
  await ensureProfile(currentUser);
  await loadLessonProgress();
  authToggle.textContent = "Account";
  setAuthStatus(`Logged in as ${currentUser.email}`);
});

logoutButton?.addEventListener("click", async () => {
  await supabaseClient.auth.signOut();
  currentUser = null;
  authToggle.textContent = "Log in";
  closeAuthModal();
  setSaveStatus("Progress stays saved to your account.");
});

supabaseClient.auth.onAuthStateChange(async (_event, session) => {
  currentUser = session?.user || null;
  authToggle.textContent = currentUser ? "Account" : "Log in";
  if (currentUser) {
    await ensureProfile(currentUser);
    await loadLessonProgress();
    await loadLesson3Progress();
    await loadLesson4Progress();
  }
});

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
