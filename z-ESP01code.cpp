#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>
#include <Adafruit_NeoPixel.h>

#define LED_PIN 2
#define NUMPIXELS 8 // number of NeoPixels you are using

Adafruit_NeoPixel pixels(NUMPIXELS, LED_PIN, NEO_GRB + NEO_KHZ800);

ESP8266WebServer server(80);

const char* ssid = "ThisIsAVirus";
const char* password = "Kelly.Aniks.1629";

IPAddress staticIP(192, 168, 86, 101);  // ESP static ip
IPAddress gateway(192, 168, 86, 1);   // IP Address of your WiFi Router (Gateway)
IPAddress subnet(255, 255, 255, 0);  // Subnet mask

void setup(void){
  Serial.begin(115200);
  WiFi.mode(WIFI_STA);
  WiFi.config(staticIP, gateway, subnet); // Assign static IP details 
  WiFi.begin(ssid, password);
  delay(1000); // Give connection some time to start

  

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.println(".");
  }

  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println ( "" );
  Serial.print ( "Connected to " );
  Serial.println ( ssid );
  Serial.print ( "IP address: " );
  Serial.println ( WiFi.localIP() );
  
  pixels.begin();
  pixels.show();

  server.on("/led/color", HTTP_GET, [](){
    
    String redParam = server.arg("r");
    String greenParam = server.arg("g");
    String blueParam = server.arg("b");
    Serial.println("");
    Serial.println("Get request received");
    Serial.print("Red:");
    Serial.println(redParam);
    Serial.print("Green:");
    Serial.println(greenParam);
    Serial.print("Blue:");
    Serial.println(blueParam);
    
    int r = redParam.toInt();
    int g = greenParam.toInt();
    int b = blueParam.toInt();

    pixels.setPixelColor(0, pixels.Color(r,g,b));
    pixels.show();

    server.send(200, "text/plain", "LED color updated on Objective Marker 1");
  });

  server.begin();
  Serial.println("HTTP server started");
}

void loop(void){
  server.handleClient();
}