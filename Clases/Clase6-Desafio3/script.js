function validateForm(event) {
  event.preventDefault();

  const firstName = document.getElementById("first-name").value;
  const lastName = document.getElementById("last-name").value;
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirm-password").value;
  const birthday = document.getElementById("birthdate").value;
  const newsletterCheckbox = document.getElementById("newsletter-checkbox");
  const termsCheckbox = document.getElementById("terms-checkbox");

  // Validación de campos
  if (!firstName || !lastName || !username || !password || !confirmPassword || !birthday) {
    showError("Please fill in all fields.");
    return;
  }

  // Validación de contraseñas
  if (password !== confirmPassword) {
    showError("Passwords do not match.");
    return;
  }

  // Validación de caracteres especiales en campos de texto
  if (!/^[\w\s]+$/.test(firstName) || !/^[\w\s]+$/.test(lastName) || !/^[\w\s]+$/.test(username)) {
    showError("Only letters, numbers, and spaces are allowed in text fields.");
    return;
  }

  // Validación de contraseña con letras y números
  if (!/\d/.test(password) || !/[a-zA-Z]/.test(password)) {
    showError("Password must contain both letters and numbers.");
    return;
  }

  // Validación de edad
  const birthdate = new Date(birthday);
  const currentDate = new Date();
  const age = currentDate.getFullYear() - birthdate.getFullYear();
  const birthdateDay = birthdate.getDate();
  const currentDay = currentDate.getDate();
  
  if (age < 18 || (age === 18 && currentDay < birthdateDay)) {
    showError("You have to be 18 years old or older.");
    return;
  }

  // Validación de checkboxes
  if (!newsletterCheckbox.checked || !termsCheckbox.checked) {
    showError("Please agree to the terms and conditions.");
    return;
  }

  // Formulario válido, se puede enviar
  alert("Form submitted successfully!");
  document.getElementById("registration-form").reset();
}

// Mostrar un mensaje de error
// Esta función se encarga de mostrar un mensaje de error utilizando la función "alert" del navegador.
// Recibe un parámetro "message" que representa el mensaje de error a mostrar.
function showError(message) {
  alert(message);
}

// Agregar un evento de escucha al formulario de registro
// Este evento de escucha se activa cuando se envía el formulario de registro.
// Al activarse, llama a la función "validateForm" para realizar la validación del formulario.
document.getElementById("registration-form").addEventListener("submit", validateForm);
