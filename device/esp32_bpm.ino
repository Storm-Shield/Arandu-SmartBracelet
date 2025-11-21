/*
    ====================================
    The future at work - Arandu Smart-Bracelet
    ====================================
*/

// Inclusão das bibliotecas necessárias
#include <WiFi.h>           // Para conexão WiFi
#include <PubSubClient.h>   // Para comunicação MQTT

// Definição do pino do sensor
#define MAX 33  // Pino onde o sensor de batimentos cardíacos está conectado

// Configurações de rede WiFi
const char* SSID = "Wokwi-GUEST";    // Nome da rede WiFi
const char* PASSWORD = "";           // Senha da rede WiFi (vazia para Wokwi)

// Configurações do broker MQTT
const char* BROKER_MQTT = "44.223.43.74";  // Endereço IP do broker MQTT
const int BROKER_PORT = 1883;              // Porta do broker MQTT

// Tópicos MQTT e identificação
const char* TOPIC_MAX = "/TEF/bracelet001/attrs/bpm";  // Tópico para publicar BPM
const char* ID_MQTT = "aranduServer";                  // ID do cliente MQTT

// Objetos para WiFi e MQTT
WiFiClient deviceClient;        // Cliente WiFi
PubSubClient MQTT(deviceClient); // Cliente MQTT usando o cliente WiFi

// Função para inicializar a conexão WiFi
void initWiFi(){
    /* Initialize WiFi connection */
    delay(10);
    Serial.println("------ WiFi Connection ------");
    Serial.print("Connecting to network: ");
    Serial.println(SSID);
    Serial.print("Please wait");
    reconnectWiFi();  // Chama função para reconectar WiFi
}

// Função para reconectar ao WiFi se necessário
void reconnectWiFi(){
    // Verifica se já está conectado
    if (WiFi.status() == WL_CONNECTED)
        return;
    
    // Inicia conexão WiFi
    WiFi.begin(SSID, PASSWORD);
    
    // Aguarda até conectar
    while(WiFi.status() != WL_CONNECTED){
        delay(100);
        Serial.print(".");
    }
    
    // Exibe informações da conexão estabelecida
    Serial.println();
    Serial.println("Successfully connected!");
    Serial.print("Network: ");
    Serial.println(SSID);
    Serial.print("Obtained IP: ");
    Serial.println(WiFi.localIP());
}

// Função para configurar o cliente MQTT
void initMQTT(){
    /* Configure MQTT client settings */
    MQTT.setServer(BROKER_MQTT, BROKER_PORT);  // Define servidor e porta MQTT
}

// Função de setup (executada uma vez ao iniciar)
void setup() {
    pinMode(MAX, INPUT);     // Configura pino do sensor como entrada
    Serial.begin(115200);    // Inicia comunicação serial com baud rate 115200
    initWiFi();              // Inicializa conexão WiFi
    initMQTT();              // Inicializa cliente MQTT
    delay(500);              // Aguarda 500ms para estabilização
}

// Loop principal (executado repetidamente)
void loop() {
    checkConnections();  // Verifica e mantém conexões WiFi e MQTT
    getHearBeats();      // Lê e publica os batimentos cardíacos
    MQTT.loop();         // Mantém a comunicação MQTT ativa
    delay(500);          // Aguarda 500ms entre leituras
}

// Função para verificar e reconectar se necessário
void checkConnections(){
    /* Verify and reconnect WiFi and MQTT connections */
    if(!MQTT.connected())
        reconnectMQTT();  // Reconecta MQTT se desconectado
    reconnectWiFi();      // Verifica e reconecta WiFi se necessário
}

// Função para reconectar ao broker MQTT
void reconnectMQTT(){
    /* Reconnect to MQTT broker if connection is lost */
    while(!MQTT.connected()){
        Serial.print("* Trying to connect to MQTT Broker: ");
        Serial.println(BROKER_MQTT);

        // Tenta conectar ao broker
        if (MQTT.connect(ID_MQTT)){
            Serial.println("Successfully connected to MQTT broker!");
        } else {
            // Se falhar, aguarda antes de tentar novamente
            Serial.println("Failed to reconnect to broker.");
            Serial.println("New connection attempt in 2 seconds");
            delay(2000);
        }
    }
}

// Função para ler e publicar os batimentos cardíacos
void getHearBeats(){
    // Lê valor analógico do sensor (0-4095 para ESP32)
    int analogValue = analogRead(MAX);
    
    // Mapeia o valor analógico para uma faixa de BPM (60-105)
    int bpm = map(analogValue, 0, 4095, 60, 105);
    
    // Verifica se houve erro na leitura
    if (bpm < 0){
        Serial.println("Erro to read bpm");
    }

    // Publica o valor do BPM no broker MQTT
    MQTT.publish(TOPIC_MAX, String(bpm).c_str());
    
    // Exibe o valor no monitor serial
    Serial.print("Dados enviados ao broker: ");
    Serial.println(bpm);
}