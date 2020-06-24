#include "FastLED.h"
#define NUM_LEDS 8
#include <MPU6050_tockn.h>
#include <DFRobot_QMC5883.h>

MPU6050 mpu6050(Wire);
DFRobot_QMC5883 compass;

//Jet gradient ranges.
CRGB leds[NUM_LEDS];
DEFINE_GRADIENT_PALETTE( heatmap_gp ) {
  0,     0,  0,  255, 
  67,   0,  255,  255,   
  128,   0, 255, 0,
  255,   252, 0, 0
};
CRGBPalette16 myPal = heatmap_gp;


// button pin declerations.
char buttonPin1 = 53;
char buttonPin2 = 51;
char buttonPin3 = 49;
char buttonPin4 = 47;
char buttonPin5 = 45;
char buttonPin6 = 43;
char buttonPin7 = 41;
char buttonPin8 = 39;
char buttonPin9 = 37;
char buttonPin10 = 35;
char buttonPin11 = 33;
char buttonPin12 = 31;
char buttonPin13 = 29;

// button states set to pull up
char buttonState1 = LOW;
char buttonState2 = LOW;
char buttonState3 = LOW;
char buttonState4 = LOW;
char buttonState5 = LOW;
char buttonState6 = LOW;
char buttonState7 = LOW;
char buttonState8 = LOW;
char buttonState9 = LOW;
char buttonState10 = LOW;
char buttonState11 = LOW;
char buttonState12 = LOW;
char buttonState13 = LOW;

// debounce timings.
unsigned long lastDebounceTime = 0;
unsigned long debounceDelay = 320;


// stuffs.
String input;
int analogPin = A8;
int val = 0;
char charBuf[10];
int brightness = 255;
int count = 0;
int colorValue = 0;
unsigned long batteyInterval;


void setup() {
  Serial.begin(115200);

  //Accelerometer setup
  mpu6050.begin();
  mpu6050.calcGyroOffsets(false);

  //Digital compas setup // if this fails code will stuck.
  compass.setRange(QMC5883_RANGE_2GA);
  compass.setMeasurementMode(QMC5883_CONTINOUS);
  compass.setDataRate(QMC5883_DATARATE_50HZ);
  compass.setSamples(QMC5883_SAMPLES_8);
  
  //WS2812 setup // pin and led quantity
  FastLED.addLeds<NEOPIXEL, 7>(leds, NUM_LEDS);

  pinMode(buttonPin1, INPUT);
  pinMode(buttonPin2, INPUT);
  pinMode(buttonPin3, INPUT);
  pinMode(buttonPin4, INPUT);
  pinMode(buttonPin5, INPUT);
  pinMode(buttonPin6, INPUT);
  pinMode(buttonPin7, INPUT);
  pinMode(buttonPin8, INPUT);
  pinMode(buttonPin9, INPUT);
  pinMode(buttonPin10, INPUT);
  pinMode(buttonPin11, INPUT);
  pinMode(buttonPin12, INPUT);
  pinMode(buttonPin13, INPUT);

  // button states to high. pull up.
  digitalWrite(buttonPin1, HIGH);
  digitalWrite(buttonPin2, HIGH);
  digitalWrite(buttonPin3, HIGH);
  digitalWrite(buttonPin4, HIGH);
  digitalWrite(buttonPin5, HIGH);
  digitalWrite(buttonPin6, HIGH);
  digitalWrite(buttonPin7, HIGH);
  digitalWrite(buttonPin8, HIGH);
  digitalWrite(buttonPin9, HIGH);
  digitalWrite(buttonPin10, HIGH);
  digitalWrite(buttonPin11, HIGH);
  digitalWrite(buttonPin12, HIGH);
  digitalWrite(buttonPin13, HIGH);

  while (!compass.begin())
  {
    //Serial.println("Could not find a valid QMC5883 sensor, check wiring!");
    delay(500);
  }
}



