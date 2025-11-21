# GLOBAL SOLUTION - Arandu
## 👥 **Desenvolvido Por**
| Nome | RM |
|------|----|
| Carlos Eduardo Sanches Mariano | 561756 |
| Vitor Ramos de Farias | 561958 |

## 💡 **Contexto e Problema**
O futuro do trabalho já começou. Tecnologias como Inteligência Artificial, robótica e automação estão transformando profissões e criando desafios inéditos. Ao mesmo tempo, mudanças sociais, demográficas e ambientais estão redesenhando a forma como vivemos, trabalhamos e nos relacionamos.

## 🎯 **Objetivo**
Criar uma solução inovadora com Esp32, simulada no Wokwi, que demostre, de forma prática, como a tecnologia pode transformar o trabalho, a educação e o bem-estar humano em um futuro cada vez mais digital e automamizado.

### **Solução Proposta**
Sistema de monitoramento de batimentos cardíacos utilizando um dispositivo Esp32 simulado no Wokwi. O sistema lê os batimentos cardíacos através de um potênciometro, envia os dados para um servidor backend via MQTT, e utiliza WebSocket para exibir os dados em tempo real em um frontend. Caso os batimentos cardíacos ultrapassem um limite pré-definido, o sistema bloqueia automaticamente a tela do computador, simulando uma situação de estresse.

## 📝 **Funcionalidades Principais**
- **Leitura de Batimentos Cardíacos:** Simulação da leitura de batimentos cardíacos utilizando um potênciometro.
- **Monitoramento em Tempo Real:** Exibição dos dados de batimentos cardíacos em tempo real por WebSocket.
- **Bloqueio de Tela Automático:** Bloqueio automático da tela do computador quando os batimentos cardíacos ultrapassam um limite pré-definido, simulando uma situação de estresse.
- **WebSocket em Python:** Comunicação em tempo real entre o dispositivo simulado e o servidor backend utilizando WebSocket.

---

## ⚙️ **Arquitetura do Sistema**

### 🔄 **Estrutura de pastas:**
- device/ -> código do dispositivo simulado no Wokwi
  - esp32_bpm.ino -> código do Esp32 para leitura e envio dos batimentos cardíacos via MQTT
- backend/ -> código do servidor backend
- fiware/ -> código do servidor Fiware
  - docker-compose.yml -> configuração do ambiente Fiware
  -  server.py -> servidor websocket em Python
  -  speaker.py -> coleta e tratamento de dados do broker MQTT
- frontend/ -> código do cliente frontend
  - src/
    - Routes.jsx -> conexão com o servidor websocket

### 🏗️ **Tecnologias Utilizadas**
- **Ino:** Linguagem de programação utilizada para o desenvolvimento do código do Esp32.
- **Python:** Linguagem de programação utilizada para o desenvolvimento do servidor backend e comunicação via WebSocket.
- **JavaScript:** Linguagem de programação utilizada para o desenvolvimento do frontend da aplicação.
- **MQTT:** Protocolo de mensagens utilizado para comunicação entre o dispositivo simulado e o servidor backend.
- **WebSocket:** Protocolo de comunicação em tempo real utilizado para transmitir os dados dos batimentos cardíacos para o frontend.
- **Docker:** Plataforma utilizada para containerização do ambiente Fiware.
- **React:** Biblioteca JavaScript utilizada para construção da interface do usuário no frontend.

---
## **Como Funciona o Sistema**
1. O dispositivo Esp32 simulado no Wokwi lê os batimentos cardíacos através de um potênciometro.
2. Os dados dos batimentos cardíacos são enviados para o servidor backend via MQTT pelo tópico /TEF/bracelet001/attrs/bpm.
3. O iotagents do Fiware e disponibiliza para o Orion.
4. O servidor backend em Python pega os dados do Orion trata e envia para o frontend via WebSockets.
5. O frontend exibe os dados dos batimentos cardíacos em tempo real.
6. Se os batimentos cardíacos ultrapassarem um limite pré-definido, o sistema bloqueia automaticamente a tela do computador, simulando uma situação de estresse.
7. O usuário pode então visualizar seus batimentos cardíacos em tempo real e entender como o sistema reage a situações de estresse.

se preferir, veja nosso vídeo no YouTube explicando o projeto: [YouTube - Global Solution Arandu](https://youtu.be/XYZ12345678)
---

## 🛠️ **Como Executar**

### **Pré-requisitos**
- Npm instalado na máquina
- Ide de sua preferência (VSCode recomendado)
- Maquina virtual com Docker (para o Fiware) ou Servidor em nuvem com Docker

### **🚀 Execução do Servidor**
- Clone o repositório:
  ```bash
  git clone
  ```
- Acesse a pasta `fiware` no terminal:
  ```bash
  cd fiware
  ```
- Inicie o ambiente Fiware com Docker:
  ```bash
  docker-compose up -d
  ```

### **🌐 Execução do Frontend**
- Na Vm, no desktop ou no servidor em nuvem, acesse a pasta `frontend` no terminal:
  ```bash
  cd frontend
  ```
- Instale as dependências do projeto:
  ```bash
  npm install
  ```
- Inicie o servidor de desenvolvimento:
  ```bash
  npm run dev
  ```
### **Esp32 Simulado no Wokwi**
- Acesse o link do projeto Wokwi: [Wokwi Esp32 BPM](https://wokwi.com/projects/447359655560184833)
- Clique em "Start Simulation" para iniciar a simulação do dispositivo Esp32.

> LEMBRETE : O wokwi só se conecta em brokers em nuvem, então certifique-se de que o Fiware está rodando em uma máquina virtual ou servidor em nuvem acessível.

### **Acesse a aplicação**
- Abra o navegador e acesse o endereço:
  ```
  http://localhost:5173
  ```
 teste a aplicação e visualize os dados de batimentos cardíacos em tempo real.
---

*Sistema desenvolvido para a Global Solution 2°semestre, 2025*  
