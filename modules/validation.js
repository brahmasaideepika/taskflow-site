export function validateTaskInput(text) {

  const error =
    document.getElementById(
      "error-message"
    );

  if (!text.trim()) {

    error.textContent =
      "Task cannot be empty";

    return false;
  }

  if (text.length > 100) {

    error.textContent =
      "Maximum 100 characters";

    return false;
  }

  error.textContent = "";

  return true;
}
