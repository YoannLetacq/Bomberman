import { sendToServer, userData } from "../../../main.js";

class Player {
    constructor(x, y, name, color, container) {
        this.div = document.createElement("div");
        this.div.id = name;
        this.div.className = "player";
        this.div.style.position = "absolute";
        this.div.style.left = x + "%";
        this.div.style.bottom = y + "%";
        this.div.style.backgroundColor = color;
        container.appendChild(this.div);
        
        // Initialiser les attributs data-translateX et data-translateY à 0
        this.div.setAttribute('data-translateX', '0');
        this.div.setAttribute('data-translateY', '0');
    }
}

function updateXYPlayer(name, dir) {
    sendToServer({
        request: "updateXYPlayer",
        name: name,
        dir: dir
    })
}

export function updateServerPlayerPosition(players) {
    for (let name in players) {
        for (let dir in players[name]["currentmove"]) {
            if (players[name]["currentmove"][dir]) {
                console.log(players[name]["name"], players[name]["x"], players[name]["y"])
                updateXYPlayer(name, dir)
            }
        }
    }
}

export function movePlayer(player) {
    if (document.getElementById(player["name"])) {
        let speed = 0.001;
        let joueur = document.getElementById(player["name"]);

        // Accédez directement à player["x"] et player["y"]
        let x = player["x"] * (speed * userData.innerWidth);
        let y = player["y"] * ((speed * userData.innerHeight) + ((speed * userData.innerWidth)/2));

        setPosition(joueur, x, y);
    }
}

function setPosition(elem, x, y) {
    elem.style.transform = `translate(${x}px, ${y}px)`;
}

export function addPlayerToMap(PValue, container) {
    return new Player(PValue["startx"], PValue["starty"], PValue["name"], PValue["color"], container)
}