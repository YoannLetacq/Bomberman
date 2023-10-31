import { all_case } from "../map/map.js";

export function collision(dir,username,players) {
        console.log(dir)
        let player = document.getElementById(username)
        let speed = 0.15;
        let x = Number(player.style.left.replace("%" , "")) + 2.75
        let y = Number(player.style.bottom.replace("%" , "")) + 7
        let x_move = false
        let res = false
                switch (dir) {
                        case "left":{
                                x -= (2.75 + speed)
                                x_move = true
                                break  
                        }
                        case "right":{
                                x += (2.75 + speed)
                                x_move = true
                                break  
                        }
                        case "up":{
                                y += (2.75 + speed)
                                break  
                        }
                        case "down":{
                                y -= (2.75 + speed)
                                break  
                        }
                }
        var i 
        if (x_move) {
                i = ((13 - Math.floor((y-2)/6.5))*15) + (Math.floor(x/6.5))
        } else {
                i = ((13 - Math.floor(y/6.5))*15) + (Math.floor((x-2.75)/6.5))
        }
                                if ((all_case[i].brick != null && !all_case[i].brick.break) || all_case[i].type.coll == "wall") {
                                        res = true
                                } 
        if (x_move) {
                i = ((13 - Math.floor((y+2.75)/6.5))*15) + (Math.floor(x/6.5))
        } else {
                i = ((13 - Math.floor(y/6.5))*15) + (Math.floor((x+2)/6.5))
        }
        if ((all_case[i].brick != null && !all_case[i].brick.break) || all_case[i].type.coll == "wall") {
                res = true
        } 
        

        /*for (let i = 0 ; i < all_case.length;i++) {
                let x_case = all_case[i].div.style.left.replace("%" , "")
                let y_case = all_case[i].div.style.bottom.replace("%" , "")
                if ((((x > x_case && x < x_case + 6.5) || (x + 5.5 > x_case && x + 5.5 < x_case + 6.5)) )&&
                        (((y < y_case && y > y_case - 6.5) || (y - 5.5 < y_case && y - 5.5 > y_case - 6.5)))) {
                                if ((all_case[i].brick != null && all_case[i].brick.break) || all_case[i].type.coll == "wall") {
                                        console.log(x,y,"   ",x_case,y_case)
                                        return true
                                } else {
                                        return false
                                }
                        } 
        }*/
        return res
}
 