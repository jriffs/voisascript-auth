"use strict";

const button_top = document.querySelector("#sign-up-top")
const get_started_button = document.querySelector("#get-started")

function handleSignUpClick() {
    window.location.href = "./sign-up.html"
}

button_top.addEventListener("click", handleSignUpClick)
get_started_button.addEventListener("click", handleSignUpClick)