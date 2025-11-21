# Importação das bibliotecas necessárias
import asyncio       # Para programação assíncrona
import websockets    # Para criar e gerenciar servidor WebSocket
import json          # Para manipulação de dados JSON
import os            # Para acessar variáveis de ambiente

# Configuração do servidor WebSocket a partir de variáveis de ambiente, com valores padrão
SERVER_WEBSOCKET_ADDRESS = os.getenv(" WEBSOCKET_SERVER", 'websocket-server')  # Endereço do servidor
SERVER_WEBSOCKET_PORT = int(os.getenv(" WEBSOCKET_PORT", 8765))  # Porta do servidor

# Conjuntos para armazenar as conexões ativas dos clientes
SPEAKERS = set()   # Armazena todos os clientes do tipo "speaker" (emissores)
LISTENERS = set()  # Armazena todos os clientes do tipo "listener" (receptores)

# Função para registrar um novo cliente no servidor
async def register(websocket, client_type):
    # Verifica o tipo de cliente e adiciona ao conjunto correspondente
    if client_type == 'speaker':
        SPEAKERS.add(websocket)
        print(f"Speaker registrado: {websocket.remote_address}")
    elif client_type == "listener":
        LISTENERS.add(websocket)
        print(f"Listener registrado: {websocket.remote_address}")
    else:
        # Se o tipo for inválido, envia mensagem de erro e fecha conexão
        await websocket.send(json.dumps({"status": "error", "message": "Tipo de cliente inválido"}))
        await websocket.close()
        return False
    return True

# Função para remover um cliente dos conjuntos quando desconecta
async def unregister(websocket):
    if websocket in SPEAKERS:
        SPEAKERS.remove(websocket)
        print(f"Speaker desconectado: {websocket.remote_address}")
    elif websocket in LISTENERS:
        LISTENERS.remove(websocket)
        print(f"Listener desconectado: {websocket.remote_address}")

# Função para enviar mensagens para todos os listeners conectados
async def notify_listeners(message):
    # Verifica se há listeners conectados
    if LISTENERS:
        # Itera sobre uma cópia do conjunto para evitar problemas durante modificações
        for websocket in set(LISTENERS):
            try:
                # Envia a mensagem para o listener
                await websocket.send(message)
            except websockets.exceptions.ConnectionClosed:
                # Se a conexão foi fechada, remove o listener
                await unregister(websocket)
            except Exception as e:
                # Trata outros erros durante o envio
                print(f"Erro ao enviar para listener {websocket.remote_address}: {e}")

# Handler principal que gerencia a comunicação com cada cliente
async def handler(websocket):
    try: 
        # Recebe a mensagem de registro do cliente
        registration_message_str = await websocket.recv()
        # Converte a mensagem JSON para objeto Python
        registration_data = json.loads(registration_message_str)

        # Obtém o tipo de cliente (speaker ou listener)
        client_type = registration_data.get('type')

        # Registra o cliente - se falhar, encerra a conexão
        if not await register(websocket, client_type):
            return
        
        # Loop para receber mensagens subsequentes do cliente
        async for message in websocket:
            if client_type == "speaker":
                # Se for um speaker, repete a mensagem para todos os listeners
                print(f"Speaker {websocket.remote_address} enviou dados. Notificando listeners...")
                await notify_listeners(message)
            elif client_type == "listener":
                # Listeners só recebem mensagens, não enviam (mensagens são ignoradas)
                print(f"Listener {websocket.remote_address} enviou uma mensagem (ignorado, listeners só escutam)")
    
    # Tratamento de exceções específicas
    except websockets.exceptions.ConnectionClosed:
        # Conexão foi fechada pelo cliente
        pass
    except json.JSONDecodeError:
        # Erro ao decodificar JSON da mensagem de registro
        print(f"Erro ao decodificar JSON de {websocket.remote_address}. Fechando conexão")
    except Exception as e:
        # Erro genérico não esperado
        print(f"Erro inesperado no handler principal: {e}")
    finally:
        # Sempre executa: remove o cliente dos conjuntos ao desconectar
        await unregister(websocket)

# Função principal que inicia o servidor
async def main():
    # Cria e inicia o servidor WebSocket
    async with websockets.serve(handler, SERVER_WEBSOCKET_ADDRESS, SERVER_WEBSOCKET_PORT):
        # Mantém o servidor rodando indefinidamente
        await asyncio.Future()

# Ponto de entrada do programa
if __name__ == "__main__":
    # Inicia o servidor WebSocket
    asyncio.run(main())