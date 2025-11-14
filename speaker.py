import requests
import asyncio
import websockets
import json
import os

ORION_ADDRESS = os.getenv("ORION_ADDRS", 'orion')
ORION_PORT = int(os.getenv("ORION_PORT", 1026))
SERVER_WEBSOCKET_ADDRESS = os.getenv(" WEBSOCKET_SERVER", 'websocket-server')
SERVER_WEBSOCKET_PORT = int(os.getenv(" WEBSOCKET_PORT",8765))
ID = 'urn:ngsi-ld:Bracelet:001'


async def getBpm():
    url = f'http://{ORION_ADDRESS}:{ORION_PORT}/v2/entities/{ID}/attrs/bpm'

    headers = {
        "fiware-service" : "smart",
        "fiware-servicepath" : "/",
        "accept": "application/json"
    }

    response =  requests.get(url, headers=headers)
    
    try:
        data = response.json()
        bpm = data['value']
        return bpm
    except Exception as e:
        print(f"Erro ao obter dados ({response.status_code}) : {e}")
        return []

async def makeWaring(bpm):
    if not bpm: 
        print("não á mensagenes")
        return

    value = "normal"
    message = ""
    
    if bpm >= 80 and bpm <= 100:
        value = "stop"
        message = "Observamos que você está muito ansioso, faça uma pausa"
    elif bpm >= 100:
        value = 'break'
        message = "Batimentos altos, avise alguém próximo a você"
    
    return json.dumps({"dataType" : "bracelet", "value": value,  "message" : message, "bpm" : bpm})

async def run_speaker():
    uri = f"ws://{SERVER_WEBSOCKET_ADDRESS}:{SERVER_WEBSOCKET_PORT}"
    async with websockets.connect(uri) as websocket:
        registration_msg = json.dumps({"type": "speaker"})
        await websocket.send(registration_msg)
        print("Registrado como Speaker.")

        bpm = await getBpm()
        message = await makeWaring(bpm)
        await websocket.send(message)
        print(f"Enviado: {message}")
        await asyncio.sleep(2)

if __name__ == "__main__":
    asyncio.run(run_speaker())
