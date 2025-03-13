#include "DHT.h" // incluie uma biblioteca externa

#define TIPO_SENSOR DHT11 // define o tipo de sensor
const int PINO_SENSOR_DHT11 = A0; // define a entrada analogica
const int PINO_SENSOR_TEMPERATURA = A1; // define a entrada analogica
float temperaturaCelsius;

DHT sensorDHT(PINO_SENSOR_DHT11, TIPO_SENSOR); // referencia as duas variaveis a qual definil as portas analogicas

void setup() { // define a velocidade de comunicação
  Serial.begin(9600);
  sensorDHT.begin();
}

void loop() {
  float umidade = sensorDHT.readHumidity();
  int valorLeitura = analogRead(PINO_SENSOR_TEMPERATURA); // Declarando uma variável que pera o valor
  temperaturaCelsius = (valorLeitura * 5.0 / 1023.0) / 0.01; // fórmula para ter a temperatura em Graus Celsius


  if(isnan(umidade)) {
    Serial.println("Erro ao ler os dados sensor"); // Vai exibir a mensagem de erro caso não consiga ler os dados e umidade
  } else {
    Serial.print("Umidade: "); // Vai mostrar a mensagem "Umidade" para o usuário caso consiga ler os dados da variavel umidade
    Serial.print(umidade); // Vai exibir o valor da variável "umidade"
    Serial.print(" % "); // Vai exibir o texto "%" após o valor da variável
    Serial.print("Temperatura: "); // Vai exibir o texto "Temperatura:"
    Serial.print(temperaturaCelsius); // Vai exibir o valor da variáve temperaturaCelsius
    Serial.println(" °C"); // Vai exibir o texto " ºC";
  }

  delay(2000); // Aplica um tempo antes de repetir o loop.
}
