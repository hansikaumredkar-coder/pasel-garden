const passwordInput = document.getElementById("password");
const unlockButton = document.getElementById("unlock-btn");
const errorMessage = document.getElementById("error-message");

const welcomeScreen = document.getElementById("welcome-screen");
const gardenScreen = document.getElementById("garden-screen");

const correctPassword = "CUPCAKE";
let typedPassword = "";

function updatePasswordDisplay() {
  // All earlier letters become dots; the newest letter stays visible.
  const dots = "•".repeat(Math.max(0, typedPassword.length - 1));
  const newestLetter = typedPassword.slice(-1);

  passwordInput.value = dots + newestLetter;

  // Keep the cursor at the end of the input.
  passwordInput.setSelectionRange(
    passwordInput.value.length,
    passwordInput.value.length
  );
}

passwordInput.addEventListener("keydown", function (event) {
  if (event.key === "Backspace") {
    event.preventDefault();
    typedPassword = typedPassword.slice(0, -1);
    updatePasswordDisplay();
    return;
  }

  if (event.key === "Enter") {
    event.preventDefault();
    unlockGarden();
    return;
  }

  // Accept letters and numbers typed by the visitor.
  if (
    event.key.length === 1 &&
    !event.ctrlKey &&
    !event.altKey &&
    !event.metaKey
  ) {
    event.preventDefault();
    typedPassword += event.key.toUpperCase();
    updatePasswordDisplay();
  }
});

passwordInput.addEventListener("paste", function (event) {
  event.preventDefault();

  const pastedText = event.clipboardData
    .getData("text")
    .toUpperCase();

  typedPassword += pastedText;
  updatePasswordDisplay();
});

function unlockGarden() {
  if (typedPassword === correctPassword) {
    errorMessage.textContent = "";
    welcomeScreen.classList.add("hidden");
    gardenScreen.classList.remove("hidden");
  } else {
    errorMessage.textContent = "That password isn't quite right. Try again!";
    typedPassword = "";
    passwordInput.value = "";
    passwordInput.focus();
  }
}

unlockButton.addEventListener("click", unlockGarden);
