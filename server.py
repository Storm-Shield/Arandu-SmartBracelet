import asyncio
import websockets
import json
import os

SERVER_WEBSOCKET_ADDRESS = os.getenv(" WEBSOCKET_SERVER", 'websocket-server')
SERVER_WEBSOCKET_PORT = int(os.getenv(" WEBSOCKET_PORT",8765))

SPEAKERS = set()
LISTENERS = set()

async def register(websocket, client_type):
    if client_type == 'speaker':
        SPEAKERS.add(websocket)
        print(f"Speaker registrado: {websocket.remote_address}")
    elif client_type == "listener":
        LISTENERS.add(websocket)
        print(f"Listener registrado: {websocket.remote_address}")
    else:
        await websocket.send(json.dumps({"status": "error", "message": "Tipo de cliente inválido"}))
        await websocket.close()
        return False
    return True

async def unregister(websocket):
    if websocket in SPEAKERS:
        SPEAKERS.remove(websocket)
        print(f"Speaker desconectado: {websocket.remote_address}")
    elif websocket in LISTENERS:
        LISTENERS.remove(websocket)
        print(f"Listener desconectado: {websocket.remote_address}")

async def notify_listeners(message):
    if LISTENERS:
        for websocket in set(LISTENERS):
            try:
                await websocket.send(message)
            except websockets.exceptions.ConnectionClosed:
                await unregister(websocket)
            except Exception as e:
                print(f"Erro ao enviar para listener {websocket.remote_address}: {e}")

async def handler(websocket):
    try: 
        registration_message_str = await websocket.recv()
        registration_data = json.loads(registration_message_str)

        client_type = registration_data.get('type')

        if not await register(websocket, client_type):
            return
        
        async for message in websocket:
            if client_type == "speaker":
                print(f"Speaker {websocket.remote_address} enviou dados. Notificando listeners...")
                await notify_listeners(message)
            elif client_type == "listener":
                print(f"Listener {websocket.remote_address} enviou uma mensagem (ignorado, listeners sEó ouver)")
    except websockets.exceptions.ConnectionClosed:
        pass
    except json.JSONDecodeError:
        print(f"Erro ao decodificar JSON de {websocket.remote_address}. Fechando conexão")
    except Exception as e:
        print(f"Erro inesperado no handler principal: {e}")
    finally:
        await unregister(websocket)

async def main():
    async with websockets.serve(handler, SERVER_WEBSOCKET_ADDRESS, SERVER_WEBSOCKET_PORT):
        await asyncio.Future()

if __name__ == "__main__":
    asyncio.run(main())