void loop() {
  mpu6050.update();
  Vector norm = compass.readNormalize();
  float heading = atan2(norm.YAxis, norm.XAxis);
  float declinationAngle = (4.0 + (26.0 / 60.0)) / (180 / PI);
  heading += declinationAngle;

  if (heading < 0) {
    heading += 2 * PI;
  }

  if (heading > 2 * PI) {
    heading -= 2 * PI;
  }

  int headingDegrees = heading * 180 / PI;


  if (Serial.available()) {
    input = Serial.readStringUntil('\n');
    
    if (input.charAt(0) == 'Q') {
      val = analogRead(analogPin);
      int rec = val / 4;
      Serial.println("Q." + (String(val / 4)));
      colorValue = input.substring(1).toInt();
      //      leds[0] = CHSV(160 - map(colorValue, 0, 255, 0, 160), 255, 255);
      //      leds[1] = CHSV(160 - map(colorValue, 0, 255, 0, 160), 255, 255);
      //      leds[2] = CHSV(160 - map(colorValue, 0, 255, 0, 160), 255, 255);
      //      leds[3] = CHSV(160 - map(colorValue, 0, 255, 0, 160), 255, 255);
      //      leds[4] = CHSV(160 - map(colorValue, 0, 255, 0, 160), 255, 255);
      //      leds[5] = CHSV(160 - map(colorValue, 0, 255, 0, 160), 255, 255);
      //      leds[6] = CHSV(160 - map(colorValue, 0, 255, 0, 160), 255, 255);
      //      leds[7] = CHSV(160 - map(colorValue, 0, 255, 0, 160), 255, 255);

      for (int i = 0; i < NUM_LEDS; i++) {
        leds[i] = CHSV(160 - map(colorValue, 0, 255, 0, 160), 255, 60);
      }
      FastLED.show();
      input = ' ';
    }
    
    //MULTIPLE SENSOR
    if (input.charAt(0) == 'W') {
      val = analogRead(analogPin);
      int rec = val / 4;
      Serial.println("W." + String(abs((val + random(-2, 3))) / 4) + "." + String(abs((val + random(-2, 3))) / 4) + "." + String(abs((val + random(-2, 3))) / 4) + "." + String(abs((val + random(-2, 3))) / 4) );
      input = ' ';
    }

    if (input.charAt(0) == 'L') {
      val = analogRead(A9);
      int rec = map(val, 0, 700, 0, 180);
      Serial.println("J." + String(rec) + "#" + String(headingDegrees) + "#" + (int)mpu6050.getAngleY());
      input = ' ';
    }

    if (input.charAt(0) == 'J') {
      val = int(analogRead(analogPin) / 4);
      Serial.println("J." + String(val));
      input = ' ';
    }

    if (input.charAt(0) == 'b') {
      //Serial.println("-->" + input.substring(input.indexOf('.')+1,input.indexOf('.')+3).toInt() );
      analogWrite(6, 255 - map(input.substring(input.indexOf('.') + 1, input.indexOf('.') + 4).toInt(), 0, 100, 0, 255));
      input = ' ';
    }
  }

  if ((millis() - batteyInterval) >= 5000)  //true until the period elapses.  Note that this is the reverse of BWOD
  {
    batteyInterval = millis();
    Serial.println("P." + String(random(0, 100)));
  }

  ButtonPress();
}

void ButtonPress() {
  // update button states
  buttonState2 = digitalRead(buttonPin2);
  buttonState3 = digitalRead(buttonPin3);
  buttonState5 = digitalRead(buttonPin5);
  buttonState6 = digitalRead(buttonPin6);
  buttonState7 = digitalRead(buttonPin7);
  buttonState10 = digitalRead(buttonPin10);

  // button press events.
  if ((millis() - lastDebounceTime) >= debounceDelay) {
    if (buttonState2 == LOW) {
      Serial.println("B.L");
      lastDebounceTime = millis();
    }
    else if (buttonState3 == LOW) {
      Serial.println("B.B");
      lastDebounceTime = millis();
    }
    else if (buttonState5 == LOW) {
      Serial.println("B.D");
      lastDebounceTime = millis();
    }
    else if (buttonState6 == LOW) {
      Serial.println("B.O");
      lastDebounceTime = millis();
    }
    else if (buttonState7 == LOW) {
      Serial.println("B.U");
      lastDebounceTime = millis();
    }
    else if (buttonState10 == LOW) {
      Serial.println("B.R");
      lastDebounceTime = millis();
    }
  }
}
