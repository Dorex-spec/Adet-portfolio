/**
 * ADET 211 Experiment 01: Complete 70-Item Database
 * Weapons, Ammunition, Ballistic Armor, Tools, Electronics, and Consumables
 */

const ITEMS_DATABASE = [
    // =========================================================================
    // Category A: Weapons & Firearms (IDs 1 - 15)
    // =========================================================================
    {
        id: 1,
        name: "Scrap Arc Taser",
        category: "WEAPON",
        subType: "MELEE",
        rarity: "COMMON",
        damageMin: 18,
        damageMax: 24,
        ammoType: null,
        maxDurability: 35,
        desc: "A modified grounding probe wired to a high-voltage pulse capacitor. Stuns targets on contact."
    },
    {
        id: 2,
        name: "High-Voltage Stun Baton",
        category: "WEAPON",
        subType: "MELEE",
        rarity: "UNCOMMON",
        damageMin: 22,
        damageMax: 30,
        ammoType: null,
        maxDurability: 45,
        desc: "Insulated riot baton equipped with an internal 10kV step-up transformer."
    },
    {
        id: 3,
        name: "Heavy Grounding Crowbar",
        category: "WEAPON",
        subType: "MELEE",
        rarity: "COMMON",
        damageMin: 20,
        damageMax: 28,
        ammoType: null,
        maxDurability: 60,
        desc: "Solid forged carbon steel pry tool. Functions reliably as both an impact club and salvage lever."
    },
    {
        id: 4,
        name: "Monofilament Scrap Blade",
        category: "WEAPON",
        subType: "MELEE",
        rarity: "RARE",
        damageMin: 26,
        damageMax: 36,
        ammoType: null,
        maxDurability: 30,
        desc: "A surgical edge salvaged from industrial cutter robots. Delivers precision armor-piercing lacerations."
    },
    {
        id: 5,
        name: "Improvised Pipe Pistol",
        category: "WEAPON",
        subType: "FIREARM",
        rarity: "COMMON",
        damageMin: 38,
        damageMax: 48,
        ammoType: "9mm",
        maxDurability: 25,
        desc: "Crude firearm machined from galvanized hydraulic tubing and a spring nail striker. Uses 9mm rounds."
    },
    {
        id: 6,
        name: "Enforcer 9mm Service Handgun",
        category: "WEAPON",
        subType: "FIREARM",
        rarity: "UNCOMMON",
        damageMin: 45,
        damageMax: 58,
        ammoType: "9mm",
        maxDurability: 50,
        desc: "Standard sidearm of outpost defense security guards. Reliable, accurate, and fires 9mm FMJ ammunition."
    },
    {
        id: 7,
        name: "Tactical PDW-9 Submachine Gun",
        category: "WEAPON",
        subType: "FIREARM",
        rarity: "RARE",
        damageMin: 52,
        damageMax: 65,
        ammoType: "9mm",
        maxDurability: 60,
        desc: "Compact personal defense weapon engineered for rapid 3-round burst suppression."
    },
    {
        id: 8,
        name: "Rustland 12-Gauge Sawed-off",
        category: "WEAPON",
        subType: "FIREARM",
        rarity: "UNCOMMON",
        damageMin: 70,
        damageMax: 90,
        ammoType: "12-Gauge",
        maxDurability: 30,
        desc: "Dual-barrel break-action shotgun with cut barrels for point-blank tactical spread."
    },
    {
        id: 9,
        name: "Trench Combat Shotgun",
        category: "WEAPON",
        subType: "FIREARM",
        rarity: "RARE",
        damageMin: 85,
        damageMax: 110,
        ammoType: "12-Gauge",
        maxDurability: 55,
        desc: "Pump-action military combat shotgun with heat shield shroud and high kinetic knockback."
    },
    {
        id: 10,
        name: "Patrol Marksman 5.56 Carbine",
        category: "WEAPON",
        subType: "FIREARM",
        rarity: "RARE",
        damageMin: 68,
        damageMax: 85,
        ammoType: "5.56mm",
        maxDurability: 70,
        desc: "Accurate semi-automatic patrol rifle chambered in military 5.56×45mm NATO."
    },
    {
        id: 11,
        name: "Outpost Assault Rifle AR-55",
        category: "WEAPON",
        subType: "FIREARM",
        rarity: "MILITARY",
        damageMin: 78,
        damageMax: 98,
        ammoType: "5.56mm",
        maxDurability: 65,
        desc: "Standard service assault rifle carried by Outpost Enforcer Soldiers. Fires high-velocity 5.56mm rounds."
    },
    {
        id: 12,
        name: "High-Velocity AMR Sniper",
        category: "WEAPON",
        subType: "FIREARM",
        rarity: "MILITARY",
        damageMin: 120,
        damageMax: 150,
        ammoType: ".50 BMG",
        maxDurability: 40,
        desc: "Heavy bolt-action anti-materiel cannon capable of punching through reinforced bunkers."
    },
    {
        id: 13,
        name: "Prototype Laser Pulse Pistol",
        category: "WEAPON",
        subType: "ENERGY_FIREARM",
        rarity: "RARE",
        damageMin: 60,
        damageMax: 80,
        ammoType: "Energy Cell",
        maxDurability: 50,
        desc: "Experimental sidearm firing focused 1064nm laser pulses powered by micro-energy cells."
    },
    {
        id: 14,
        name: "Overclocked EMP Rail Carbine",
        category: "WEAPON",
        subType: "ENERGY_FIREARM",
        rarity: "MILITARY",
        damageMin: 90,
        damageMax: 125,
        ammoType: "Energy Cell",
        maxDurability: 45,
        desc: "Electromagnetic accelerator that launches hyper-velocity inductive projectiles, frying hostile circuits."
    },
    {
        id: 15,
        name: "Military Plasma Discharge Rifle",
        category: "WEAPON",
        subType: "ENERGY_FIREARM",
        rarity: "LEGENDARY",
        damageMin: 110,
        damageMax: 145,
        ammoType: "Plasma Core",
        maxDurability: 60,
        desc: "Cutting-edge heavy armament unleashing superheated ionized plasma bolts."
    },

    // =========================================================================
    // Category B: Ammunition & Power Packs (IDs 16 - 25)
    // =========================================================================
    {
        id: 16,
        name: "9mm FMJ Handgun Rounds",
        category: "AMMO",
        ammoType: "9mm",
        quantity: 12,
        rarity: "COMMON",
        desc: "Box of 12 full metal jacket 9×19mm rounds compatible with standard handguns and submachine guns."
    },
    {
        id: 17,
        name: "9mm Hollow-Point Mag",
        category: "AMMO",
        ammoType: "9mm",
        quantity: 8,
        rarity: "UNCOMMON",
        desc: "Box of 8 expanding hollow-point 9mm cartridges engineered for maximum kinetic stopping power."
    },
    {
        id: 18,
        name: "5.56×45mm NATO Magazine",
        category: "AMMO",
        ammoType: "5.56mm",
        quantity: 20,
        rarity: "UNCOMMON",
        desc: "Standard 20-round military box magazine filled with high-velocity rifle cartridges."
    },
    {
        id: 19,
        name: "5.56mm Armor-Piercing Pack",
        category: "AMMO",
        ammoType: "5.56mm",
        quantity: 15,
        rarity: "MILITARY",
        desc: "Hardened tungsten carbide core rifle penetrators designed to defeat heavy soldier armor."
    },
    {
        id: 20,
        name: "12-Gauge 00 Buckshot Shells",
        category: "AMMO",
        ammoType: "12-Gauge",
        quantity: 6,
        rarity: "COMMON",
        desc: "Heavy combat shotgun shells loaded with 9 lead pellets for close-range devastation."
    },
    {
        id: 21,
        name: "12-Gauge High-Pressure Slugs",
        category: "AMMO",
        ammoType: "12-Gauge",
        quantity: 4,
        rarity: "RARE",
        desc: "Solid lead rifled slugs designed for pinpoint single-target ballistic trauma."
    },
    {
        id: 22,
        name: ".50 BMG Heavy AMR Rounds",
        category: "AMMO",
        ammoType: ".50 BMG",
        quantity: 3,
        rarity: "MILITARY",
        desc: "Heavy 660-grain anti-materiel cartridges for high-caliber sniper rifles."
    },
    {
        id: 23,
        name: "Rechargeable Micro-Energy Cells",
        category: "AMMO",
        ammoType: "Energy Cell",
        quantity: 10,
        rarity: "UNCOMMON",
        desc: "Compact lithium-polymer energy charges powering laser pistols and EMP rail carbines."
    },
    {
        id: 24,
        name: "Overcharged Capacitor Pack",
        category: "AMMO",
        ammoType: "Energy Cell",
        quantity: 15,
        rarity: "RARE",
        desc: "High-density capacitor bank storing rapid discharge energy for military prototypes."
    },
    {
        id: 25,
        name: "Stabilized Heavy Plasma Core",
        category: "AMMO",
        ammoType: "Plasma Core",
        quantity: 5,
        rarity: "LEGENDARY",
        desc: "Hermetically sealed magnetic bottle housing ionized deuterium plasma."
    },

    // =========================================================================
    // Category C: Armor & Ballistic Protection (IDs 26 - 40)
    // Prevents Soldier One-Shot Fatalities!
    // =========================================================================
    {
        id: 26,
        name: "Padded Scavenger Jumpsuit",
        category: "ARMOR",
        ballisticResist: 0.15,
        energyResist: 0.10,
        maxDurability: 30,
        rarity: "COMMON",
        stopsOneShot: false,
        desc: "Quilted canvas coveralls lined with scrap rubber. Provides slight resistance to blunt impact."
    },
    {
        id: 27,
        name: "Reinforced Leather Raider Vest",
        category: "ARMOR",
        ballisticResist: 0.25,
        energyResist: 0.15,
        maxDurability: 40,
        rarity: "COMMON",
        stopsOneShot: false,
        desc: "Thick cured hide studded with brass rivets and copper plating."
    },
    {
        id: 28,
        name: "Anti-Static Technician Smock",
        category: "ARMOR",
        ballisticResist: 0.10,
        energyResist: 0.40,
        maxDurability: 35,
        rarity: "UNCOMMON",
        stopsOneShot: false,
        desc: "Grounding fabric woven with conductive carbon filament to dissipate static sparks."
    },
    {
        id: 29,
        name: "Scrap Metal Plate Rig",
        category: "ARMOR",
        ballisticResist: 0.40,
        energyResist: 0.10,
        maxDurability: 50,
        rarity: "UNCOMMON",
        stopsOneShot: false,
        desc: "Welded appliance sheet metal strapped across chest and shoulders. Heavy but deflects light shrapnel."
    },
    {
        id: 30,
        name: "Police Kevlar Tactical Vest",
        category: "ARMOR",
        ballisticResist: 0.60,
        energyResist: 0.25,
        maxDurability: 65,
        rarity: "RARE",
        stopsOneShot: true,
        desc: "Multi-layered aramid fabric armor designed to stop high-velocity handgun and carbine rounds. STOPS SOLDIER ONE-SHOTS!"
    },
    {
        id: 31,
        name: "Ceramic Ballistic SAPI Plate",
        category: "ARMOR",
        ballisticResist: 0.75,
        energyResist: 0.30,
        maxDurability: 80,
        rarity: "RARE",
        stopsOneShot: true,
        desc: "Military silicon carbide ceramic insert plate that shatters incoming rifle bullets. STOPS SOLDIER ONE-SHOTS!"
    },
    {
        id: 32,
        name: "Decommissioned Flak Jacket",
        category: "ARMOR",
        ballisticResist: 0.65,
        energyResist: 0.20,
        maxDurability: 70,
        rarity: "RARE",
        stopsOneShot: true,
        desc: "Nylon ballistic armor jacket with high tensile weave. STOPS SOLDIER ONE-SHOTS!"
    },
    {
        id: 33,
        name: "Outpost Enforcer Heavy Plate",
        category: "ARMOR",
        ballisticResist: 0.85,
        energyResist: 0.35,
        maxDurability: 95,
        rarity: "MILITARY",
        stopsOneShot: true,
        desc: "Hardened steel and composite torso armor issued to security enforcers. STOPS SOLDIER ONE-SHOTS!"
    },
    {
        id: 34,
        name: "Hazmat Environmental Suit",
        category: "ARMOR",
        ballisticResist: 0.20,
        energyResist: 0.60,
        maxDurability: 50,
        rarity: "UNCOMMON",
        stopsOneShot: false,
        desc: "Vulcanized impermeable biohazard suit with complete ozone and static isolation."
    },
    {
        id: 35,
        name: "Faraday Mesh Grounding Coat",
        category: "ARMOR",
        ballisticResist: 0.30,
        energyResist: 0.70,
        maxDurability: 60,
        rarity: "RARE",
        stopsOneShot: false,
        desc: "Fine copper mesh longcoat acting as a continuous electrical shield against arc discharge."
    },
    {
        id: 36,
        name: "Composite Titanium Ballistic Shell",
        category: "ARMOR",
        ballisticResist: 0.90,
        energyResist: 0.45,
        maxDurability: 120,
        rarity: "MILITARY",
        stopsOneShot: true,
        desc: "Advanced aerospace titanium alloy laminate providing supreme bullet resistance. STOPS SOLDIER ONE-SHOTS!"
    },
    {
        id: 37,
        name: "Portable Riot Ballistic Shield",
        category: "ARMOR",
        ballisticResist: 0.70,
        energyResist: 0.20,
        maxDurability: 85,
        rarity: "RARE",
        stopsOneShot: true,
        desc: "Reinforced transparent polycarbonate and alloy barricade shield. STOPS SOLDIER ONE-SHOTS!"
    },
    {
        id: 38,
        name: "Nanoweave Tactical Vest",
        category: "ARMOR",
        ballisticResist: 0.55,
        energyResist: 0.50,
        maxDurability: 75,
        rarity: "RARE",
        stopsOneShot: true,
        desc: "Carbon nanotube matrix that instantly hardens upon kinetic impact. STOPS SOLDIER ONE-SHOTS!"
    },
    {
        id: 39,
        name: "Cybernetic Alloy Exoskeleton",
        category: "ARMOR",
        ballisticResist: 0.85,
        energyResist: 0.60,
        maxDurability: 110,
        rarity: "MILITARY",
        stopsOneShot: true,
        desc: "Motorized combat frame with armored chassis joints. Absorbent hydraulic dampeners mitigate gunshots."
    },
    {
        id: 40,
        name: "Aegis Mk-IV Modular Power Armor",
        category: "ARMOR",
        ballisticResist: 0.95,
        energyResist: 0.80,
        maxDurability: 150,
        rarity: "LEGENDARY",
        stopsOneShot: true,
        desc: "The pinnacle of military battlefield protection. Complete kinetic and energy immunity barrier."
    },

    // =========================================================================
    // Category D: Tools, Instruments & Field Hardware (IDs 41 - 55)
    // =========================================================================
    {
        id: 41,
        name: "Precision Wire Stripper",
        category: "TOOL",
        maxDurability: 30,
        rarity: "COMMON",
        desc: "Calibrated cutting jaws (AWG 10-22) for stripping jumper wires without severing copper cores."
    },
    {
        id: 42,
        name: "Digital Multimeter DT-830",
        category: "TOOL",
        maxDurability: 40,
        rarity: "UNCOMMON",
        desc: "Rugged instrument with needle probes. Measures DC voltage, circuit continuity, and resistance."
    },
    {
        id: 43,
        name: "Breadboard Jumper Wire Set",
        category: "TOOL",
        maxDurability: 50,
        rarity: "COMMON",
        desc: "Bundle of 20 male-to-male flexible breadboard leads for quick circuit jumpering."
    },
    {
        id: 44,
        name: "Portable 30W USB Soldering Pen",
        category: "TOOL",
        maxDurability: 25,
        rarity: "RARE",
        repairBonus: 20,
        desc: "Rapid-heating ceramic element tool. Use from inventory to restore +20 Durability to equipped weapons or armor!"
    },
    {
        id: 45,
        name: "Ceramic Electronic Tweezers",
        category: "TOOL",
        maxDurability: 40,
        rarity: "COMMON",
        desc: "Non-magnetic, heat-resistant anti-static tweezers for safely salvaging surface mount parts."
    },
    {
        id: 46,
        name: "8-Channel USB Logic Analyzer",
        category: "TOOL",
        maxDurability: 15,
        rarity: "MILITARY",
        autoSolveQuiz: true,
        desc: "High-speed 24MHz telemetry packet sniffer. Automatically decrypts any 1 Arduino Quiz terminal!"
    },
    {
        id: 47,
        name: "High-Voltage Bleeder Resistor Stick",
        category: "TOOL",
        maxDurability: 35,
        rarity: "UNCOMMON",
        blocksShock: true,
        desc: "100kΩ 50W power resistor on insulated fiberglass wand. Completely nullifies 5% capacitor shock hazards!"
    },
    {
        id: 48,
        name: "Heavy Tungsten Prybar",
        category: "TOOL",
        maxDurability: 50,
        rarity: "COMMON",
        desc: "Hardened tungsten alloy bar. Can force open jammed supply caches without failing."
    },
    {
        id: 49,
        name: "Frequency Signal Jammer",
        category: "TOOL",
        maxDurability: 20,
        rarity: "RARE",
        desc: "Portable 2.4GHz/5.8GHz RF jammer that confuses soldier laser sights and delays enemy attacks."
    },
    {
        id: 50,
        name: "Optocoupler Signal Isolator",
        category: "TOOL",
        maxDurability: 30,
        rarity: "UNCOMMON",
        desc: "Phototransistor barrier that isolates suit telemetry from hostile electrical surges."
    },
    {
        id: 51,
        name: "Handheld DSO150 Oscilloscope",
        category: "TOOL",
        maxDurability: 45,
        rarity: "RARE",
        desc: "Compact digital waveform display for analyzing signals and charting unknown sectors."
    },
    {
        id: 52,
        name: "Tactile Pushbutton Array",
        category: "TOOL",
        maxDurability: 40,
        rarity: "COMMON",
        desc: "Bank of 4 micro-momentary switches for manual logic override inputs."
    },
    {
        id: 53,
        name: "Precision Torx Screw Kit",
        category: "TOOL",
        maxDurability: 50,
        rarity: "COMMON",
        desc: "Set of T5 through T20 magnetic bits for dismantling robotic casings and chassis."
    },
    {
        id: 54,
        name: "DC-DC Step-Down Buck Converter",
        category: "TOOL",
        maxDurability: 30,
        rarity: "UNCOMMON",
        desc: "LM2596 switching regulator converting stray high voltage into safe 5V power for your suit."
    },
    {
        id: 55,
        name: "Field Technician Master Kit",
        category: "TOOL",
        maxDurability: 20,
        rarity: "LEGENDARY",
        repairBonus: 35,
        desc: "Complete military hardware repair suite. Restores +35 Durability to all equipped weapons and armor!"
    },

    // =========================================================================
    // Category E: Electronics & Microcontroller Modules (IDs 56 - 65)
    // =========================================================================
    {
        id: 56,
        name: "Arduino Uno R3 Core Board",
        category: "ELECTRONIC",
        rarity: "RARE",
        desc: "The legendary blue microcontroller development board. Heart of embedded telemetry systems."
    },
    {
        id: 57,
        name: "ATmega328P DIP-28 Microchip",
        category: "ELECTRONIC",
        rarity: "UNCOMMON",
        desc: "8-bit AVR RISC microcontroller IC with 32KB flash memory clocked at 16MHz."
    },
    {
        id: 58,
        name: "16×2 I2C Character LCD Module",
        category: "ELECTRONIC",
        rarity: "UNCOMMON",
        desc: "High-contrast alphanumeric display with integrated PCF8574 backpack addressed at 0x27."
    },
    {
        id: 59,
        name: "HC-SR04 Ultrasonic Distance Sensor",
        category: "ELECTRONIC",
        rarity: "UNCOMMON",
        desc: "Dual transducer module emitting 40kHz ultrasound to map obstacles up to 400cm away."
    },
    {
        id: 60,
        name: "5V Single-Channel Relay Module",
        category: "ELECTRONIC",
        rarity: "UNCOMMON",
        desc: "Optoisolated switching relay allowing low-voltage Arduino signals to command 250V AC circuits."
    },
    {
        id: 61,
        name: "10kΩ Linear Potentiometer with Dial",
        category: "ELECTRONIC",
        rarity: "COMMON",
        desc: "3-terminal analog voltage divider providing smooth manual resistance tuning."
    },
    {
        id: 62,
        name: "PIR Pyroelectric Motion Sensor",
        category: "ELECTRONIC",
        rarity: "UNCOMMON",
        desc: "Infrared heat signature detector with Fresnel lens. Alerts to approaching wasteland hostiles."
    },
    {
        id: 63,
        name: "DHT11 Digital Temp & Humidity Sensor",
        category: "ELECTRONIC",
        rarity: "COMMON",
        desc: "Calibrated digital output sensor for environmental temperature and humidity telemetry."
    },
    {
        id: 64,
        name: "1N4007 Rectifier Diode 10-Pack",
        category: "ELECTRONIC",
        rarity: "COMMON",
        desc: "General-purpose 1A 1000V silicon diodes used for flyback inductive surge protection."
    },
    {
        id: 65,
        name: "220Ω & 10kΩ Resistor Reel",
        category: "ELECTRONIC",
        rarity: "COMMON",
        desc: "Essential 1/4W metal film resistors for LED current restriction and switch pulldown logic."
    },

    // =========================================================================
    // Category F: Consumables & Survival Stimulants (IDs 66 - 70)
    // =========================================================================
    {
        id: 66,
        name: "Cyber-Energy Drink Canister",
        category: "CONSUMABLE",
        rarity: "COMMON",
        energyRestore: 25,
        desc: "Chilled electrolyte formula with micro-capacitive stimulants. Restores +25% Energy instantly."
    },
    {
        id: 67,
        name: "Overcharged Electrolyte Battery Can",
        category: "CONSUMABLE",
        rarity: "RARE",
        energyRestore: 45,
        desc: "Heavy-duty military energy canister. Surges your suit power grid, restoring +45% Energy!"
    },
    {
        id: 68,
        name: "Nanite Coagulant Med-Gel",
        category: "CONSUMABLE",
        rarity: "RARE",
        energyRestore: 35,
        armorRepair: 15,
        desc: "Medical nanogel flask that restores +35% Energy and patches +15 Durability to worn armor."
    },
    {
        id: 69,
        name: "Anti-Static Field Ointment",
        category: "CONSUMABLE",
        rarity: "UNCOMMON",
        desc: "Conductive graphite paste. Shields the player from electrical damage for the next 3 sectors."
    },
    {
        id: 70,
        name: "Emergency Telemetry Reboot Stim",
        category: "CONSUMABLE",
        rarity: "LEGENDARY",
        autoRevive: true,
        desc: "Life-support defibrillator cartridge. Automatically revives the player with 50% Energy if power hits 0%!"
    }
];

