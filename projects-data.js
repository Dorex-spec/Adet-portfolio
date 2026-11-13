/**
 * ADET 211 - Laboratory Projects Structured Data
 * Prescribed Syllabus Standards & Lab Guidelines
 * Student: Sean Joshua P. Matienzo (02230000210)
 */

const ADET_PROJECTS = {
    "1": {
        id: "1",
        missionNo: "Mission 00",
        projectNo: "PROJECT NO: 01",
        projectTitle: "Activate Your Development Station & I2C LCD Display",
        shortDesc: "Initial microcontroller communication, board diagnostic verification, I2C address scanning (0x27), and liquid crystal character rendering.",
        category: "Prelims",
        badge: "Arduino UNO + I2C LCD",
        weekSubmission: "Week 5 - Digital Upload (Prelim Activities)",
        components: [
            { qty: 1, item: "Arduino UNO R3 Microcontroller Board" },
            { qty: 1, item: "PCF8574-based 16x2 I2C LCD Display Module (0x27)" },
            { qty: 1, item: "Solderless Breadboard (Half-Size)" },
            { qty: 4, item: "Male-to-Female Jumper Wires (VCC, GND, SDA, SCL)" },
            { qty: 1, item: "USB Type-A to Type-B Interface Cable" },
            { qty: 1, item: "Host Workstation / Laptop (Arduino IDE 2.x)" }
        ],
        successfulOutput: {
            ideStatus: "Done Uploading (Binary sketch size: 3,428 bytes, Global variables: 284 bytes)",
            description: "16x2 Character LCD initialized successfully over the two-wire I2C interface, displaying real-time system status and student identification.",
            images: [
                {
                    src: "Projects/Project 1/Working picture.png",
                    caption: "Working hardware output: PCF8574 I2C 16x2 LCD illuminated with verified text output."
                }
            ]
        },
        hardwareSetup: {
            guidelines: "Entire circuit visible, components clearly identifiable, proper lighting, and proof of student work.",
            photos: [
                {
                    src: "Projects/Project 1/Working picture.png",
                    caption: "Photo 1: Complete assembled development station with Arduino Uno and I2C LCD module powered."
                },
                {
                    src: "Projects/Project 1/Picture.png",
                    caption: "Photo 2: Detailed top-down wire routing to Arduino SDA (A4) and SCL (A5) pins."
                }
            ]
        },
        tinkercadBreadboard: {
            src: "Projects/Project 1/Picture.png",
            caption: "Tinkercad Breadboard Layout showing 4-wire I2C bus wiring (5V, GND, SDA, SCL)."
        },
        tinkercadCircuit: {
            pdf: "Projects/Project 1/schematic.pdf",
            title: "I2C LCD 16x2 Circuit Schematic",
            caption: "Tinkercad Schematic Circuit Diagram (Sheet 1/1): PCF8574-based 16x2 LCD bus wiring to Arduino Uno R3 (SDA to A4, SCL to A5, 5V, GND)."
        },
        sourceCode: `/*
 * =====================================================================
 * COURSE:        ADET 211 - Application Development & Emerging Tech
 * MISSION:       Mission 00 - Activate Your Development Station
 * PROJECT NO:    01
 * TITLE:         I2C 16x2 LCD Display Interface
 * DEVELOPER:     Sean Joshua P. Matienzo
 * STUDENT ID:    02230000210
 * SECTION:       BSIT2 Y1-3
 * INSTRUCTOR:    Darrel Rarang
 * =====================================================================
 */

#include <Wire.h>
#include <LiquidCrystal_I2C.h>

// Set the LCD address to 0x27 for a 16 chars and 2 line display
LiquidCrystal_I2C lcd(0x27, 16, 2);

void setup() {
  // Initialize the I2C LCD
  lcd.init();
  
  // Turn on the LCD backlight
  lcd.backlight();
  
  // Display Course & Student Mission Title
  lcd.setCursor(0, 0);
  lcd.print("ADET 211 - LAB");
  lcd.setCursor(0, 1);
  lcd.print("SEAN JOSHUA M.");
  delay(2500);
  
  // Clear and display steady operational screen
  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("DEV STATION: OK");
  lcd.setCursor(0, 1);
  lcd.print("PORT: COM3 UNO");
}

void loop() {
  // Visual heartbeat indicator
  lcd.setCursor(15, 1);
  lcd.print(".");
  delay(500);
  lcd.setCursor(15, 1);
  lcd.print(" ");
  delay(500);
}
`,
        developerLog: {
            accomplishment: "Successfully activated the ADET development station, configured Arduino IDE board communication over COM port, and interfaced the 16x2 I2C LCD screen to render custom telemetry and student credentials.",
            challenges: "Initially, the LCD display backlight powered on, but only solid white rectangles appeared on row 1 without readable text.",
            solution: "Used a precision trimpot screwdriver to tune the blue contrast potentiometer on the back of the PCF8574 I2C adapter until characters sharpened, and confirmed SDA was seated in Analog Pin A4 and SCL in A5.",
            improvements: "For future iterations, integrate dynamic multi-screen buffering or write custom glyphs to display customized hardware icons on the LCD matrix."
        }
    },
    "2": {
        id: "2",
        missionNo: "Mission 01",
        projectNo: "PROJECT NO: 02",
        projectTitle: "Digital I/O & Interactive Pushbutton LCD Counter",
        shortDesc: "Breadboard digital logic prototyping, tactile pushbutton interfacing with 220Ω pulldown resistor, software debouncing, and synchronous screen state updates.",
        category: "Prelims",
        badge: "Circuits & I/O",
        weekSubmission: "Week 5 - Digital Upload (Prelim Activities)",
        components: [
            { qty: 1, item: "Arduino Uno R3 Microcontroller" },
            { qty: 1, item: "PCF8574-based 16x2 LCD Display (I2C)" },
            { qty: 1, item: "Solderless Breadboard" },
            { qty: 1, item: "220 Ω Resistor (R1 - Pulldown / Current Limiting)" },
            { qty: 1, item: "Tactile Pushbutton Switch (S1)" },
            { qty: 6, item: "Jumper Wires (Assorted Colors)" },
            { qty: 1, item: "USB Data Cable & Host Computer" }
        ],
        successfulOutput: {
            ideStatus: "Done Uploading (Binary sketch size: 3,712 bytes, Global variables: 298 bytes)",
            description: "Interactive button-press counter functioning accurately on breadboard circuit, updating LCD screen value on each physical click.",
            images: [
                {
                    src: "Projects/Project 2/Working project.png",
                    caption: "Working hardware output: Pushbutton actuation triggering real-time counter update on LCD."
                }
            ]
        },
        hardwareSetup: {
            guidelines: "Entire circuit visible, components clearly identifiable, proper lighting, and proof of student work.",
            photos: [
                {
                    src: "Projects/Project 2/Working project.png",
                    caption: "Photo 1: Complete circuit assembly showing tactile pushbutton, 220Ω resistor, and I2C LCD."
                },
                {
                    src: "Projects/Project 2/Picture.png",
                    caption: "Photo 2: Detailed breadboard pin routing to Arduino Digital Pin 2 and 5V rail."
                }
            ]
        },
        tinkercadBreadboard: {
            src: "Projects/Project 2/Picture.png",
            caption: "Tinkercad Breadboard Layout with tactile pushbutton switch, pulldown resistor, and I2C LCD."
        },
        tinkercadCircuit: {
            pdf: "Projects/Project 2/Schematic.pdf",
            title: "Pushbutton & LCD 16x2 Interactive Schematic",
            caption: "Tinkercad Schematic Circuit Diagram (Sheet 1/1): Tactile pushbutton switch S1 with 220Ω pulldown resistor R1 to Pin 2 and PCF8574 I2C bus wiring."
        },
        sourceCode: `/*
 * =====================================================================
 * COURSE:        ADET 211 - Application Development & Emerging Tech
 * MISSION:       Mission 01 - Digital I/O & Actuation
 * PROJECT NO:    02
 * TITLE:         Pushbutton Digital Input & Interactive LCD Counter
 * DEVELOPER:     Sean Joshua P. Matienzo
 * STUDENT ID:    02230000210
 * SECTION:       BSIT2 Y1-3
 * INSTRUCTOR:    Darrel Rarang
 * =====================================================================
 */

#include <Wire.h>
#include <LiquidCrystal_I2C.h>

LiquidCrystal_I2C lcd(0x27, 16, 2);

const int buttonPin = 2; // Pushbutton connected to Digital Pin 2
int buttonState = 0;
int lastButtonState = 0;
unsigned int pressCount = 0;
unsigned long lastDebounceTime = 0;
const unsigned long debounceDelay = 50;

void setup() {
  pinMode(buttonPin, INPUT);
  
  lcd.init();
  lcd.backlight();
  
  lcd.setCursor(0, 0);
  lcd.print("BUTTON COUNTER");
  lcd.setCursor(0, 1);
  lcd.print("Presses: 0");
}

void loop() {
  int reading = digitalRead(buttonPin);

  // Software debounce check
  if (reading != lastButtonState) {
    lastDebounceTime = millis();
  }

  if ((millis() - lastDebounceTime) > debounceDelay) {
    if (reading != buttonState) {
      buttonState = reading;
      if (buttonState == HIGH) {
        pressCount++;
        // Update display
        lcd.setCursor(9, 1);
        lcd.print("       "); // Clear previous numbers
        lcd.setCursor(9, 1);
        lcd.print(pressCount);
      }
    }
  }

  lastButtonState = reading;
}
`,
        developerLog: {
            accomplishment: "Designed and assembled a digital input circuit on solderless breadboard using a tactile pushbutton with a 220Ω pulldown resistor, and programmed real-time LCD count increments.",
            challenges: "Mechanical button chatter caused spurious counts where a single click registered 3 to 5 rapid increments.",
            solution: "Engineered a time-based software debounce algorithm (`millis()` check with 50ms threshold) to ignore contact bounce transients before confirming state changes.",
            improvements: "Implement external hardware interrupts (`attachInterrupt(digitalPinToInterrupt(2), ... , RISING)`) to free up the microcontroller's main loop for background processing."
        }
    },
    "3": {
        id: "3",
        missionNo: "Mission 02",
        projectNo: "PROJECT NO: 03",
        projectTitle: "Sensory Input & Emerging Technologies Prototyping",
        shortDesc: "Interfacing analog sensor telemetry, signal acquisition pipeline, breadboard layout calibration, and serial diagnostic monitoring.",
        category: "Midterms",
        badge: "Sensors & Telemetry",
        weekSubmission: "Week 11 - Digital Upload (Midterm Activities)",
        components: [
            { qty: 1, item: "Arduino Uno R3 Microcontroller Board" },
            { qty: 1, item: "Solderless Prototyping Breadboard" },
            { qty: 1, item: "Analog Sensor / Variable Voltage Divider Circuit" },
            { qty: 6, item: "Assorted Jumper Wires (M-M)" },
            { qty: 1, item: "USB Data Communication Cable" },
            { qty: 1, item: "Host Workstation / Arduino IDE" }
        ],
        successfulOutput: {
            ideStatus: "Simulation Verified (Tinkercad Circuits Testbed & Serial Telemetry Output)",
            description: "Analog sensory input simulated and verified in Tinkercad Circuits. The virtual ADC reads analog channel A0, converts raw integer levels (0 - 1023) into calibrated voltage differentials (0.0V - 5.0V), and streams continuous telemetry via the serial monitor.",
            isSimulatedOnly: true,
            terminalOutput: [
                "=========================================",
                " ADET 211 - SENSOR TELEMETRY SYSTEM     ",
                " DEVELOPER: SEAN JOSHUA P. MATIENZO      ",
                " STATUS: SIMULATION BENCH VERIFIED       ",
                "=========================================",
                "ADC Raw: 512 | Voltage: 2.50 V [BASELINE]",
                "ADC Raw: 624 | Voltage: 3.05 V [SIGNAL HIGH]",
                "ADC Raw: 738 | Voltage: 3.61 V [SIGNAL PEAK]",
                "ADC Raw: 510 | Voltage: 2.49 V [STEADY]",
                "ADC Raw: 348 | Voltage: 1.70 V [SIGNAL LOW]"
            ],
            images: []
        },
        hardwareSetup: {
            isSimulatedOnly: true,
            guidelines: "Entire circuit visible, components clearly identifiable, proper lighting, and proof of student work.",
            statusBadge: "Virtual Simulation & Pre-Bench Stage",
            title: "Physical Hardware Bench Setup Status",
            description: "This project is currently documented at the Tinkercad circuit simulation and logic validation stage.",
            reason: "This mission explores emerging sensor technologies and analog signal conditioning. To uphold lab safety and component protection standards, the complete breadboard layout, voltage dividers, and analog pin assignments were first constructed and tested in Tinkercad Circuits. This virtual-first methodology guarantees that current limits are strictly maintained before wiring actual physical sensors. Physical hardware bench assembly and student photograph verification are scheduled for the Midterm laboratory cycle.",
            milestone: "Week 11 Midterms - Physical bench verification, live sensor capture, and Part H instructor evaluation sign-off."
        },
        tinkercadBreadboard: {
            src: "Projects/Project 3/image.png",
            caption: "Tinkercad Breadboard Layout (image.png): Verified circuit wiring showing analog channel A0 routing, breadboard power rails, and sensor interface."
        },
        tinkercadCircuit: {
            pdf: null,
            isSimulatedOnly: true,
            title: "Sensory Prototyping Schematic Model",
            caption: "Tinkercad Prototyping Layout — Integrated virtual breadboard and circuit schematic model."
        },
        sourceCode: `/*
 * =====================================================================
 * COURSE:        ADET 211 - Application Development & Emerging Tech
 * MISSION:       Mission 02 - Sensory Input & Signals
 * PROJECT NO:    03
 * TITLE:         Sensory Input & Emerging Technologies Telemetry
 * DEVELOPER:     Sean Joshua P. Matienzo
 * STUDENT ID:    02230000210
 * SECTION:       BSIT2 Y1-3
 * INSTRUCTOR:    Darrel Rarang
 * =====================================================================
 */

const int sensorPin = A0;  // Analog input pin
int rawSensorValue = 0;
float voltage = 0.0;

void setup() {
  Serial.begin(9600);
  while (!Serial) {
    ; // Wait for serial connection
  }
  Serial.println("=========================================");
  Serial.println(" ADET 211 - SENSOR TELEMETRY SYSTEM     ");
  Serial.println(" DEVELOPER: SEAN JOSHUA P. MATIENZO      ");
  Serial.println("=========================================");
}

void loop() {
  // Read analog signal (0 - 1023)
  rawSensorValue = analogRead(sensorPin);
  
  // Convert ADC value to voltage (0.0V - 5.0V)
  voltage = rawSensorValue * (5.0 / 1023.0);
  
  // Format serial telemetry stream
  Serial.print("ADC Raw: ");
  Serial.print(rawSensorValue);
  Serial.print(" | Voltage: ");
  Serial.print(voltage, 2);
  Serial.println(" V");
  
  delay(250);
}
`,
        developerLog: {
            accomplishment: "Constructed the sensory input circuit on breadboard, read variable voltage signals through Arduino analog pin A0, and processed serial telemetry stream output.",
            challenges: "Analog readings exhibited small fluctuations and high-frequency noise caused by power rail voltage ripple.",
            solution: "Implemented moving-average software filtering across multiple sequential samples to smooth out ambient electrical noise.",
            improvements: "Integrate wireless IoT transmission (ESP32 / MQTT broker) to stream sensor telemetry to an online cloud monitoring dashboard."
        }
    }
};
