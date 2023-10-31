import { sendToServer, socket } from "../../../main.js";
import { movePlayer } from "../player/player.js";
import { updateServerPlayerPosition } from "../player/player.js";

var players

function getDataForNextLoop() {
    sendToServer({request: "getPlayersData"})

    socket.onmessage = (event) => {
        const data = JSON.parse(event.data);  // Conversion du message JSON en objet
        
        switch (data["request"]) {
            case "allPlayers": {
                players = data["players"]
                break
            }
        }
    }
    gameLoop(players)
}

function updatePlayerPosition(players) {
    for (let name in players) {
        movePlayer(players[name])
    }
}

export function gameLoop(players = "") {
    updatePlayerPosition(players)
    updateServerPlayerPosition(players)
    window.requestAnimationFrame(getDataForNextLoop)
}