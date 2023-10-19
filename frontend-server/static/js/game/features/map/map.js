import { createElement } from "../../../framework/src/domUtils.js"
import { MapID } from "../../socketReception.js"

let container = document.getElementById("main-container")

let path = "../../../../assets/map/"

const map = []
const all_type = []
const all_case = []
const all_block = []

class Type {
    constructor(data_type) {
        this.num = data_type[0]
        this.coll = data_type[1]
    }
}

class Case {
    constructor(x , y , type) {
        this.type = get_type(type)
        this.div = document.createElement("div")
        this.div.className = "background"
        this.div.style.backgroundImage = "url(" + path + MapID + "/" + type + ".png)"
        this.div.style.position = "absolute"
        this.div.style.left = x + "%"
        this.div.style.bottom = y + "%"
        this.div.style.height = "6.5%"
        this.div.style.width = "6.5%"
        this.div.style.imageRendering = "pixelated";
        this.div.style.backgroundSize = "100% 100%"
        container.appendChild(this.div)
    }
}

class Block {
    constructor(i) {
        this.div = document.createElement("div")
        this.div.className = "block"
        this.div.style.backgroundImage = "url(" + path + "/" + MapID + "/" + "block.png)"
        this.div.style.position = "absolute"
        this.div.style.left = all_case[i].div.style.left
        this.div.style.bottom = all_case[i].div.style.bottom
        this.div.style.height = "6.5%"
        this.div.style.width = "6.5%"
        this.div.style.imageRendering = "pixelated";
        this.div.style.backgroundSize = "100% 100%"
        container.appendChild(this.div)
    }
}

export async function construct_map(nbrMap, blocks) {
    let temp = path + nbrMap
    await fetch(temp + "/map.json").then(response => {
        if (!response.ok) {
            throw new Error('don\'t exist, not ok');
        }
        return response.json();
    }).then(data => {
        data.type.forEach(element => {
            all_type.push(new Type(element))
        });
        data.map.forEach(element => {
            map.push(element)
        })
    })
    create_map(blocks)
}

function create_map(blocks) {
    let y = 80
    map.forEach(a =>{
        let x = 0
        a.split(" ").forEach(b =>{
            if (b != " ") {
                all_case.push(new Case(x , y , b))
                x += 6.5
            }
        })
        y -= 6.5
    }) 
    //console.log(all_case)
    pose_brick(blocks)
}

function pose_brick(block) {
    let i = 0
    block.forEach(a => {
        a.split(" ").forEach(b => {
            if (b == "1") {
                all_block.push(new Block(i))
            }
                i++
            })
    })
}

function get_type(type) {
  let res = ""
  all_type.forEach(a => {
      if (a.num == type || a.num == "rest" && res == "") {
          res = a
      }
  })
  return res
}