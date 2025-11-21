# Importação das bibliotecas necessárias
import requests  # Para fazer requisições HTTP
import asyncio   # Para programação assíncrona
import websockets # Para conexões WebSocket
import json      # Para manipulação de dados JSON
import os        # Para acessar variáveis de ambiente

# Configuração de endereços e portas a partir de variáveis de ambiente, com valores padrão
ORION_ADDRESS = os.getenv("ORION_ADDRS", 'orion')  # Endereço do Orion Context Broker
ORION_PORT = int(os.getenv("ORION_PORT", 1026))    # Porta do Orion Context Broker
SERVER_WEBSOCKET_ADDRESS = os.getenv(" WEBSOCKET_SERVER", 'websocket-server')  # Endereço do servidor WebSocket
SERVER_WEBSOCKET_PORT = int(os.getenv(" WEBSOCKET_PORT", 8765))  # Porta do servidor WebSocket
ID = 'urn:ngsi-ld:Bracelet:001'  # ID único do dispositivo bracelet no contexto FIWARE

# Função para obter o valor de BPM (batimentos por minuto) do Orion Context Broker
def getBpm():
    # Constrói a URL para buscar o atributo 'bpm' da entidade específica
    url = f'http://{ORION_ADDRESS}:{ORION_PORT}/v2/entities/{ID}/attrs/bpm'

    # Headers necessários para a requisição FIWARE
    headers = {
        "fiware-service" : "smart",       # Serviço FIWARE
        "fiware-servicepath" : "/",       # Caminho do serviço
        "accept": "application/json"      # Tipo de conteúdo aceito
    }

    # Tenta fazer a requisição e processar a resposta
    try:
        response =  requests.get(url, headers=headers)  # Faz a requisição GET
        data = response.json()            # Converte a resposta para JSON
        bpm = data['value']               # Extrai o valor do BPM
        return bpm                        # Retorna o valor do BPM
    except Exception as e:
        # Em caso de erro, imprime mensagem e retorna lista vazia
        print(f"Erro ao obter dados ({response.status_code}) : {e}")
        return []

# Função assíncrona para criar mensagens de alerta baseadas no BPM
async def makeWaring(bpm):
    # Verifica se o BPM é None (sem dados)
    if bpm is None: 
        print("não á mensagenes")
        return None

    # Tenta converter o BPM para inteiro
    try: 
        bpm_value = int(bpm)
    except (TypeError, ValueError):
        # Se a conversão falhar, imprime mensagem de erro
        print(f"Valor de BPM inválido: {bpm}")

    # Valores iniciais padrão (sem alerta)
    value = True      # True significa "sem problema"
    message = ""      # Mensagem vazia
    
    # Lógica de determinação de alertas baseada no BPM
    if bpm >= 80 and bpm <= 100:
        value = False  # False significa "há problema"
        message = "Observamos que você está muito ansioso, faça uma pausa"
    elif bpm > 100:
        value = False  # False significa "há problema"
        message = "Batimentos altos, avise alguém próximo a você"
    
    # Retorna a mensagem formatada como JSON
    return json.dumps({
        "dataType" : "bracelet",   # Tipo de dados
        "value": value,            # Status (True/False)
        "message" : message,       # Mensagem de alerta
        "bpm" : bpm_value          # Valor do BPM
    })

# Função principal assíncrona que gerencia o speaker
async def run_speaker():
    # Constrói a URI do WebSocket
    uri = f"ws://{SERVER_WEBSOCKET_ADDRESS}:{SERVER_WEBSOCKET_PORT}"
    
    try:
        # Estabelece conexão WebSocket
        async with websockets.connect(uri) as websocket:
            # Mensagem de registro como speaker
            registration_msg = json.dumps({"type": "speaker"})
            await websocket.send(registration_msg)
            print("Registrado como Speaker.")

            # Loop principal de execução
            while True:
                # Obtém o BPM atual (executado em thread separada para não bloquear)
                bpm = await asyncio.get_event_loop().run_in_executor(None, getBpm)

                # Se obteve BPM com sucesso
                if bpm is not None: 
                    # Cria mensagem de alerta baseada no BPM
                    message = await makeWaring(bpm)
                    if message: 
                        # Envia a mensagem via WebSocket
                        await websocket.send(message)
                        print(f"Enviado: {message}")
                else:
                    # Se não conseguiu obter BPM
                    print("Não foi possivel obeter BPM")

                # Aguarda 2 segundos antes da próxima iteração
                await asyncio.sleep(2)

    # Tratamento de exceções específicas do WebSocket
    except websockets.exceptions.ConnectionClosed: 
        print("Conexão WebSocket fechada")
    except Exception as e: 
        print(f"Erro inesperado: {e}")

# Ponto de entrada do programa
if __name__ == "__main__":
    print("Iniciando Speaker")
    # Executa a função principal de forma assíncrona
    asyncio.run(run_speaker())