import { modifyUrlGame } from "../game/features/routes.js";
import { addPlayerToMap } from "./features/player/player.js";
import { initControls } from "./features/control/control.js";
import { gameLoop } from "./features/gameLoop/gameLoop.js";
//import { movePlayer } from "./features/player/player.js";
import { userData } from "../main.js";


export var MapID = ""

const app = document.getElementById("main-container")

export function socketReceptionGame(data, ip) {
    //console.log(data)
    switch (data["request"]){
        case "GoToGame": {
            MapID = data["mapid"]
            modifyUrlGame("Game", "/game", ip, data)
            break
        }

        case "createNewPlayer": {
            addPlayerToMap(data["player"], app)
            break
        }

        case "LaunchGame": {
            gameLoop()
            initControls(userData.username)
            break
        }
        case "MovePlayer": {
            movePlayer(data["name"], data["value"])
            break
        }
        //case 
    }
}