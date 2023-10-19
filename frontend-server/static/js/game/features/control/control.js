import { sendToServer, userData } from "../../../main.js"

export function initControls(username) {
    if (document.getElementById(username)) {
        document.addEventListener("keydown", (e) => {
            onKeyDown(e, username)
        })
        
        document.addEventListener("keyup", (e) => {
            onKeyUp(e, username)
        })

        window.addEventListener("resize", () => {
            userData.innerWidth = window.innerWidth
            userData.innerHeight = window.innerHeight
        })
    }
}

function onKeyDown(e, username) {
    switch (e.key) {
        case "ArrowRight": {
            sendToServer({
                request: "StartMove",
                name: username,
                value: "Right"
            })
            break
        }
        case "ArrowLeft": {
            sendToServer({
                request: "StartMove",
                name: username,
                value: "Left"
            })
            break
        }
        case "ArrowUp": {
            sendToServer({
                request: "StartMove",
                name: username,
                value: "Up"
            })
            break
        }
        case "ArrowDown": {
            sendToServer({
                request: "StartMove",
                name: username,
                value: "Down"
            })
            break
        }
    }
}

function onKeyUp(e, username) {
    switch (e.key) {
        case "ArrowRight": {
            sendToServer({
                request: "EndMove",
                name: username,
                value: "Right"
            })
            break
        }
        case "ArrowLeft": {
            sendToServer({
                request: "EndMove",
                name: username,
                value: "Left"
            })
            break
        }
        case "ArrowUp": {
            sendToServer({
                request: "EndMove",
                name: username,
                value: "Up"
            })
            break
        }
        case "ArrowDown": {
            sendToServer({
                request: "EndMove",
                name: username,
                value: "Down"
            })
            break
        }
    }
}