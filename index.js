let registerForm = document.querySelector("#register-form");
const loginForm = document.querySelector("#login-form");

window.addEventListener("DOMContentLoaded", function () {
  if (registerForm) {
    registerForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const username = document.querySelector("#username").value;
      const email = document.querySelector("#email").value;
      const password = document.querySelector("#password").value;

      const users = JSON.parse(localStorage.getItem("users")) || [];

      const userExists = users.some((user) => user.email === email);
      console.log(userExists);

      if (userExists) {
        alert(
          "This email is already registered. Please use a different email or log in."
        );
        window.location.href = "login.html";
      } else {
        let user = { username, email, password };
        users.push(user);

        localStorage.setItem("users", JSON.stringify(users));
        registerForm.reset();

        alert("User registered successfully");
        window.location.href = "login.html";
      }
    });
  }
});

// login
if (loginForm) {
  loginForm.addEventListener("submit", function logged(event) {
    event.preventDefault();
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;

    if(localStorage.getItem("users") == null){
      alert("Please register first");
      window.location.href = "register.html";
    }
    
    const users = JSON.parse(localStorage.getItem("users"));

    const user = users.find(
      (user) => user.email === email && user.password === password
    );

    if (user) {
      sessionStorage.setItem("loggedInUser", JSON.stringify(user));
      window.location.href = "index.html";
      console.log("pass");
    } else {
      alert("Invalid email or password");
    }
  });
}

// Show Dashboard
const loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser"));

console.log(loggedInUser);

const userDisplayName = document.querySelector(".profile-name");

if (userDisplayName && loggedInUser) {
  userDisplayName.textContent = loggedInUser.username;
  document.querySelector(".profile").classList.remove("d-none");
  document.querySelector(".btn-group").classList.add("d-none");
  document.querySelector(".card-group").classList.remove("d-none");
  document.querySelector(".dismiss").classList.add("d-none");
}

if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    sessionStorage.removeItem("loggedInUser");
    window.location.href = "index.html"; // Redirect to login page
  });
}
