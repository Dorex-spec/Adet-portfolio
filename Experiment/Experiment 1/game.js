/**
 * ADET 211 Experiment 01: Terminal Wanderer
 * Dynamic Scrolling 9x9 Radar Viewport, Soldier One-Shot Ballistics, 70-Item Inventory & Arduino Decryption
 */

document.addEventListener('DOMContentLoaded', () => {
    // Game State
    const state = {
        gridSize: 9,          // Always 9x9 visible grid
        playerX: 5,           // Global coordinate X
        playerY: 5,           // Global coordinate Y
        camX: 1,              // Top-left sector X of current 9x9 radar viewport
        camY: 1,              // Top-left sector Y of current 9x9 radar viewport
        heading: 'NORTH',
        steps: 0,
        energy: 100,
        maxEnergy: 100,
        drinksFound: 0,
        encountersCount: 0,
        visited: new Set(['5-5']),
        isGameOver: false,
        inCombat: false,
        inQuiz: false,
        currentEnemy: null,
        currentQuiz: null,
        activeFilterTab: 'all',

        // 70-Item System Inventory & Equipment
        inventory: [],
        equippedWeapon: null,
        equippedArmor: null,
        ammoPouch: {
            "9mm": 0,
            "5.56mm": 0,
            "12-Gauge": 0,
            "Energy Cell": 0,
            ".50 BMG": 0,
            "Plasma Core": 0
        }
    };

    // DOM Elements
    const gridRadar = document.getElementById('gridRadar');
    const coordsDisplay = document.getElementById('coordsDisplay');
    const compassFacing = document.getElementById('compassFacing');
    const radarWindowPill = document.getElementById('radarWindowPill');
    const stepsCount = document.getElementById('stepsCount');
    const energyLevel = document.getElementById('energyLevel');
    const energyMeterFill = document.getElementById('energyMeterFill');
    const energyBox = document.getElementById('energyBox');
    const drinksCount = document.getElementById('drinksCount');
    const encounterCard = document.getElementById('encounterCard');
    const historyLog = document.getElementById('historyLog');
    const clearLogBtn = document.getElementById('clearLogBtn');
    const restartGameBtn = document.getElementById('restartGameBtn');

    // Loadout & Ammo DOM
    const weaponNameDisplay = document.getElementById('weaponNameDisplay');
    const weaponDetailDisplay = document.getElementById('weaponDetailDisplay');
    const armorNameDisplay = document.getElementById('armorNameDisplay');
    const armorDetailDisplay = document.getElementById('armorDetailDisplay');
    const ammo9mm = document.getElementById('ammo9mm');
    const ammo556 = document.getElementById('ammo556');
    const ammo12g = document.getElementById('ammo12g');
    const ammoCell = document.getElementById('ammoCell');
    const invCountBadge = document.getElementById('invCountBadge');
    const invCountTitle = document.getElementById('invCountTitle');

    // Inventory Modal DOM
    const inventoryModal = document.getElementById('inventoryModal');
    const inventoryBtn = document.getElementById('inventoryBtn');
    const manageLoadoutBtn = document.getElementById('manageLoadoutBtn');
    const closeInventoryBtn = document.getElementById('closeInventoryBtn');
    const inventoryGrid = document.getElementById('inventoryGrid');
    const invTabs = document.querySelectorAll('.inv-tab');

    // D-Pad Buttons
    const btnUp = document.getElementById('btnUp');
    const btnDown = document.getElementById('btnDown');
    const btnLeft = document.getElementById('btnLeft');
    const btnRight = document.getElementById('btnRight');

    // =========================================================================
    // 20 Arduino Hardware & Code Mini-Game Questions Pool
    // =========================================================================
    const arduinoQuizPool = [
        // Hardware Questions
        {
            type: 'HARDWARE COMPONENT',
            question: 'Which electronic component must be placed in series with an LED to restrict current flow and prevent it from burning out?',
            code: null,
            options: ['Resistor', 'Capacitor', 'Diode', 'Inductor'],
            correct: 'Resistor',
            explanation: 'A current-limiting resistor (typically 220Ω to 330Ω) restricts forward current to safe levels (~15-20mA), preventing LED thermal breakdown.'
        },
        {
            type: 'HARDWARE COMPONENT',
            question: 'Which pin on the Arduino Uno board outputs a constant, regulated +5 Volts direct current to power external sensors and modules?',
            code: null,
            options: ['5V Pin', 'GND Pin', 'AREF Pin', 'RESET Pin'],
            correct: '5V Pin',
            explanation: 'The 5V pin delivers regulated 5.0V DC from the onboard voltage regulator or USB connection.'
        },
        {
            type: 'HARDWARE COMPONENT',
            question: 'What is the role of a Pulldown Resistor connected between a digital input pin and Ground (GND)?',
            code: null,
            options: ['Keeps pin at LOW state when switch is open', 'Increases input voltage to 12V', 'Provides audio filtering', 'Inverts digital PWM clock'],
            correct: 'Keeps pin at LOW state when switch is open',
            explanation: 'Without a pulldown resistor, an open switch leaves the digital input floating in high impedance, creating erratic electrical noise readings.'
        },
        {
            type: 'HARDWARE COMPONENT',
            question: 'Which component provides a variable electrical resistance when its physical shaft or knob is rotated by hand?',
            code: null,
            options: ['Potentiometer', 'Tactile Pushbutton', 'Relay Module', 'Zener Diode'],
            correct: 'Potentiometer',
            explanation: 'A potentiometer is a 3-terminal variable voltage divider with a wiper that adjusts resistance along a resistive track.'
        },
        {
            type: 'HARDWARE COMPONENT',
            question: 'Which sensor module measures distance to an obstacle by emitting high-frequency ultrasonic sound pulses and measuring echo time?',
            code: null,
            options: ['HC-SR04 Ultrasonic', 'DHT11 Temp/Humidity', 'LDR Photoresistor', 'PIR Motion Detector'],
            correct: 'HC-SR04 Ultrasonic',
            explanation: 'The HC-SR04 emits 40kHz ultrasound bursts through its transmitter transducer and detects reflected echo via receiver transducer.'
        },
        {
            type: 'HARDWARE COMPONENT',
            question: 'Which display module uses an I2C backpack interface requiring only SDA (A4) and SCL (A5) communication pins on the Arduino Uno?',
            code: null,
            options: ['16x2 I2C LCD', '7-Segment Tube', 'OLED SPI Display', 'VGA Video Shield'],
            correct: '16x2 I2C LCD',
            explanation: 'A PCF8574-based I2C adapter backpack serializes 8 parallel LCD pins down to two standard I2C data and clock lines.'
        },
        {
            type: 'HARDWARE COMPONENT',
            question: 'What is the main 8-bit AVR microcontroller IC installed on the official Arduino Uno R3 board?',
            code: null,
            options: ['ATmega328P', 'ESP8266', 'STM32F103', 'PIC16F84A'],
            correct: 'ATmega328P',
            explanation: 'The Arduino Uno R3 is powered by the Microchip/Atmel ATmega328P 8-bit RISC microcontroller clocked at 16 MHz.'
        },
        {
            type: 'HARDWARE COMPONENT',
            question: 'Which electromagnetic switching component allows a low-voltage 5V Arduino signal to safely switch high-power 220V AC household appliances?',
            code: null,
            options: ['Relay Module', 'Voltage Regulator', 'Optocoupler', 'Schottky Diode'],
            correct: 'Relay Module',
            explanation: 'A relay uses an energizable electromagnetic coil to physically close or open isolated high-voltage contact sets.'
        },
        {
            type: 'HARDWARE COMPONENT',
            question: 'What is the standard I2C bus address commonly used by PCF8574-based 16x2 LCD modules?',
            code: null,
            options: ['0x27', '0xFF', '0x00', '0x80'],
            correct: '0x27',
            explanation: '0x27 (and occasionally 0x3F) is the factory hardware address for PCF8574 I2C expansion backpacks.'
        },
        {
            type: 'HARDWARE COMPONENT',
            question: 'What temporary, solderless prototyping platform features interconnected spring-clip rows for circuit experimentation?',
            code: null,
            options: ['Solderless Breadboard', 'Etched PCB', 'Stripboard', 'Wirewrap Socket'],
            correct: 'Solderless Breadboard',
            explanation: 'Breadboards feature 5-pin terminal strips and dual power distribution buses for solder-free circuit testing.'
        },

        // Code Questions
        {
            type: 'ARDUINO C++ CODE',
            question: 'Which core function is called exactly once when the Arduino board boots up or resets, used for pin configuration and initialization?',
            code: 'void ?????() {\n    pinMode(13, OUTPUT);\n    Serial.begin(9600);\n}',
            options: ['setup()', 'loop()', 'main()', 'initBoard()'],
            correct: 'setup()',
            explanation: 'The setup() function initializes variables, pin modes, and library configurations once upon power-up.'
        },
        {
            type: 'ARDUINO C++ CODE',
            question: 'Which core function executes continuously and repeatedly in an infinite cycle as long as the Arduino board has power?',
            code: 'void ?????() {\n    digitalWrite(13, HIGH);\n    delay(1000);\n    digitalWrite(13, LOW);\n    delay(1000);\n}',
            options: ['loop()', 'setup()', 'cycle()', 'process()'],
            correct: 'loop()',
            explanation: 'The loop() function repeats actively, allowing the microcontroller to monitor sensors and drive outputs continuously.'
        },
        {
            type: 'ARDUINO C++ CODE',
            question: 'Which function configures digital pin 13 to act as an electric power source to drive an external LED or actuator?',
            code: 'pinMode(13, ?????);',
            options: ['OUTPUT', 'INPUT', 'INPUT_PULLUP', 'HIGH'],
            correct: 'OUTPUT',
            explanation: 'Setting a pin to OUTPUT puts it in low-impedance mode, enabling it to source or sink up to 20-40mA of current.'
        },
        {
            type: 'ARDUINO C++ CODE',
            question: 'Which function reads an incoming analog voltage on pin A0 and maps it to an integer range between 0 and 1023?',
            code: 'int sensorValue = ?????(A0);',
            options: ['analogRead', 'digitalRead', 'analogWrite', 'readVoltage'],
            correct: 'analogRead',
            explanation: 'The Uno 10-bit Analog-to-Digital Converter (ADC) maps 0 to 5V inputs into discrete integers from 0 to 1023.'
        },
        {
            type: 'ARDUINO C++ CODE',
            question: 'Which statement accurately pauses program execution for exactly 1.5 seconds (1500 milliseconds)?',
            code: '?????(1500);',
            options: ['delay', 'pause', 'sleep', 'wait'],
            correct: 'delay',
            explanation: 'delay(ms) halts code execution for the specified number of milliseconds using timer ticks.'
        },
        {
            type: 'ARDUINO C++ CODE',
            question: 'Which library header file must be included to enable two-wire I2C communication on Arduino pins A4 (SDA) and A5 (SCL)?',
            code: '#include <?????.h>',
            options: ['Wire', 'LiquidCrystal', 'SPI', 'SoftwareSerial'],
            correct: 'Wire',
            explanation: 'The Wire.h library implements the Two-Wire Interface (TWI/I2C) communication protocol in the Arduino core.'
        },
        {
            type: 'ARDUINO C++ CODE',
            question: 'Which statement initializes serial data transmission at standard 9600 baud rate inside the setup() function?',
            code: 'void setup() {\n    Serial.?????(9600);\n}',
            options: ['begin', 'open', 'start', 'listen'],
            correct: 'begin',
            explanation: 'Serial.begin(speed) initializes the hardware UART peripheral to transmit serial telemetry at the given baud rate.'
        },
        {
            type: 'ARDUINO C++ CODE',
            question: 'Which function generates a Pulse Width Modulation (PWM) duty-cycle signal on PWM pins (~3, ~5, ~6, ~9, ~10, ~11)?',
            code: '?????(9, 128); // 50% duty cycle',
            options: ['analogWrite', 'digitalWrite', 'pwmWrite', 'analogRead'],
            correct: 'analogWrite',
            explanation: 'analogWrite(pin, value) modulates timer PWM hardware with values between 0 (always off) and 255 (always on).'
        },
        {
            type: 'ARDUINO C++ CODE',
            question: 'Which statement correctly sets digital Pin 8 to active 5V output state?',
            code: 'digitalWrite(8, ?????);',
            options: ['HIGH', 'LOW', 'OUTPUT', 'ENABLE'],
            correct: 'HIGH',
            explanation: 'digitalWrite(pin, HIGH) connects the output driver to the 5V rail (+5.0V).'
        },
        {
            type: 'ARDUINO C++ CODE',
            question: 'Which function reads whether an active pushbutton connected to digital Pin 2 is receiving voltage (HIGH or LOW)?',
            code: 'int buttonState = ?????(2);',
            options: ['digitalRead', 'analogRead', 'pinRead', 'checkPin'],
            correct: 'digitalRead',
            explanation: 'digitalRead(pin) samples a digital pin and returns HIGH (1) if voltage >= 3V, or LOW (0) if voltage <= 1.5V.'
        }
    ];

    // =========================================================================
    // Atmospheric Wasteland Encounters Pool (Hardware & Lore)
    // =========================================================================
    const loreEncountersPool = [
        {
            badge: "HARDWARE MONUMENT",
            title: "The Abandoned Microcontroller Altar",
            desc: "You stumble across an elevated stone pedestal housing an ancient Arduino Uno R3. A single amber pin-13 LED blinks in a rhythmic heartbeat pattern, powered by an unknown dormant capacitor.",
            actions: [
                {
                    text: "Analyze Circuit Pinout",
                    outcome: "You probe the analog header with your multimeter. You discover clean 5.0V telemetry and harvest a precision pullup resistor (+10% Energy).",
                    energyChange: 10
                },
                {
                    text: "Scavenge Jumper Wires",
                    outcome: "You safely extract 4 pristine jumper wires for your field toolkit. The heartbeat LED gracefully fades to standby.",
                    energyChange: 0
                },
                {
                    text: "Leave Undisturbed",
                    outcome: "You record the benchmark coordinates and proceed respectfully without disturbing the circuit.",
                    energyChange: 0
                }
            ]
        },
        {
            badge: "SIGNAL ACQUISITION",
            title: "The Cryptic Oscilloscope Beacon",
            desc: "A ruggedized field oscilloscope sits on a shipping crate. A glowing green cathode-ray beam sweeps continuously across its phosphor screen, tracing a 1 kHz sine wave broadcast from underground.",
            actions: [
                {
                    text: "Tune Horizontal Timebase",
                    outcome: "You adjust the horizontal division knob. A hidden encrypted ASCII string appears in the wave peaks: 'BUILD. CODE. INNOVATE.' (+10% Energy).",
                    energyChange: 10
                },
                {
                    text: "Log Frequency Telemetry",
                    outcome: "You synchronize your receiver with the carrier frequency, calibrating your sector telemetry.",
                    energyChange: 0
                }
            ]
        },
        {
            badge: "CIRCUIT RELIC",
            title: "The Decayed Relay Matrix",
            desc: "A rack of industrial electromagnetic relays clicks rhythmically inside an abandoned transformer shed. Contact sparks trace patterns across copper busbars.",
            actions: [
                {
                    text: "Isolate Flyback Diodes",
                    outcome: "You safely jumper the coil contacts through a 1N4007 diode, stabilizing the inductive kickback (+12% Energy).",
                    energyChange: 12
                },
                {
                    text: "Listen to Relay Cadence",
                    outcome: "The mechanical clicking mimics Morse code timing. You memorize the cadence before moving forward.",
                    energyChange: 0
                }
            ]
        },
        {
            badge: "MAINFRAME RELIC",
            title: "The Glitched Terminal Relay",
            desc: "A retro-futuristic mainframe terminal flickers inside a concrete bunker. Hexadecimal memory dump values scroll across its amber screen, halting periodically at an I2C interrupt loop.",
            actions: [
                {
                    text: "Debug Interrupt Vector",
                    outcome: "You plug into the serial diagnostic port and clear the stack overflow. The terminal beeps happily, restoring local auxiliary power (+15% Energy).",
                    energyChange: 15
                },
                {
                    text: "Extract Firmware Dump",
                    outcome: "You copy the core register dumps onto your portable drive for future laboratory study.",
                    energyChange: 0
                }
            ]
        }
    ];

    // =========================================================================
    // Hostile Enemies Pool (Soldiers CAN ONE-SHOT UNARMORED PLAYERS!)
    // =========================================================================
    const hostileEnemies = [
        {
            name: "Wasteland Wire Scavenger",
            category: "SCAVENGER",
            maxHp: 32,
            hp: 32,
            hasGun: false,
            weaponName: "High-Voltage Grounding Prybar",
            atkMin: 6,
            atkMax: 10,
            desc: "A feral scavenger wielding a high-voltage grounded prybar lunges from behind rusted chassis racks to tear open your suit capacitors!"
        },
        {
            name: "Cybernetic Scrap Bandit",
            category: "BANDIT",
            maxHp: 46,
            hp: 46,
            hasGun: false,
            weaponName: "Overclocked EMP Spark Blade",
            atkMin: 8,
            atkMax: 14,
            desc: "An augmented wasteland bandit lunges forward with an overclocked EMP spark blade, intent on stripping your telemetry battery core!"
        },
        {
            name: "Outpost Enforcer Soldier",
            category: "SOLDIER",
            maxHp: 65,
            hp: 65,
            hasGun: true, // SOLDIER HAS HIGH-CALIBER SERVICE RIFLE (ONE-SHOTS UNARMORED PLAYERS)
            weaponName: "Military AR-55 Assault Carbine",
            atkMin: 45,
            atkMax: 65,
            desc: "A heavily armored military security soldier raising a lethal high-caliber AR-55 assault rifle. ⚠️ CAUTION: SOLDIER HAS A GUN AND CAN ONE-SHOT UNARMORED PLAYERS!"
        }
    ];

    // Supply Caches
    const supplyCaches = [
        {
            title: "Derelict Cyber-Vending Terminal",
            desc: "You discover an old refrigeration terminal half-buried under scrap. Through the reinforced viewport, a pressurized Energy Drink canister (+25% Energy) remains chilled. An Arduino diagnostic keypad guards the latch."
        },
        {
            title: "Military Field Ration Pod",
            desc: "A hermetically sealed tactical drop pod rests upright in the dust. Telemetry displays confirm an intact electrolyte Energy Drink (+25% Energy) inside, locked by an embedded microcontroller verification sequence."
        },
        {
            title: "Technician Field Locker",
            desc: "An abandoned hardware technician workbench holds a secure lockbox. Inside is a chilled Cyber-Energy Drink (+25% Energy). Enter the correct Arduino hardware or code parameter to release the solenoid latch."
        }
    ];

    // =========================================================================
    // Radar Engine with Dynamic Scrolling 9x9 Viewport
    // =========================================================================

    // Initializes or rebuilds the 9x9 radar grid cells
    const initRadar = () => {
        if (!gridRadar) return;
        gridRadar.innerHTML = '';
        for (let row = 1; row <= state.gridSize; row++) {
            for (let col = 1; col <= state.gridSize; col++) {
                const cell = document.createElement('div');
                cell.className = 'grid-cell';
                cell.id = `radar-cell-${col}-${row}`;
                gridRadar.appendChild(cell);
            }
        }
    };

    // Update Radar Visualization with Scrolling Window
    const updateRadar = () => {
        if (!gridRadar) return;
        // Ensure grid has cells built
        if (!gridRadar.children || gridRadar.children.length === 0) {
            initRadar();
        }

        // Render 9x9 cells corresponding to [camX .. camX + 8], [camY .. camY + 8]
        for (let row = 1; row <= state.gridSize; row++) {
            for (let col = 1; col <= state.gridSize; col++) {
                const sectorX = state.camX + col - 1;
                const sectorY = state.camY + row - 1;
                const cell = document.getElementById(`radar-cell-${col}-${row}`);

                if (!cell) continue;

                cell.className = 'grid-cell';
                cell.title = `Sector [${sectorX}, ${sectorY}]`;

                const isPlayer = (sectorX === state.playerX && sectorY === state.playerY);
                const isVisited = state.visited.has(`${sectorX}-${sectorY}`);

                if (isPlayer) {
                    cell.classList.add('player-active');
                } else if (isVisited) {
                    cell.classList.add('visited');
                }
            }
        }
    };

    // Update Overall HUD, Equipment & UI
    const updateUI = () => {
        // Coordinates and Camera Window
        coordsDisplay.textContent = `Sector [${state.playerX}, ${state.playerY}]`;
        compassFacing.textContent = `Heading: ${state.heading}`;
        if (radarWindowPill) {
            radarWindowPill.textContent = `Grid: [${state.camX}..${state.camX + 8}, ${state.camY}..${state.camY + 8}]`;
        }

        // Stats
        stepsCount.textContent = state.steps;
        energyLevel.textContent = `${state.energy}%`;
        drinksCount.textContent = state.drinksFound;

        // Energy Meter
        const energyPercent = Math.max(0, Math.min(100, state.energy));
        energyMeterFill.style.width = `${energyPercent}%`;

        if (state.energy <= 20) {
            energyBox.classList.add('low-energy');
        } else {
            energyBox.classList.remove('low-energy');
        }

        // Equipped Weapon Display
        if (state.equippedWeapon) {
            const w = state.equippedWeapon;
            weaponNameDisplay.textContent = w.name;
            let ammoDetail = w.ammoType ? `Ammo: ${state.ammoPouch[w.ammoType] || 0}` : 'Melee';
            let durPct = Math.round((w.currentDurability / w.maxDurability) * 100);
            weaponDetailDisplay.textContent = `DMG: ${w.damageMin}-${w.damageMax} • Dur: ${w.currentDurability}/${w.maxDurability} (${durPct}%) • ${ammoDetail}`;
        } else {
            weaponNameDisplay.textContent = "Unarmed (Shock Pulse)";
            weaponDetailDisplay.textContent = "DMG: 16-26 • Melee • Fallback";
        }

        // Equipped Armor Display
        if (state.equippedArmor) {
            const a = state.equippedArmor;
            armorNameDisplay.textContent = a.name;
            const ballPct = Math.round(a.ballisticResist * 100);
            const durPct = Math.round((a.currentDurability / a.maxDurability) * 100);
            armorDetailDisplay.innerHTML = `<strong style="color: #ffffff;">${ballPct}% Ballistic</strong> • Dur: ${a.currentDurability}/${a.maxDurability} (${durPct}%)`;
        } else {
            armorNameDisplay.textContent = "None (Unprotected)";
            armorDetailDisplay.innerHTML = `<strong style="color: #a1a1aa;">⚠️ Vulnerable to Soldier 1-Shot</strong>`;
        }

        // Ammo Counts
        ammo9mm.textContent = state.ammoPouch["9mm"] || 0;
        ammo556.textContent = state.ammoPouch["5.56mm"] || 0;
        ammo12g.textContent = state.ammoPouch["12-Gauge"] || 0;
        ammoCell.textContent = state.ammoPouch["Energy Cell"] || 0;

        // Inventory Count Badges
        const totalItems = state.inventory.length;
        invCountBadge.textContent = totalItems;
        invCountTitle.textContent = totalItems;

        // Update Radar visualization
        updateRadar();
    };

    // Append to Terminal Log
    const addLog = (text, type = 'normal') => {
        const entry = document.createElement('div');
        entry.className = `log-entry ${type}`;
        entry.textContent = text;
        historyLog.appendChild(entry);
        historyLog.scrollTop = historyLog.scrollHeight;
    };

    // =========================================================================
    // Unbounded World Movement (Scrolling 9x9 Radar Viewport)
    // =========================================================================
    const move = (direction) => {
        if (state.isGameOver) {
            addLog("[ALERT] Journey terminated. Press 'Restart' to reboot.", "system");
            return;
        }

        if (state.inCombat) {
            addLog("[COMBAT] You cannot move on radar while locked in battle! Fight or Retreat.", "system");
            return;
        }

        if (state.inQuiz) {
            addLog("[SECURITY LOCK] Complete or exit the Arduino terminal before walking away.", "system");
            return;
        }

        let newX = state.playerX;
        let newY = state.playerY;
        let headingText = state.heading;

        switch (direction) {
            case 'north':
                newY = state.playerY - 1;
                headingText = 'NORTH';
                flashDpad(btnUp);
                break;
            case 'south':
                newY = state.playerY + 1;
                headingText = 'SOUTH';
                flashDpad(btnDown);
                break;
            case 'west':
                newX = state.playerX - 1;
                headingText = 'WEST';
                flashDpad(btnLeft);
                break;
            case 'east':
                newX = state.playerX + 1;
                headingText = 'EAST';
                flashDpad(btnRight);
                break;
        }

        // Dynamic 9x9 Radar Viewport Camera Scrolling
        // As requested: When moving pass the right edge, the window shifts by 1 to the right!
        if (newX > state.camX + (state.gridSize - 1)) {
            state.camX = newX - (state.gridSize - 1);
        } else if (newX < state.camX) {
            state.camX = newX;
        }

        if (newY > state.camY + (state.gridSize - 1)) {
            state.camY = newY - (state.gridSize - 1);
        } else if (newY < state.camY) {
            state.camY = newY;
        }

        // Apply Move & Consume 2 Energy
        state.playerX = newX;
        state.playerY = newY;
        state.heading = headingText;
        state.steps++;
        state.energy = Math.max(0, state.energy - 2);
        state.visited.add(`${newX}-${newY}`);

        updateUI();

        // Check for energy exhaustion
        if (state.energy <= 0) {
            state.energy = 0;
            updateUI();
            triggerGameOver(`Suit energy depleted to 0% in sector [${newX}, ${newY}]. Without energy drinks, life support systems failed.`);
            return;
        }

        addLog(`[NAV] Moved ${headingText} to Sector [${newX}, ${newY}]. (-2 Energy, Reserve: ${state.energy}%)`);

        // 1/5 (20%) chance of triggering an encounter per move; 4/5 desolate step
        const encounterRoll = Math.random();
        if (encounterRoll < 0.20) {
            // Encounter Triggered! (1 in 5 chance)
            triggerRandomEncounter();
        } else {
            // 4 in 5 chance: Desolate sector, no encounter
            renderDesolateStep(newX, newY, headingText);
        }
    };

    const flashDpad = (btn) => {
        if (!btn) return;
        btn.classList.add('pressed');
        setTimeout(() => btn.classList.remove('pressed'), 180);
    };

    // Desolate Sector Atmosphere (when 1/5 encounter roll does not trigger)
    const desolateAtmosphereSnippets = [
        "Dust and electromagnetic static drift across the barren ground. No hostiles or supplies located in this sector.",
        "Scorched earth and dead wiring stretch toward the dark horizon. The sector is quiet, but your suit battery steadily drains (-2% Energy).",
        "Rusted server chassis and twisted girders creak in the wind. Thermal sweep detects no life forms or caches.",
        "A quiet wasteland corridor. Telemetry sweeps reveal zero supply containers in this grid. Keep moving to survive.",
        "Desolate terrain. Every step consumes vital battery reserves (-2% Energy). Continue searching for an encounter.",
        "Wind whistles through broken relay masts. No active electronic signatures detected in this sector.",
        "Cold ash covers the ground. Your energy reserves continue to drop. Keep moving before your battery hits zero."
    ];

    const renderDesolateStep = (x, y, heading) => {
        const snippet = desolateAtmosphereSnippets[Math.floor(Math.random() * desolateAtmosphereSnippets.length)];
        encounterCard.innerHTML = `
            <div class="encounter-header-group">
                <span class="encounter-badge">EXPEDITION &bull; SECTOR CLEAR</span>
                <h2 class="encounter-title">Sector [${x}, ${y}] &mdash; Desolate</h2>
            </div>
            <p class="encounter-narrative">
                ${snippet}
            </p>
            <div class="encounter-actions">
                <span class="status-indicator"><span class="blink-dot"></span> Radar Grid Online &bull; Sector Clear (Encounter Rate: 1/5 per move)</span>
            </div>
        `;
    };

    // =========================================================================
    // Encounter Dispatcher (Combats, Caches, Lore)
    // =========================================================================
    const triggerRandomEncounter = () => {
        state.encountersCount++;
        const roll = Math.random();

        // 45% Chance: Hostile Combat (Bandits, Soldiers, Scavengers)
        if (roll < 0.45) {
            const enemyTemplate = hostileEnemies[Math.floor(Math.random() * hostileEnemies.length)];
            const enemy = {
                ...enemyTemplate,
                hp: enemyTemplate.maxHp
            };
            startCombat(enemy);
        }
        // 35% Chance: Supply Cache (Direct Energy Drink Arduino Quiz)
        else if (roll < 0.80) {
            const cache = supplyCaches[Math.floor(Math.random() * supplyCaches.length)];
            renderSupplyCache(cache);
        }
        // 20% Chance: Atmospheric Hardware / Lore Encounter
        else {
            const lore = loreEncountersPool[Math.floor(Math.random() * loreEncountersPool.length)];
            renderLoreEncounter(lore);
        }
    };

    // =========================================================================
    // Combat Arena with SOLDIER ONE-SHOT BALLISTIC MECHANICS
    // =========================================================================
    const startCombat = (enemy) => {
        state.inCombat = true;
        state.currentEnemy = enemy;

        if (enemy.category === 'SOLDIER') {
            addLog(`[HOSTILE SOLDIER] ⚠️ An armed ${enemy.name} appeared! He is equipped with an assault rifle and CAN ONE-SHOT unarmored targets!`, 'encounter');
        } else {
            addLog(`[HOSTILE ENGAGEMENT] Encountered ${enemy.name}! HP: ${enemy.hp}. Prepare for combat!`, 'encounter');
        }

        renderCombatView(enemy.desc);
    };

    const renderCombatView = (combatFeedMsg = "") => {
        const enemy = state.currentEnemy;
        if (!enemy) return;

        const enemyHpPct = Math.max(0, Math.min(100, Math.round((enemy.hp / enemy.maxHp) * 100)));
        const playerHpPct = Math.max(0, Math.min(100, state.energy));

        // Determine available player weapon attacks
        const weapon = state.equippedWeapon;
        let atkLabel = "⚡ Shock Strike (Unarmed)";
        let atkSub = "16-26 Melee DMG";
        let hasFirearmAmmo = true;

        if (weapon) {
            if (weapon.ammoType) {
                const currentAmmo = state.ammoPouch[weapon.ammoType] || 0;
                if (currentAmmo > 0) {
                    atkLabel = `🎯 Fire ${weapon.name}`;
                    atkSub = `${weapon.damageMin}-${weapon.damageMax} DMG (Uses 1x ${weapon.ammoType})`;
                } else {
                    atkLabel = `⚠️ ${weapon.name} (EMPTY)`;
                    atkSub = `0 ${weapon.ammoType} left! (Blunt strike: 10 DMG)`;
                    hasFirearmAmmo = false;
                }
            } else {
                atkLabel = `⚔️ Strike with ${weapon.name}`;
                atkSub = `${weapon.damageMin}-${weapon.damageMax} Melee DMG`;
            }
        }

        // Soldier warning banner
        const soldierWarning = enemy.hasGun ? `
            <div class="quiz-hazard-alert" style="border-color: #ffffff; background-color: #18181b;">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                <span><strong>LETHAL GUNFIRE THREAT:</strong> Soldier has an assault rifle. Unarmored players will be <strong>ONE-SHOT KILLED</strong>! Equip Ballistic Armor or Guard!</span>
            </div>
        ` : '';

        encounterCard.innerHTML = `
            <div class="combat-card">
                <div class="encounter-header-group">
                    <span class="encounter-badge">⚠️ HOSTILE ENGAGEMENT &bull; ${enemy.category}</span>
                    <h2 class="encounter-title">${enemy.name}</h2>
                </div>

                ${soldierWarning}

                <!-- Combat Vitals Display -->
                <div class="combat-vitals">
                    <div class="vital-unit">
                        <div class="vital-label-row">
                            <span>Enemy HP (${enemy.weaponName})</span>
                            <span class="vital-hp-val">${enemy.hp} / ${enemy.maxHp}</span>
                        </div>
                        <div class="vital-bar-track">
                            <div class="vital-bar-fill enemy-fill" style="width: ${enemyHpPct}%;"></div>
                        </div>
                    </div>
                    <div class="vital-unit">
                        <div class="vital-label-row">
                            <span>Suit Energy</span>
                            <span class="vital-hp-val">${state.energy}%</span>
                        </div>
                        <div class="vital-bar-track">
                            <div class="vital-bar-fill" style="width: ${playerHpPct}%;"></div>
                        </div>
                    </div>
                </div>

                <div class="combat-feed-box" id="combatFeed">${combatFeedMsg}</div>

                <!-- Combat Actions -->
                <div class="combat-actions-grid">
                    <button class="combat-btn" id="combatAtkBtn">
                        <span>${atkLabel}</span>
                        <span class="combat-sub">${atkSub}</span>
                    </button>
                    <button class="combat-btn" id="combatDefBtn">
                        <span>🛡️ Shield / Ballistic Guard</span>
                        <span class="combat-sub">75% Defend + Reflect</span>
                    </button>
                    <button class="combat-btn" id="combatFleeBtn">
                        <span>🏃 Tactical Retreat</span>
                        <span class="combat-sub">Cost 4 Energy</span>
                    </button>
                </div>
            </div>
        `;

        document.getElementById('combatAtkBtn').addEventListener('click', playerAttack);
        document.getElementById('combatDefBtn').addEventListener('click', playerDefend);
        document.getElementById('combatFleeBtn').addEventListener('click', playerRetreat);
    };

    // Combat Action: Attack
    const playerAttack = () => {
        const enemy = state.currentEnemy;
        if (!enemy) return;

        let playerDmg = 0;
        const weapon = state.equippedWeapon;

        if (weapon) {
            if (weapon.ammoType) {
                // Firearm Attack
                const currentAmmo = state.ammoPouch[weapon.ammoType] || 0;
                if (currentAmmo > 0) {
                    state.ammoPouch[weapon.ammoType]--;
                    playerDmg = Math.floor(Math.random() * (weapon.damageMax - weapon.damageMin + 1)) + weapon.damageMin;
                    weapon.currentDurability = Math.max(0, weapon.currentDurability - 1);
                    addLog(`[FIREARM] Fired ${weapon.name}! (-1 ${weapon.ammoType} ammo). Dealt ${playerDmg} DMG!`, 'action');
                } else {
                    // Out of ammo: gun stock strike
                    playerDmg = 10;
                    addLog(`[CLICK!] ${weapon.name} is empty! Struck with weapon stock for 10 DMG.`, 'system');
                }
            } else {
                // Melee Weapon Attack
                playerDmg = Math.floor(Math.random() * (weapon.damageMax - weapon.damageMin + 1)) + weapon.damageMin;
                weapon.currentDurability = Math.max(0, weapon.currentDurability - 1);
                addLog(`[MELEE] Swung ${weapon.name}! Dealt ${playerDmg} DMG.`, 'action');
            }
        } else {
            // Unarmed Shock Pulse
            playerDmg = Math.floor(Math.random() * 11) + 16; // 16 - 26
            addLog(`[SHOCK PULSE] Delivered unarmed arc strike for ${playerDmg} DMG.`, 'action');
        }

        enemy.hp = Math.max(0, enemy.hp - playerDmg);

        if (enemy.hp <= 0) {
            state.inCombat = false;
            addLog(`[VICTORY] Neutralized ${enemy.name}! Hostile dropped valuable loot and an Energy Drink.`, 'encounter');
            renderCombatVictory(enemy);
            return;
        }

        // Enemy Retaliation (SOLDIER ONE-SHOT CHECK)
        enemyCounterAttack(enemy, `You struck ${enemy.name} for ${playerDmg} DMG!`);
    };

    // Enemy Counter-Attack (Handles Soldier One-Shot Gunfire)
    const enemyCounterAttack = (enemy, playerActionNarrative) => {
        // SOLDIER HAS GUN: CHECK FOR ONE-SHOT FATALITY
        if (enemy.hasGun) {
            const armor = state.equippedArmor;

            // Scenario 1: Player has NO Ballistic Armor (or broken) -> SOLDIER ONE-SHOTS PLAYER!
            if (!armor || armor.currentDurability <= 0 || armor.ballisticResist <= 0) {
                state.energy = 0;
                updateUI();
                addLog(`[FATAL SHOT] 💥 LETHAL GUNSHOT! ${enemy.name} fired his high-caliber AR-55! Without ballistic armor, you were ONE-SHOT KILLED!`, 'system');
                triggerGameOver(`💥 ONE-SHOT FATALITY: The Outpost Enforcer fired a lethal burst from his military assault rifle! Because you have no ballistic body armor, the high-caliber round penetrated your suit power core (100% Fatal Damage).`);
                return;
            }

            // Scenario 2: Player HAS Ballistic Armor equipped -> Armor absorbs fatal blast!
            const rawGunDmg = Math.floor(Math.random() * 21) + 45; // 45 - 65
            const absorbPct = armor.ballisticResist;
            const absorbed = Math.round(rawGunDmg * absorbPct);
            const damageTaken = Math.max(10, rawGunDmg - absorbed);
            const armorDamage = Math.max(5, Math.round(rawGunDmg * 0.35));

            armor.currentDurability = Math.max(0, armor.currentDurability - armorDamage);
            state.energy = Math.max(0, state.energy - damageTaken);
            updateUI();

            addLog(`[BALLISTIC SHIELD] 🛡️ ${armor.name} STOPPED THE FATAL SHOT! Absorbed ${absorbed} damage. Took ${damageTaken} Energy. Armor durability: ${armor.currentDurability}/${armor.maxDurability}.`, 'action');

            if (state.energy <= 0) {
                triggerGameOver(`Wounded fatally by gunfire after armor was overwhelmed.`);
                return;
            }

            renderCombatView(`${playerActionNarrative}<br><br>💥 ${enemy.name} fired his rifle! Your <strong>${armor.name}</strong> stopped the fatal bullet! Absorbed ${absorbed} DMG (took ${damageTaken} Energy). Armor degraded (-${armorDamage} dur).`);
            return;
        }

        // Normal Melee / Scavenger / Bandit Attack
        const enemyDmg = Math.floor(Math.random() * (enemy.atkMax - enemy.atkMin + 1)) + enemy.atkMin;
        state.energy = Math.max(0, state.energy - enemyDmg);
        updateUI();

        if (state.energy <= 0) {
            triggerGameOver(`Neutralized in combat by ${enemy.name} after taking ${enemyDmg} critical energy damage.`);
            return;
        }

        addLog(`[ENEMY STRIKE] ${enemy.name} attacked with ${enemy.weaponName} for ${enemyDmg} Energy damage!`, 'system');
        renderCombatView(`${playerActionNarrative}<br><br>${enemy.name} retaliated with ${enemy.weaponName} for ${enemyDmg} Energy damage!`);
    };

    // Combat Action: Defend
    const playerDefend = () => {
        const enemy = state.currentEnemy;
        if (!enemy) return;

        // Guarding against Soldier gunfire or melee
        const rawDmg = enemy.hasGun ? 40 : (Math.floor(Math.random() * (enemy.atkMax - enemy.atkMin + 1)) + enemy.atkMin);
        const reducedDmg = Math.max(4, Math.round(rawDmg * 0.25)); // 75% defense
        const reflectDmg = Math.floor(Math.random() * 6) + 8; // 8 - 13 reflect

        state.energy = Math.max(0, state.energy - reducedDmg);
        enemy.hp = Math.max(0, enemy.hp - reflectDmg);
        updateUI();

        if (enemy.hp <= 0) {
            state.inCombat = false;
            addLog(`[COMBAT] Ballistic shield barrier reflected ${reflectDmg} DMG, neutralizing ${enemy.name}!`, 'encounter');
            renderCombatVictory(enemy);
            return;
        }

        if (state.energy <= 0) {
            triggerGameOver(`Defeated while attempting to brace shield against ${enemy.name}.`);
            return;
        }

        addLog(`[SHIELD GUARD] Braced barrier! Absorbed attack (lost only ${reducedDmg} Energy) and reflected ${reflectDmg} shock DMG.`, 'action');
        renderCombatView(`Shield barrier deployed! Deflected ${enemy.weaponName}! Took only ${reducedDmg} Energy damage and reflected ${reflectDmg} shock damage back at ${enemy.name}!`);
    };

    // Combat Action: Retreat
    const playerRetreat = () => {
        const enemy = state.currentEnemy;
        if (!enemy) return;

        state.energy = Math.max(0, state.energy - 4);
        updateUI();

        if (state.energy <= 0) {
            triggerGameOver("Energy fully depleted while attempting a tactical retreat.");
            return;
        }

        const success = Math.random() < 0.65;
        if (success) {
            state.inCombat = false;
            addLog(`[RETREAT] Disengaged from combat with ${enemy.name} (-4 Energy).`, 'system');
            encounterCard.innerHTML = `
                <div class="encounter-header-group">
                    <span class="encounter-badge">TACTICAL DISENGAGEMENT</span>
                    <h2 class="encounter-title">Escaped Hostile Perimeter</h2>
                </div>
                <p class="encounter-narrative">
                    You broke line-of-sight and sprinted behind scrap bulkheads (-4 Energy). ${enemy.name} lost tracking. You are safe to continue your radar expedition.
                </p>
                <div class="encounter-actions">
                    <button class="action-btn" id="resumeExpBtn">Resume Exploration (WASD)</button>
                </div>
            `;
            document.getElementById('resumeExpBtn').addEventListener('click', () => {
                renderStandbyView();
            });
        } else {
            addLog(`[RETREAT FAILED] Escape vector cut off! ${enemy.name} struck during your retreat!`, 'system');
            enemyCounterAttack(enemy, "Escape vector cut off!");
        }
    };

    // =========================================================================
    // Combat Victory: LOOT SYSTEM (Enemy Drops from 70 Items Database)
    // =========================================================================
    const renderCombatVictory = (enemy) => {
        // Roll 1 to 3 items from the 70-item database based on enemy category!
        const droppedLoot = rollEnemyLoot(enemy.category);

        // Store loot temporarily to be claimed
        encounterCard.innerHTML = `
            <div class="encounter-header-group">
                <span class="encounter-badge">🏆 HOSTILE NEUTRALIZED &bull; LOOT DROPPED</span>
                <h2 class="encounter-title">${enemy.name} Defeated!</h2>
            </div>
            <p class="encounter-narrative">
                The hostile collapses into the scrap, dropping ammunition, tactical equipment, and an encrypted <strong>Cyber-Energy Drink Canister (+25% Energy)</strong>!
            </p>

            <!-- Dropped Loot Items List -->
            <div class="loot-rewards-container">
                <span class="loot-rewards-title">Dropped Battlefield Loot (${droppedLoot.length} Items):</span>
                <div class="loot-items-list">
                    ${droppedLoot.map(item => `
                        <div class="loot-item-row">
                            <span><strong>${escapeHtml(item.name)}</strong> <span class="item-badge rarity-${item.rarity}">${item.category}</span></span>
                            <span style="font-family: var(--font-mono); color: #a1a1aa;">
                                ${item.ammoType ? `Ammo: ${item.quantity || 1}` : (item.maxDurability ? `Dur: ${item.maxDurability}` : '')}
                            </span>
                        </div>
                    `).join('')}
                </div>
            </div>

            <div class="encounter-actions" style="margin-top: 1rem;">
                <button class="action-btn" id="claimLootAndCrackBtn">⚡ Claim All Loot &amp; Crack Arduino Lock &rarr;</button>
            </div>
        `;

        document.getElementById('claimLootAndCrackBtn').addEventListener('click', () => {
            // Claim all loot into inventory and ammo pouch
            droppedLoot.forEach(item => {
                if (item.category === 'AMMO' && item.ammoType) {
                    state.ammoPouch[item.ammoType] = (state.ammoPouch[item.ammoType] || 0) + (item.quantity || 1);
                    addLog(`[LOOT] Added ${item.quantity || 1}x ${item.name} to Ammo Pouch!`, 'action');
                } else {
                    state.inventory.push(item);
                    addLog(`[LOOT] Stored ${item.name} in Inventory!`, 'action');
                }
            });

            updateUI();

            // Proceed to crack the Energy Drink container lock
            startArduinoQuiz(`Loot Dropped by ${enemy.name}`);
        });
    };

    // =========================================================================
    // Supply Cache System (Direct Route to Energy Drink)
    // =========================================================================
    const renderSupplyCache = (cache) => {
        addLog(`[CACHE DISCOVERED] Found ${cache.title}!`, 'encounter');
        encounterCard.innerHTML = `
            <div class="encounter-header-group">
                <span class="encounter-badge">🥤 SUPPLY CACHE &bull; ENERGY DRINK FOUND</span>
                <h2 class="encounter-title">${cache.title}</h2>
            </div>
            <p class="encounter-narrative">${cache.desc}</p>
            <div class="encounter-actions">
                <button class="action-btn" id="crackCacheLockBtn">🧪 Solve Arduino Decryption (Claim Drink) &rarr;</button>
                <button class="action-btn" id="ignoreCacheBtn" style="opacity: 0.6;">Bypass Terminal</button>
            </div>
        `;

        document.getElementById('crackCacheLockBtn').addEventListener('click', () => {
            startArduinoQuiz(cache.title);
        });

        document.getElementById('ignoreCacheBtn').addEventListener('click', () => {
            renderStandbyView();
        });
    };

    // =========================================================================
    // Arduino Guessing Mini-Game (Component or Code Syntax)
    // =========================================================================
    const startArduinoQuiz = (sourceTitle) => {
        state.inQuiz = true;

        // Check if player has the 8-Channel USB Logic Analyzer (Tool ID 46) to auto-solve
        const logicAnalyzer = state.inventory.find(it => it.id === 46 && it.currentDurability > 0);
        let autoSolveBtnHtml = '';

        if (logicAnalyzer) {
            autoSolveBtnHtml = `
                <button class="btn btn-secondary btn-sm" id="autoSolveWithToolBtn" style="margin-bottom: 0.75rem;">
                    🔌 Auto-Decrypt with Logic Analyzer (${logicAnalyzer.currentDurability} dur left)
                </button>
            `;
        }

        // Pick random question from pool
        const question = arduinoQuizPool[Math.floor(Math.random() * arduinoQuizPool.length)];
        state.currentQuiz = question;

        // Shuffle options
        const shuffledOptions = [...question.options].sort(() => Math.random() - 0.5);

        encounterCard.innerHTML = `
            <div class="quiz-wrapper">
                <div class="encounter-header-group">
                    <span class="encounter-badge">🧪 ARDUINO SECURITY TERMINAL &bull; ENERGY DRINK (+25%)</span>
                    <h2 class="encounter-title">Cryptographic Decryption Terminal</h2>
                </div>

                <div class="quiz-hazard-alert">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                    <span><strong>Rule:</strong> Correct answer earns <strong>+25% Energy Drink</strong>. Wrong answer gives 0 Energy (with a <strong>5% rare hazard chance</strong> of High-Voltage Capacitor Shock: <strong>-40% Energy</strong>).</span>
                </div>

                ${autoSolveBtnHtml}

                <div class="quiz-question-box">
                    <span class="quiz-question-type">${question.type}</span>
                    <div class="quiz-question-text">${question.question}</div>
                    ${question.code ? `<pre class="quiz-code-snippet"><code>${escapeHtml(question.code)}</code></pre>` : ''}
                </div>

                <div class="quiz-options-grid" id="quizOptionsGrid">
                    ${shuffledOptions.map((opt, idx) => `
                        <button class="quiz-opt-btn" data-answer="${escapeHtml(opt)}">
                            <span class="opt-badge">${String.fromCharCode(65 + idx)}</span>
                            <span>${escapeHtml(opt)}</span>
                        </button>
                    `).join('')}
                </div>
            </div>
        `;

        if (logicAnalyzer) {
            document.getElementById('autoSolveWithToolBtn').addEventListener('click', () => {
                logicAnalyzer.currentDurability = Math.max(0, logicAnalyzer.currentDurability - 5);
                addLog(`[LOGIC ANALYZER] Captured I2C address handshake packets! Auto-decrypted lock.`, 'action');
                handleQuizAnswer(question.correct, question);
            });
        }

        document.querySelectorAll('.quiz-opt-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const chosen = btn.getAttribute('data-answer');
                handleQuizAnswer(chosen, question);
            });
        });
    };

    // Process Quiz Answer
    const handleQuizAnswer = (chosen, question) => {
        state.inQuiz = false;
        const isCorrect = (chosen === question.correct);

        if (isCorrect) {
            // Success: +25% Energy Drink
            const prevEnergy = state.energy;
            state.energy = Math.min(state.maxEnergy, state.energy + 25);
            state.drinksFound++;
            updateUI();

            addLog(`[SUCCESS] Decryption passed! Claimed Energy Drink (+25% Energy). Reserve: ${state.energy}%.`, 'encounter');

            encounterCard.innerHTML = `
                <div class="result-card">
                    <div class="encounter-header-group">
                        <span class="encounter-badge">✅ ACCESS GRANTED &bull; ENERGY RECOVERED</span>
                        <h2 class="encounter-title">Energy Drink Consumed! (+25% Energy)</h2>
                    </div>

                    <div class="result-explanation-box">
                        <p style="margin: 0 0 0.5rem 0;"><strong>Correct:</strong> ${escapeHtml(question.correct)}</p>
                        <p style="margin: 0 0 0.85rem 0; color: var(--color-gray);">${question.explanation}</p>
                        <p style="margin: 0; color: #ffffff;">
                            The pressurized lock hissed open with cryogenic vapor! You drank the chilled electrolyte beverage, boosting your suit energy by <strong>+25%</strong> (${prevEnergy}% &rarr; <strong>${state.energy}%</strong>).
                        </p>
                    </div>

                    <div class="encounter-actions">
                        <button class="action-btn" id="resumeAfterQuizBtn">Resume Expedition (WASD) &rarr;</button>
                    </div>
                </div>
            `;

            document.getElementById('resumeAfterQuizBtn').addEventListener('click', () => {
                renderStandbyView();
            });
        } else {
            // Check if player has Bleeder Resistor Stick (Tool ID 47) which blocks 5% shock
            const bleederStick = state.inventory.find(it => it.id === 47 && it.currentDurability > 0);
            const isCatastrophic = Math.random() < 0.05;

            if (isCatastrophic && !bleederStick) {
                // 5% Catastrophic Short Circuit (-40 Energy)
                state.energy = Math.max(0, state.energy - 40);
                updateUI();

                addLog(`[CRITICAL HAZARD] ⚡ High-voltage capacitor short! -40% Energy lost! Reserve: ${state.energy}%.`, 'system');

                if (state.energy <= 0) {
                    triggerGameOver(`A catastrophic high-voltage capacitor explosion (5% rare hazard) completely drained and fried your suit power core (-40% Energy).`);
                    return;
                }

                encounterCard.innerHTML = `
                    <div class="result-card">
                        <div class="encounter-header-group">
                            <span class="encounter-badge">⚡ CRITICAL VOLTAGE OVERLOAD (5% RARE HAZARD)</span>
                            <h2 class="encounter-title">Capacitor Explosion: -40% Energy!</h2>
                        </div>

                        <div class="result-explanation-box hazard-alert">
                            <p style="margin: 0 0 0.5rem 0; color: #ffffff;"><strong>INCORRECT! (Rare 5% Failure Triggered)</strong></p>
                            <p style="margin: 0 0 0.5rem 0;">You chose: <em>${escapeHtml(chosen)}</em>. The correct answer was: <strong>${escapeHtml(question.correct)}</strong>.</p>
                            <p style="margin: 0 0 0.85rem 0; color: var(--color-gray);">${question.explanation}</p>
                            <p style="margin: 0; color: #ffffff;">
                                The security tamper interlock misfired into a high-voltage electrolytic capacitor! A blinding arc of electrical fire exploded directly into your suit telemetry circuits, violently draining <strong>40% Energy</strong>!
                            </p>
                        </div>

                        <div class="encounter-actions">
                            <button class="action-btn" id="recoverFromShockBtn">Recover Suit &amp; Continue (WASD) &rarr;</button>
                        </div>
                    </div>
                `;

                document.getElementById('recoverFromShockBtn').addEventListener('click', () => {
                    renderStandbyView();
                });
            } else {
                // Standard Failure: 0 Energy gained
                if (isCatastrophic && bleederStick) {
                    bleederStick.currentDurability = Math.max(0, bleederStick.currentDurability - 5);
                    addLog(`[BLEEDER RESISTOR] Your High-Voltage Bleeder Stick grounded the 5% electrical shock safely!`, 'action');
                }

                addLog(`[LOCK JAMMED] Incorrect answer. The security seal jammed. 0 Energy gained. Correct: "${question.correct}".`, 'system');

                encounterCard.innerHTML = `
                    <div class="result-card">
                        <div class="encounter-header-group">
                            <span class="encounter-badge">❌ ACCESS DENIED &bull; CONTAINER JAMMED</span>
                            <h2 class="encounter-title">Security Seal Permanently Locked</h2>
                        </div>

                        <div class="result-explanation-box">
                            <p style="margin: 0 0 0.5rem 0;">You chose: <em>${escapeHtml(chosen)}</em>. The correct answer was: <strong>${escapeHtml(question.correct)}</strong>.</p>
                            <p style="margin: 0 0 0.85rem 0; color: var(--color-gray);">${question.explanation}</p>
                            <p style="margin: 0; color: #e4e4e7;">
                                The container's tamper prevention system engaged, purging the canister lock. No energy recovered (0% gained).
                            </p>
                        </div>

                        <div class="encounter-actions">
                            <button class="action-btn" id="continueAfterFailBtn">Continue Exploring (WASD) &rarr;</button>
                        </div>
                    </div>
                `;

                document.getElementById('continueAfterFailBtn').addEventListener('click', () => {
                    renderStandbyView();
                });
            }
        }
    };

    // =========================================================================
    // Lore / Hardware Discovery Encounters
    // =========================================================================
    const renderLoreEncounter = (lore) => {
        addLog(`[DISCOVERY] ${lore.title}`, 'encounter');

        encounterCard.innerHTML = `
            <div class="encounter-header-group">
                <span class="encounter-badge">${lore.badge}</span>
                <h2 class="encounter-title">${lore.title}</h2>
            </div>
            <p class="encounter-narrative">${lore.desc}</p>
            <div class="encounter-actions" id="loreActionsContainer">
                ${lore.actions.map((act, idx) => `
                    <button class="action-btn lore-act-btn" data-act-idx="${idx}">
                        ${escapeHtml(act.text)}
                    </button>
                `).join('')}
            </div>
        `;

        document.querySelectorAll('.lore-act-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const idx = parseInt(btn.getAttribute('data-act-idx'), 10);
                const chosen = lore.actions[idx];

                if (chosen.energyChange) {
                    state.energy = Math.min(state.maxEnergy, Math.max(0, state.energy + chosen.energyChange));
                    updateUI();
                }

                addLog(`[ACTION] ${chosen.outcome}`, 'action');

                if (state.energy <= 0) {
                    triggerGameOver("Energy depleted during environmental hazard.");
                    return;
                }

                encounterCard.innerHTML = `
                    <div class="encounter-header-group">
                        <span class="encounter-badge">${lore.badge} &bull; RESOLVED</span>
                        <h2 class="encounter-title">${lore.title}</h2>
                    </div>
                    <p class="encounter-narrative">${chosen.outcome}</p>
                    <div class="encounter-actions">
                        <button class="action-btn" id="resumeLoreBtn">Resume Expedition (WASD) &rarr;</button>
                    </div>
                `;

                document.getElementById('resumeLoreBtn').addEventListener('click', () => {
                    renderStandbyView();
                });
            });
        });
    };

    // =========================================================================
    // Standby & Game Over Views
    // =========================================================================
    const renderStandbyView = () => {
        state.inCombat = false;
        state.inQuiz = false;
        state.currentEnemy = null;
        state.currentQuiz = null;

        encounterCard.innerHTML = `
            <div class="encounter-header-group">
                <span class="encounter-badge">EXPEDITION RADAR ACTIVE</span>
                <h2 class="encounter-title">Navigating Sector [${state.playerX}, ${state.playerY}]</h2>
            </div>
            <p class="encounter-narrative">
                You stand in charted sector terrain. Four vectors extend into the wasteland: North, South, East, and West. As you move beyond the viewport, the 9x9 radar window smoothly scrolls with you. Watch your energy reserves (-2% per step) and loot hostiles to survive!
            </p>
            <div class="encounter-actions">
                <span class="status-indicator live"><span class="blink-dot"></span> Radar Grid Online &bull; Awaiting Direction (WASD)</span>
            </div>
        `;
    };

    const triggerGameOver = (reason) => {
        // Check if player has Emergency Telemetry Reboot Stim (Item ID 70)
        const reviveStimIdx = state.inventory.findIndex(it => it.id === 70);
        if (reviveStimIdx !== -1) {
            state.inventory.splice(reviveStimIdx, 1);
            state.energy = 50;
            updateUI();
            addLog(`[AUTO-REVIVE] ⚡ Emergency Telemetry Reboot Stim engaged! Restored 50% Energy!`, 'encounter');
            renderStandbyView();
            return;
        }

        state.isGameOver = true;
        state.inCombat = false;
        state.inQuiz = false;

        addLog(`[SYSTEM FAILURE] 💀 Power depleted to 0%. Life support shut down.`, 'system');

        encounterCard.innerHTML = `
            <div class="game-over-container">
                <div class="game-over-banner">💀</div>
                <h2 class="game-over-title">Critical Power Outage (0% Energy)</h2>
                <p class="game-over-desc">
                    ${escapeHtml(reason)}
                </p>

                <div class="game-over-stats-summary">
                    <div class="summary-item">
                        <span>Steps</span>
                        <span>${state.steps}</span>
                    </div>
                    <div class="summary-item">
                        <span>Drinks Drunk</span>
                        <span>${state.drinksFound}</span>
                    </div>
                    <div class="summary-item">
                        <span>Loot Stored</span>
                        <span>${state.inventory.length} Items</span>
                    </div>
                    <div class="summary-item">
                        <span>Final Sector</span>
                        <span>[${state.playerX}, ${state.playerY}]</span>
                    </div>
                </div>

                <button class="btn btn-primary restart-big-btn" id="gameOverRestartBtn">
                    ⚡ Reboot Power Core &amp; Restart Journey
                </button>
            </div>
        `;

        document.getElementById('gameOverRestartBtn').addEventListener('click', restartGame);
    };

    // Reset Game State
    const restartGame = () => {
        state.playerX = 5;
        state.playerY = 5;
        state.camX = 1;
        state.camY = 1;
        state.heading = 'NORTH';
        state.steps = 0;
        state.energy = 100;
        state.drinksFound = 0;
        state.encountersCount = 0;
        state.visited = new Set(['5-5']);
        state.isGameOver = false;
        state.inCombat = false;
        state.inQuiz = false;
        state.currentEnemy = null;
        state.currentQuiz = null;

        // Starter Items: Padded Jumpsuit + Precision Wire Stripper
        state.inventory = [
            getItemById(26), // Padded Scavenger Jumpsuit
            getItemById(41)  // Precision Wire Stripper
        ].filter(Boolean);

        state.equippedWeapon = null;
        state.equippedArmor = state.inventory[0]; // Equip padded suit
        state.ammoPouch = {
            "9mm": 6,
            "5.56mm": 0,
            "12-Gauge": 0,
            "Energy Cell": 0,
            ".50 BMG": 0,
            "Plasma Core": 0
        };

        historyLog.innerHTML = `
            <div class="log-entry system">[SYSTEM] Navigation rebooted. Suit energy restored to 100%.</div>
            <div class="log-entry">[INIT] Awaiting player vector input (WASD).</div>
        `;

        initRadar();
        renderStandbyView();
        updateUI();
    };

    // Helper to safely escape HTML strings
    const escapeHtml = (str) => {
        if (!str) return '';
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    };

    // =========================================================================
    // Inventory Modal UI Management
    // =========================================================================
    const openInventory = () => {
        inventoryModal.style.display = 'flex';
        renderInventoryGrid();
    };

    const closeInventory = () => {
        inventoryModal.style.display = 'none';
    };

    const renderInventoryGrid = () => {
        // Tab Counts
        document.getElementById('tabCountAll').textContent = state.inventory.length;
        document.getElementById('tabCountWeapons').textContent = state.inventory.filter(i => i.category === 'WEAPON').length;
        document.getElementById('tabCountAmmo').textContent = state.inventory.filter(i => i.category === 'AMMO').length;
        document.getElementById('tabCountArmor').textContent = state.inventory.filter(i => i.category === 'ARMOR').length;
        document.getElementById('tabCountTools').textContent = state.inventory.filter(i => i.category === 'TOOL').length;
        document.getElementById('tabCountElec').textContent = state.inventory.filter(i => i.category === 'ELECTRONIC').length;
        document.getElementById('tabCountConsumables').textContent = state.inventory.filter(i => i.category === 'CONSUMABLE').length;

        // Filter items
        const filtered = state.activeFilterTab === 'all'
            ? state.inventory
            : state.inventory.filter(it => it.category === state.activeFilterTab);

        if (filtered.length === 0) {
            inventoryGrid.innerHTML = `
                <div class="empty-inv-msg">
                    No items found in this backpack category.<br>Loot defeated hostiles (Soldiers, Bandits, Scavengers) to acquire gear!
                </div>
            `;
            return;
        }

        inventoryGrid.innerHTML = filtered.map((item, idx) => {
            const isEquippedWeapon = state.equippedWeapon && state.equippedWeapon.id === item.id;
            const isEquippedArmor = state.equippedArmor && state.equippedArmor.id === item.id;
            const isEquipped = isEquippedWeapon || isEquippedArmor;

            // Stats info
            let statsHtml = '';
            if (item.category === 'WEAPON') {
                statsHtml = `<span>DMG: ${item.damageMin}-${item.damageMax} • ${item.subType}</span>`;
                if (item.ammoType) statsHtml += `<span>Requires: ${item.ammoType}</span>`;
            } else if (item.category === 'ARMOR') {
                statsHtml = `<span>Ballistic: ${Math.round(item.ballisticResist * 100)}% • Energy: ${Math.round(item.energyResist * 100)}%</span>`;
                if (item.stopsOneShot) statsHtml += `<span style="color: #ffffff; font-weight: 700;">★ STOPS SOLDIER 1-SHOT</span>`;
            } else if (item.category === 'AMMO') {
                statsHtml = `<span>Quantity: ${item.quantity || 1} rounds (${item.ammoType})</span>`;
            } else if (item.energyRestore) {
                statsHtml = `<span>Restores: +${item.energyRestore}% Energy</span>`;
            }

            // Durability Bar
            let durBarHtml = '';
            if (item.maxDurability) {
                const curDur = item.currentDurability !== undefined ? item.currentDurability : item.maxDurability;
                const pct = Math.round((curDur / item.maxDurability) * 100);
                durBarHtml = `
                    <div style="font-size: 0.68rem; margin-top: 0.35rem;">
                        Durability: ${curDur} / ${item.maxDurability} (${pct}%)
                        <div class="durability-bar-track">
                            <div class="durability-bar-fill" style="width: ${pct}%;"></div>
                        </div>
                    </div>
                `;
            }

            // Action Buttons
            let actionBtnHtml = '';
            if (item.category === 'WEAPON') {
                actionBtnHtml = isEquipped
                    ? `<button class="item-act-btn equipped-btn">Equipped Weapon</button>`
                    : `<button class="item-act-btn" onclick="equipItem(${item.id})">Equip Weapon</button>`;
            } else if (item.category === 'ARMOR') {
                actionBtnHtml = isEquipped
                    ? `<button class="item-act-btn equipped-btn">Equipped Armor</button>`
                    : `<button class="item-act-btn" onclick="equipItem(${item.id})">Equip Armor</button>`;
            } else if (item.category === 'CONSUMABLE') {
                actionBtnHtml = `<button class="item-act-btn" onclick="useConsumable(${item.id})">Consume</button>`;
            } else if (item.repairBonus) {
                actionBtnHtml = `<button class="item-act-btn" onclick="useRepairTool(${item.id})">Repair Equipped Gear (+${item.repairBonus})</button>`;
            }

            return `
                <div class="item-card ${isEquipped ? 'equipped' : ''}">
                    <div class="item-header">
                        <span class="item-name">${escapeHtml(item.name)}</span>
                        <span class="item-badge rarity-${item.rarity}">${item.rarity}</span>
                    </div>
                    <div class="item-desc">${escapeHtml(item.desc)}</div>
                    <div class="item-stats-strip">
                        ${statsHtml}
                        ${durBarHtml}
                    </div>
                    <div class="item-actions">
                        ${actionBtnHtml}
                    </div>
                </div>
            `;
        }).join('');
    };

    // Global Action Handlers for Inventory Buttons
    window.equipItem = (itemId) => {
        const item = state.inventory.find(it => it.id === itemId);
        if (!item) return;

        if (item.category === 'WEAPON') {
            state.equippedWeapon = item;
            addLog(`[EQUIP] Equipped weapon: ${item.name}!`, 'action');
        } else if (item.category === 'ARMOR') {
            state.equippedArmor = item;
            addLog(`[EQUIP] Equipped armor: ${item.name}! Ballistic protection: ${Math.round(item.ballisticResist * 100)}%.`, 'action');
        }

        updateUI();
        renderInventoryGrid();
    };

    window.useConsumable = (itemId) => {
        const itemIdx = state.inventory.findIndex(it => it.id === itemId);
        if (itemIdx === -1) return;
        const item = state.inventory[itemIdx];

        if (item.energyRestore) {
            state.energy = Math.min(state.maxEnergy, state.energy + item.energyRestore);
            addLog(`[CONSUME] Used ${item.name}! Restored +${item.energyRestore}% Energy. Current: ${state.energy}%.`, 'encounter');
        }

        if (item.armorRepair && state.equippedArmor) {
            state.equippedArmor.currentDurability = Math.min(state.equippedArmor.maxDurability, state.equippedArmor.currentDurability + item.armorRepair);
            addLog(`[MED-GEL] Repaired ${state.equippedArmor.name} by +${item.armorRepair} Durability!`, 'action');
        }

        // Remove single-use consumable
        state.inventory.splice(itemIdx, 1);
        updateUI();
        renderInventoryGrid();
    };

    window.useRepairTool = (toolId) => {
        const tool = state.inventory.find(it => it.id === toolId);
        if (!tool || tool.currentDurability <= 0) return;

        let repaired = false;
        if (state.equippedWeapon && state.equippedWeapon.currentDurability < state.equippedWeapon.maxDurability) {
            state.equippedWeapon.currentDurability = Math.min(state.equippedWeapon.maxDurability, state.equippedWeapon.currentDurability + tool.repairBonus);
            repaired = true;
        }

        if (state.equippedArmor && state.equippedArmor.currentDurability < state.equippedArmor.maxDurability) {
            state.equippedArmor.currentDurability = Math.min(state.equippedArmor.maxDurability, state.equippedArmor.currentDurability + tool.repairBonus);
            repaired = true;
        }

        if (repaired) {
            tool.currentDurability = Math.max(0, tool.currentDurability - 5);
            addLog(`[MAINTENANCE] Used ${tool.name} to repair equipped gear (+${tool.repairBonus} Durability)!`, 'action');
            updateUI();
            renderInventoryGrid();
        } else {
            alert("Your equipped weapon and armor are already at maximum durability!");
        }
    };

    // Filter tab clicks
    invTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            invTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            state.activeFilterTab = tab.getAttribute('data-tab');
            renderInventoryGrid();
        });
    });

    if (inventoryBtn) inventoryBtn.addEventListener('click', openInventory);
    if (manageLoadoutBtn) manageLoadoutBtn.addEventListener('click', openInventory);
    if (closeInventoryBtn) closeInventoryBtn.addEventListener('click', closeInventory);

    // =========================================================================
    // Event Listeners & Keybindings
    // =========================================================================
    document.addEventListener('keydown', (e) => {
        const key = e.key.toLowerCase();
        if (['w', 'a', 's', 'd', 'arrowup', 'arrowdown', 'arrowleft', 'arrowright'].includes(key)) {
            e.preventDefault();
        }

        if (key === 'i') {
            if (inventoryModal.style.display === 'flex') closeInventory();
            else openInventory();
            return;
        }

        if (key === 'escape' && inventoryModal.style.display === 'flex') {
            closeInventory();
            return;
        }

        if (key === 'w' || key === 'arrowup') move('north');
        else if (key === 's' || key === 'arrowdown') move('south');
        else if (key === 'a' || key === 'arrowleft') move('west');
        else if (key === 'd' || key === 'arrowright') move('east');
    });

    if (btnUp) btnUp.addEventListener('click', () => move('north'));
    if (btnDown) btnDown.addEventListener('click', () => move('south'));
    if (btnLeft) btnLeft.addEventListener('click', () => move('west'));
    if (btnRight) btnRight.addEventListener('click', () => move('east'));

    if (clearLogBtn) {
        clearLogBtn.addEventListener('click', () => {
            historyLog.innerHTML = `<div class="log-entry system">[SYSTEM] Terminal history cleared.</div>`;
        });
    }

    if (restartGameBtn) {
        restartGameBtn.addEventListener('click', restartGame);
    }

    // Initialize Game on Launch
    initRadar();
    restartGame();
});
