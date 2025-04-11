#include "DHT.h" // incluie uma biblioteca externa

#define TIPO_SENSOR DHT11 // define o tipo de sensor
const int PINO_SENSOR_DHT11 = A1; // define a entrada analogica
const int PINO_SENSOR_TEMPERATURA = A2; // define a entrada analogica
float temperaturaCelsius;

//Paramentros de Maxima e Minimo de Umidade e Temeperatura
float tempMax = 30;
float tempMin = 25;
float umidMax = 60;
float umidMin = 40;

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
    //Serial.print("UmidadeMax:");
    //Serial.print(umidMax);
    //Serial.print(" ");

    // Serial.print("Umidade:");
    Serial.print(umidade); // Vai exibir o valor da variável "umidade"
    // Serial.print(" ");

    // Serial.print("UmidadeMin:");
    // Serial.print(umidMin);
    // Serial.print(" ");

    // Serial.print("TemperaturaMax:");
    // Serial.print(tempMax);
    Serial.print(";");

    // Serial.print("Temperatura:");
    Serial.println(temperaturaCelsius); // Vai exibir o valor da variáve temperaturaCelsius
    // Serial.print(" ");

    // Serial.print("TemperaturaMin:");
    // Serial.print(tempMin);
    // Serial.println(" ");
  }

  delay(1000); // Aplica um tempo antes de repetir o loop.
}
