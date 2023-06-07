function validateForm(event) {
    event.preventDefault();
  
    const firstName = document.getElementById("first-name").value;
    const lastName = document.getElementById("last-name").value;
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;
    const birthday = document.getElementById("birthdate").value;


    if (!firstName || !lastName || !username || !password || !confirmPassword || !birthday) {
      showError("Please fill in all fields.");
      return;
    }
  

    if (password !== confirmPassword) {
      showError("Passwords do not match.");
      return;
    }

    if (!/^[\w\s]+$/.test(firstName) || !/^[\w\s]+$/.test(lastName) || !/^[\w\s]+$/.test(username)) {
      showError("Only letters, numbers, and spaces are allowed in text fields.");
      return;
    }
  

    if (!/\d/.test(password) || !/[a-zA-Z]/.test(password)) {
      showError("Password must contain both letters and numbers.");
      return;
    }
}  