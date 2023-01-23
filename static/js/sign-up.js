"use strict";

import { notify } from "./notify.js";

const body = document.body
const sign_up_button = document.querySelector("#sign-up")
const inputs = document.querySelectorAll("input")
sign_up_button.addEventListener("click", signUp)

async function signUp(e) {
    e.preventDefault()
    const valid = validate()
    if (valid == false) {
        notify({
            body,
            type: 'notify-error',
            message: 'Some fields are missing !!!',
            delay: 4
        })
        return
    }
    const sign_up_form = document.querySelector("#sign-up-form")
    const data =  new FormData(sign_up_form)
    const response = await fetch('http://localhost:3000/user/register', {
        method: 'POST',
        body: data
    })
    if (response.status !== 201) {
        const {message} = await response.json()
        notify({
            body,
            type: 'notify-error',
            message: `${message}`,
            delay: 4
        })
        return
    }
    
    const {message, accessToken} = await response.json()
    notify({
        body,
        type: 'notify-success',
        message: `${message}`,
        delay: 4
    })
    setTimeout(() => {
        window.location.href = `./success-page.html?Bearer=${accessToken}`
    }, 5000)
    return
}

function validate() {
    for (const i of inputs) {
        if (i.checkValidity() == false) return false
    }
    return true
}