"use strict";

const signupForm = document.querySelector(".signup");

signupForm.onsubmit = function (event) {
    event.preventDefault();

    const signupData = {
        username: signupForm.username.value,
        fullName: signupForm.fullname.value,
        password: signupForm.password.value
    }

    signupForm.signupButton.disabled = true;
    
    registerUser(signupData);
}

function registerUser(signupData) {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "accept": "application/json",
        },
        body: JSON.stringify(signupData),
    };

    return fetch(apiBaseURL + "/api/users", options)
        .then(response => response.json())
        .then(registerData => {
            if (registerData.hasOwnProperty("message")) {
                console.error(registerData);
                displayRegistrationError(registerData.message);
                return null;
            }

            console.log("User registered successfully:", registerData);

            window.localStorage.setItem("login-data", JSON.stringify(registerData));
            window.location.assign("/microbloglite-capstone-starter/posts/index.html"); // redirect

            return registerData;
        })
        .catch(error => {
            console.error("Network or server error:", error);
            displayRegistrationError("Unable to connect.");
        });
}
function displayRegistrationError(message) {
    const errorElement = document.getElementById("registration-error");
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
}