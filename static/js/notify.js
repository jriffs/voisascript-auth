export function notify({body, type, message, delay}) {
    const notificationDiv = document.createElement("div")
    notificationDiv.innerHTML = `
        <div class="notification ${type}"><h4>${message}</h4></div>
    `
    body.appendChild(notificationDiv)
    if (delay) {
        setTimeout(() => {
            body.removeChild(notificationDiv)
        }, (delay * 1000))
    }
}