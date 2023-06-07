// Función de validación del formulario
function validateForm(event) {
  event.preventDefault();

  // Obtener los valores de los campos del formulario
  const firstName = document.getElementById("first-name").value;
  const lastName = document.getElementById("last-name").value;
  const email = document.getElementById("email").value;
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirm-password").value;
  const birthday = document.getElementById("birthdate").value;
  const newsletterCheckbox = document.getElementById("newsletter-checkbox");
  const termsCheckbox = document.getElementById("terms-checkbox");

  // Validación de campos vacíos
  if (!firstName || !lastName || !username || !password || !confirmPassword || !birthday) {
    showError("Please fill in all fields.");
    return;
  }

  // Validación de coincidencia de contraseñas
  if (password !== confirmPassword) {
    showError("Passwords do not match.");
    return;
  }

  // Validación de caracteres especiales en campos de texto
  if (!/^[\w\s]+$/.test(firstName) || !/^[\w\s]+$/.test(lastName)) {
    showError("Only letters, numbers, and spaces are allowed in text fields.");
    return;
  }

  // Validación de coincidencia entre username y mail
  if (username == email) {
    showError("Email can't be the same as username.");
    return;
  }

  // Validación del campo de correo electrónico
  if (!email) {
    showError("Please enter an email address.");
    return;
  }

  // Expresión regular para validar el formato del correo electrónico
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  if (!emailRegex.test(email)) {
    showError("Please enter a valid email address.");
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
function showError(message) {
  alert(message);
}

// Configurar el calendario para seleccionar la fecha de nacimiento
document.addEventListener("DOMContentLoaded", function() {
  flatpickr("#birthdate", {
    dateFormat: "d-m-Y"
  });
});

// Agregar un evento de escucha al formulario de registro
document.getElementById("registration-form").addEventListener("submit", validateForm);
