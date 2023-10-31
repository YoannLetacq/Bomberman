package game

import (
	"encoding/json"

	dataStruct "backend/data"

	"golang.org/x/net/websocket"
)

func HandleWSGame(data []byte, ws *websocket.Conn) {
	// Decode the received data into a known structure.
	trueData, data := GetData(data)

	switch trueData.Request {

	case "getPlayersData":
		{
			SendInfoForGame()
			break
		}
	case "updateXYPlayer":
		{
			var trueData dataStruct.UpdateXYPlayer
			json.Unmarshal(data, &trueData)

			switch trueData.Dir {
			case "up":
				{
					LobbyPlayers[trueData.Name].Y += 0.1
					break
				}
			case "down":
				{
					LobbyPlayers[trueData.Name].Y -= 0.1
					break
				}
			case "right":
				{
					LobbyPlayers[trueData.Name].X += 0.1
					break
				}
			case "left":
				{
					LobbyPlayers[trueData.Name].X -= 0.1
					break
				}
			}

			break
		}

	case "StartMove":
		{
			var trueData dataStruct.MovePlayer
			json.Unmarshal(data, &trueData)
			switch trueData.Value {
			case "Up":
				{
					LobbyPlayers[trueData.Name].CurrentMove.Up = true
					break
				}
			case "Down":
				{
					LobbyPlayers[trueData.Name].CurrentMove.Down = true
					break
				}
			case "Left":
				{
					LobbyPlayers[trueData.Name].CurrentMove.Left = true
					break
				}
			case "Right":
				{
					LobbyPlayers[trueData.Name].CurrentMove.Right = true
					break
				}
			}
			break
		}

	case "EndMove":
		{
			var trueData dataStruct.MovePlayer
			json.Unmarshal(data, &trueData)
			switch trueData.Value {
			case "Up":
				{
					LobbyPlayers[trueData.Name].CurrentMove.Up = false
				}
			case "Down":
				{
					LobbyPlayers[trueData.Name].CurrentMove.Down = false
				}
			case "Left":
				{
					LobbyPlayers[trueData.Name].CurrentMove.Left = false
				}
			case "Right":
				{
					LobbyPlayers[trueData.Name].CurrentMove.Right = false
				}
			}
			break
		}

	}
}

func SendInfoForGame() {
	toSend, _ := json.Marshal(dataStruct.AllPlayer{
		Request: "allPlayers",
		Players: LobbyPlayers,
	})

	for _, player := range LobbyPlayers {
		player.Socket.Write(toSend)
	}
}