// Helper to look up an item by ID
function getItemById(id) {
    const item = ITEMS_DATABASE.find(it => it.id === id);
    if (!item) return null;
    return {
        ...item,
        currentDurability: item.maxDurability || null,
        currentQuantity: item.quantity || 1
    };
}

// Loot Drop Table Generation
function rollEnemyLoot(enemyCategory) {
    const loot = [];
    const count = Math.floor(Math.random() * 3) + 1; // 1 to 3 items

    for (let i = 0; i < count; i++) {
        let rolledId;
        const roll = Math.random();

        if (enemyCategory === 'SOLDIER') {
            // Soldiers drop Firearms (45%), Military Ammo (35%), Ballistic Armor (20%)
            if (roll < 0.45) {
                // Firearms: 6, 7, 10, 11, 12, 13
                const weaponIds = [6, 7, 10, 11, 12, 13];
                rolledId = weaponIds[Math.floor(Math.random() * weaponIds.length)];
            } else if (roll < 0.80) {
                // Ammo: 16, 18, 19, 20, 22, 23
                const ammoIds = [16, 18, 19, 20, 22, 23];
                rolledId = ammoIds[Math.floor(Math.random() * ammoIds.length)];
            } else {
                // Armor: 30, 31, 32, 33, 36, 37
                const armorIds = [30, 31, 32, 33, 36, 37];
                rolledId = armorIds[Math.floor(Math.random() * armorIds.length)];
            }
        } else if (enemyCategory === 'BANDIT') {
            // Bandits drop Scrap Weapons (40%), Handgun/Shotgun Ammo (35%), Raider Armor (25%)
            if (roll < 0.40) {
                const weaponIds = [1, 2, 4, 5, 8];
                rolledId = weaponIds[Math.floor(Math.random() * weaponIds.length)];
            } else if (roll < 0.75) {
                const ammoIds = [16, 17, 20, 21];
                rolledId = ammoIds[Math.floor(Math.random() * ammoIds.length)];
            } else {
                const armorIds = [26, 27, 29, 32];
                rolledId = armorIds[Math.floor(Math.random() * armorIds.length)];
            }
        } else {
            // Scavengers drop Tools (50%), Electronics (35%), Consumables (15%)
            if (roll < 0.50) {
                const toolIds = [41, 42, 43, 44, 45, 47, 48, 52, 53];
                rolledId = toolIds[Math.floor(Math.random() * toolIds.length)];
            } else if (roll < 0.85) {
                const elecIds = [56, 57, 58, 59, 60, 61, 62, 63, 64, 65];
                rolledId = elecIds[Math.floor(Math.random() * elecIds.length)];
            } else {
                const conIds = [66, 67, 68, 69];
                rolledId = conIds[Math.floor(Math.random() * conIds.length)];
            }
        }

        const item = getItemById(rolledId);
        if (item) loot.push(item);
    }

    return loot;
}
