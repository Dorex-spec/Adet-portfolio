/**
 * ADET 211 Experiment 02: Arduino Function Crossword
 * Interactive Word Puzzle with Arduino Functions, 5-Guess Limit & 4th-Try Hint Reveal
 */

document.addEventListener('DOMContentLoaded', () => {
    // =========================================================================
    // Crossword Puzzles Database (Interconnected Arduino Functions)
    // =========================================================================
    const PUZZLES = [
        {
            id: 0,
            theme: "Digital I/O & Core Execution",
            subtitle: "Intersecting Arduino C++ Microcontroller Functions",
            rows: 10,
            cols: 13,
            words: [
                {
                    id: 1,
                    direction: "across",
                    number: 1,
                    word: "SERIAL",
                    clue: "Establishes hardware communication with the PC Serial Monitor.",
                    code: "Serial.begin(9600);",
                    row: 1,
                    col: 2
                },
                {
                    id: 2,
                    direction: "down",
                    number: 1,
                    word: "SETUP",
                    clue: "Executes once at board boot for pin configuration and initial state.",
                    code: "void setup() { pinMode(13, OUTPUT); }",
                    row: 1,
                    col: 2
                },
                {
                    id: 3,
                    direction: "across",
                    number: 2,
                    word: "PINMODE",
                    clue: "Configures digital pin behavior as INPUT, OUTPUT, or INPUT_PULLUP.",
                    code: "pinMode(13, OUTPUT);",
                    row: 5,
                    col: 2
                },
                {
                    id: 4,
                    direction: "down",
                    number: 3,
                    word: "TONE",
                    clue: "Generates a square-wave audio frequency on a piezo buzzer pin.",
                    code: "tone(buzzerPin, 440, 500);",
                    row: 3,
                    col: 4
                },
                {
                    id: 5,
                    direction: "down",
                    number: 4,
                    word: "LOOP",
                    clue: "Executes continuously in an infinite cycle while the microcontroller is powered.",
                    code: "void loop() { digitalWrite(13, HIGH); }",
                    row: 4,
                    col: 6
                },
                {
                    id: 6,
                    direction: "down",
                    number: 5,
                    word: "DELAY",
                    clue: "Halts microcontroller code execution for specified milliseconds.",
                    code: "delay(1000); // 1 second pause",
                    row: 5,
                    col: 7
                },
                {
                    id: 7,
                    direction: "down",
                    number: 6,
                    word: "EEPROM",
                    clue: "Non-volatile memory library for saving bytes across power reboots.",
                    code: "EEPROM.write(address, dataByte);",
                    row: 5,
                    col: 8
                },
                {
                    id: 8,
                    direction: "across",
                    number: 7,
                    word: "ARDUINO",
                    clue: "Open-source electronics prototyping platform based on flexible C++ hardware.",
                    code: "#include <Arduino.h>",
                    row: 8,
                    col: 7
                }
            ]
        },
        {
            id: 1,
            theme: "Analog Telemetry & Timing",
            subtitle: "PWM Duty Cycles, Analog Voltages & Timers",
            rows: 14,
            cols: 13,
            words: [
                {
                    id: 1,
                    direction: "across",
                    number: 1,
                    word: "ANALOGREAD",
                    clue: "Reads analog voltage from pin A0-A5 and maps it to integer 0-1023.",
                    code: "int val = analogRead(A0);",
                    row: 3,
                    col: 2
                },
                {
                    id: 2,
                    direction: "down",
                    number: 2,
                    word: "MILLIS",
                    clue: "Returns the number of milliseconds passed since the board began running current program.",
                    code: "unsigned long currentMillis = millis();",
                    row: 1,
                    col: 5
                },
                {
                    id: 3,
                    direction: "down",
                    number: 3,
                    word: "RANDOM",
                    clue: "Generates pseudo-random numbers within a specified range.",
                    code: "long r = random(10, 100);",
                    row: 3,
                    col: 8
                },
                {
                    id: 4,
                    direction: "down",
                    number: 4,
                    word: "DIGITALWRITE",
                    clue: "Sets a digital output pin to HIGH (+5V) or LOW (0V) state.",
                    code: "digitalWrite(ledPin, HIGH);",
                    row: 3,
                    col: 11
                },
                {
                    id: 5,
                    direction: "across",
                    number: 5,
                    word: "SPI",
                    clue: "High-speed synchronous Serial Peripheral Interface communication bus.",
                    code: "#include <SPI.h>",
                    row: 6,
                    col: 3
                },
                {
                    id: 6,
                    direction: "across",
                    number: 6,
                    word: "MAP",
                    clue: "Re-maps a number from one numeric range into another proportional range.",
                    code: "int pwmVal = map(analogVal, 0, 1023, 0, 255);",
                    row: 8,
                    col: 8
                }
            ]
        },
        {
            id: 2,
            theme: "Hardware Protocols & Mathematics",
            subtitle: "I2C Wire, Interrupts & Boundary Arithmetic",
            rows: 12,
            cols: 16,
            words: [
                {
                    id: 1,
                    direction: "across",
                    number: 1,
                    word: "WIRE",
                    clue: "Two-wire I2C library for communication with LCD backpacks and sensors on A4/A5.",
                    code: "#include <Wire.h>",
                    row: 2,
                    col: 2
                },
                {
                    id: 2,
                    direction: "down",
                    number: 1,
                    word: "WATCHDOG",
                    clue: "Hardware timer that automatically resets the board if code execution locks up.",
                    code: "wdt_enable(WDTO_2S);",
                    row: 2,
                    col: 2
                },
                {
                    id: 3,
                    direction: "across",
                    number: 2,
                    word: "ATTACHINTERRUPT",
                    clue: "Binds a custom ISR function to trigger on digital pin voltage changes (RISING/FALLING).",
                    code: "attachInterrupt(digitalPinToInterrupt(2), isr, RISING);",
                    row: 6,
                    col: 2
                },
                {
                    id: 4,
                    direction: "down",
                    number: 3,
                    word: "PULSEIN",
                    clue: "Reads the duration of a HIGH/LOW pulse in microseconds (e.g. HC-SR04 ultrasonic echo).",
                    code: "long duration = pulseIn(echoPin, HIGH);",
                    row: 4,
                    col: 8
                },
                {
                    id: 5,
                    direction: "across",
                    number: 4,
                    word: "CONSTRAIN",
                    clue: "Constrains a value to be within an upper and lower boundary range.",
                    code: "x = constrain(x, 10, 150);",
                    row: 9,
                    col: 2
                }
            ]
        }
    ];

    // =========================================================================
    // Game State
    // =========================================================================
    let currentPuzzleIndex = 0;
    let puzzleData = null;
    let activeWord = null;
    let totalAttemptsMade = 0;
    let isGameOver = false;

    // DOM Elements
    const puzzleSelect = document.getElementById('puzzleSelect');
    const restartPuzzleBtn = document.getElementById('restartPuzzleBtn');
    const puzzleThemeTitle = document.getElementById('puzzleThemeTitle');
    const solvedCount = document.getElementById('solvedCount');
    const totalWordsCount = document.getElementById('totalWordsCount');
    const crosswordGrid = document.getElementById('crosswordGrid');

    // Solver DOM
    const activeDirBadge = document.getElementById('activeDirBadge');
    const activeLenBadge = document.getElementById('activeLenBadge');
    const attemptsPills = document.getElementById('attemptsPills');
    const attemptsCountDisplay = document.getElementById('attemptsCountDisplay');
    const activeClueText = document.getElementById('activeClueText');
    const hintAlertBanner = document.getElementById('hintAlertBanner');
    const hintLetterChar = document.getElementById('hintLetterChar');
    const hintCodeSnippet = document.getElementById('hintCodeSnippet');
    const letterSlotsRow = document.getElementById('letterSlotsRow');
    const guessInput = document.getElementById('guessInput');
    const submitGuessBtn = document.getElementById('submitGuessBtn');
    const virtualKeyboard = document.getElementById('virtualKeyboard');

    // Clues Directory DOM
    const acrossCluesList = document.getElementById('acrossCluesList');
    const downCluesList = document.getElementById('downCluesList');
    const prevWordBtn = document.getElementById('prevWordBtn');
    const nextWordBtn = document.getElementById('nextWordBtn');

    // Modals DOM
    const lossModal = document.getElementById('lossModal');
    const lossModalDesc = document.getElementById('lossModalDesc');
    const lossCorrectWord = document.getElementById('lossCorrectWord');
    const lossCorrectCode = document.getElementById('lossCorrectCode');
    const tryAgainBtn = document.getElementById('tryAgainBtn');

    const victoryModal = document.getElementById('victoryModal');
    const vSolvedWords = document.getElementById('vSolvedWords');
    const vTotalAttempts = document.getElementById('vTotalAttempts');
    const vAccuracy = document.getElementById('vAccuracy');
    const nextPuzzleBtn = document.getElementById('nextPuzzleBtn');
    const replayPuzzleBtn = document.getElementById('replayPuzzleBtn');

    // =========================================================================
    // Initialize Puzzle
    // =========================================================================
    const loadPuzzle = (index) => {
        isGameOver = false;
        lossModal.style.display = 'none';
        victoryModal.style.display = 'none';
        hintAlertBanner.style.display = 'none';
        guessInput.value = '';

        currentPuzzleIndex = index;
        puzzleSelect.value = index;

        const base = PUZZLES[index];
        puzzleThemeTitle.textContent = base.theme;

        // Clone words data and initialize state per word
        puzzleData = {
            ...base,
            words: base.words.map(w => ({
                ...w,
                revealed: new Array(w.word.length).fill(false),
                hintGiven: false,
                hintIndex: -1,
                failedGuesses: 0,
                guessedLetters: new Set(),
                solved: false
            }))
        };

        totalAttemptsMade = 0;
        totalWordsCount.textContent = puzzleData.words.length;

        // Select first word
        activeWord = puzzleData.words[0];

        buildCrosswordBoard();
        buildCluesLists();
        buildVirtualKeyboard();
        renderActiveWordView();
        updateBoardStats();
    };

    // =========================================================================
    // Crossword Grid Builder
    // =========================================================================
    const buildCrosswordBoard = () => {
        crosswordGrid.innerHTML = '';
        crosswordGrid.style.gridTemplateRows = `repeat(${puzzleData.rows}, 1fr)`;
        crosswordGrid.style.gridTemplateColumns = `repeat(${puzzleData.cols}, 1fr)`;

        // Map cells by "r,c"
        const cellMap = new Map();

        puzzleData.words.forEach(w => {
            for (let i = 0; i < w.word.length; i++) {
                const r = w.direction === 'across' ? w.row : w.row + i;
                const c = w.direction === 'across' ? w.col + i : w.col;
                const key = `${r},${c}`;

                if (!cellMap.has(key)) {
                    cellMap.set(key, {
                        char: w.word[i],
                        words: [w],
                        wordIndices: [{ wordId: w.id, index: i }],
                        number: i === 0 ? w.number : null
                    });
                } else {
                    const existing = cellMap.get(key);
                    existing.words.push(w);
                    existing.wordIndices.push({ wordId: w.id, index: i });
                    if (i === 0 && !existing.number) {
                        existing.number = w.number;
                    }
                }
            }
        });

        // Generate cells for the entire rows x cols
        for (let r = 1; r <= puzzleData.rows; r++) {
            for (let c = 1; c <= puzzleData.cols; c++) {
                const key = `${r},${c}`;
                const cellEl = document.createElement('div');

                if (cellMap.has(key)) {
                    const data = cellMap.get(key);
                    cellEl.className = 'cw-cell tile';
                    cellEl.id = `cell-${r}-${c}`;
                    cellEl.dataset.key = key;

                    if (data.number) {
                        const numSpan = document.createElement('span');
                        numSpan.className = 'cw-cell-num';
                        numSpan.textContent = data.number;
                        cellEl.appendChild(numSpan);
                    }

                    // Content span for letter
                    const charSpan = document.createElement('span');
                    charSpan.className = 'cw-cell-char';
                    charSpan.textContent = ''; // Hidden until revealed
                    cellEl.appendChild(charSpan);

                    // Click cell to select corresponding word
                    cellEl.addEventListener('click', () => {
                        if (isGameOver) return;
                        if (data.words.length === 1) {
                            setActiveWord(data.words[0]);
                        } else {
                            // If intersection, toggle between across/down if clicked again
                            if (activeWord && data.words.includes(activeWord)) {
                                const nextWord = data.words.find(w => w.id !== activeWord.id);
                                if (nextWord) setActiveWord(nextWord);
                            } else {
                                setActiveWord(data.words[0]);
                            }
                        }
                    });
                } else {
                    cellEl.className = 'cw-cell blocked';
                }

                crosswordGrid.appendChild(cellEl);
            }
        }

        refreshCrosswordGridLetters();
    };

    // Refresh Crossword Letters & Highlights
    const refreshCrosswordGridLetters = () => {
        document.querySelectorAll('.cw-cell.tile').forEach(cell => {
            cell.classList.remove('active-word', 'solved');
            const charSpan = cell.querySelector('.cw-cell-char');
            if (charSpan) charSpan.textContent = '';
        });

        puzzleData.words.forEach(w => {
            for (let i = 0; i < w.word.length; i++) {
                const r = w.direction === 'across' ? w.row : w.row + i;
                const c = w.direction === 'across' ? w.col + i : w.col;
                const cell = document.getElementById(`cell-${r}-${c}`);
                if (!cell) continue;

                // Letter is revealed if word is solved or this letter is revealed
                if (w.revealed[i] || w.solved) {
                    const charSpan = cell.querySelector('.cw-cell-char');
                    if (charSpan) charSpan.textContent = w.word[i];
                }

                if (w.solved) {
                    cell.classList.add('solved');
                }

                if (activeWord && w.id === activeWord.id) {
                    cell.classList.add('active-word');
                }
            }
        });
    };

    // =========================================================================
    // Clues Directory (Across & Down Lists)
    // =========================================================================
    const buildCluesLists = () => {
        acrossCluesList.innerHTML = '';
        downCluesList.innerHTML = '';

        puzzleData.words.forEach(w => {
            const li = document.createElement('li');
            li.className = `clue-item ${w.solved ? 'solved' : ''} ${activeWord && w.id === activeWord.id ? 'selected' : ''}`;
            li.id = `clue-item-${w.id}`;
            li.innerHTML = `
                <span class="clue-item-num">${w.number}.</span>
                <span>${escapeHtml(w.clue)} (${w.word.length})</span>
            `;

            li.addEventListener('click', () => {
                if (isGameOver) return;
                setActiveWord(w);
            });

            if (w.direction === 'across') {
                acrossCluesList.appendChild(li);
            } else {
                downCluesList.appendChild(li);
            }
        });
    };

    const updateClueSelection = () => {
        document.querySelectorAll('.clue-item').forEach(item => item.classList.remove('selected'));
        if (activeWord) {
            const activeLi = document.getElementById(`clue-item-${activeWord.id}`);
            if (activeLi) {
                activeLi.classList.add('selected');
                activeLi.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        }
    };

    // =========================================================================
    // Active Word View & Guessing Terminal
    // =========================================================================
    const setActiveWord = (w) => {
        activeWord = w;
        hintAlertBanner.style.display = 'none';
        guessInput.value = '';
        renderActiveWordView();
        refreshCrosswordGridLetters();
        updateClueSelection();
    };

    const renderActiveWordView = () => {
        if (!activeWord) return;

        activeDirBadge.textContent = `${activeWord.number} ${activeWord.direction.toUpperCase()}`;
        activeLenBadge.textContent = `${activeWord.word.length} Letters`;
        activeClueText.textContent = activeWord.clue;

        // Render 5-Attempt Meter Pills
        renderAttemptsMeter();

        // Render Letter Slots (e.g. [_] [I] [_] [M] [_] [_] [_])
        renderLetterSlots();

        // Check if 4th-try hint banner should be shown
        if (activeWord.failedGuesses >= 4 && !activeWord.solved) {
            showHintBanner();
        }

        // Update virtual keyboard key states
        updateKeyboardStates();
    };

    const renderAttemptsMeter = () => {
        const fails = activeWord.failedGuesses;
        attemptsCountDisplay.textContent = `${fails} / 5`;

        const dots = attemptsPills.querySelectorAll('.pill-dot');
        dots.forEach((dot, idx) => {
            dot.className = 'pill-dot';
            if (idx < fails) {
                dot.classList.add('strike');
                if (fails >= 4) {
                    dot.classList.add('critical');
                }
            }
        });
    };

    const renderLetterSlots = () => {
        letterSlotsRow.innerHTML = '';
        for (let i = 0; i < activeWord.word.length; i++) {
            const slot = document.createElement('div');
            slot.className = 'slot-box';

            if (activeWord.revealed[i] || activeWord.solved) {
                slot.textContent = activeWord.word[i];
                slot.classList.add('revealed');
                if (activeWord.hintIndex === i) {
                    slot.classList.add('hint-revealed');
                }
            } else {
                slot.textContent = '_';
            }

            letterSlotsRow.appendChild(slot);
        }
    };

    const showHintBanner = () => {
        hintAlertBanner.style.display = 'block';
        hintCodeSnippet.textContent = activeWord.code;
        if (activeWord.hintIndex !== -1) {
            hintLetterChar.textContent = activeWord.word[activeWord.hintIndex];
        } else {
            hintLetterChar.textContent = 'REVEALED';
        }
    };

    // =========================================================================
    // Core Guess Processing Engine (5 Tries Limit & 4th Try Hint Rule)
    // =========================================================================
    const handleGuess = (rawGuess) => {
        if (isGameOver || !activeWord) return;
        if (activeWord.solved) {
            shakeElement(activeWordCard);
            return;
        }

        const guess = rawGuess.trim().toUpperCase();
        if (!guess) return;

        totalAttemptsMade++;

        // Case A: Single Letter Guess
        if (guess.length === 1) {
            const letter = guess;
            if (activeWord.guessedLetters.has(letter)) {
                // Already guessed this letter
                shakeElement(guessInput);
                return;
            }

            activeWord.guessedLetters.add(letter);

            // Check if letter exists in target word
            if (activeWord.word.includes(letter)) {
                // Correct Letter: Reveal all instances in this word
                for (let i = 0; i < activeWord.word.length; i++) {
                    if (activeWord.word[i] === letter) {
                        activeWord.revealed[i] = true;
                    }
                }
                checkWordSolved();
            } else {
                // Wrong Letter: Increment failed guesses
                applyFailedGuess();
            }
        }
        // Case B: Full Word Guess
        else {
            if (guess === activeWord.word) {
                // Correct full word! Reveal all letters
                for (let i = 0; i < activeWord.word.length; i++) {
                    activeWord.revealed[i] = true;
                }
                checkWordSolved();
            } else {
                // Wrong Word: Increment failed guesses
                applyFailedGuess();
            }
        }

        guessInput.value = '';
        renderActiveWordView();
        refreshCrosswordGridLetters();
    };

    // Handle a failed attempt according to user rules
    const applyFailedGuess = () => {
        activeWord.failedGuesses++;

        // Rule: If user still hasn't guessed word after 4 tries, reveal 1 letter!
        if (activeWord.failedGuesses === 4 && !activeWord.hintGiven) {
            triggerFourthTryHint();
        }

        // Rule: If user still hasn't guessed word after 5 guesses, THEY LOSE!
        if (activeWord.failedGuesses >= 5) {
            triggerLoss();
            return;
        }

        shakeElement(attemptsPills);
    };

    // 4th-Try Automatic Hint Protocol: Reveals one unrevealed letter!
    const triggerFourthTryHint = () => {
        activeWord.hintGiven = true;

        // Find all unrevealed letter indices
        const unrevealed = [];
        for (let i = 0; i < activeWord.word.length; i++) {
            if (!activeWord.revealed[i]) {
                unrevealed.push(i);
            }
        }

        if (unrevealed.length > 0) {
            // Pick the first unrevealed letter to expose
            const chosenIndex = unrevealed[0];
            activeWord.revealed[chosenIndex] = true;
            activeWord.hintIndex = chosenIndex;
            activeWord.guessedLetters.add(activeWord.word[chosenIndex]);
        }

        showHintBanner();
        checkWordSolved();
    };

    // Check if Active Word is completely solved
    const checkWordSolved = () => {
        const isComplete = activeWord.revealed.every(r => r === true);
        if (isComplete) {
            activeWord.solved = true;

            // Mark clue list item
            const clueItem = document.getElementById(`clue-item-${activeWord.id}`);
            if (clueItem) clueItem.classList.add('solved');

            updateBoardStats();

            // Check if entire puzzle is solved
            const allSolved = puzzleData.words.every(w => w.solved);
            if (allSolved) {
                setTimeout(triggerVictory, 600);
            } else {
                // Auto-advance to next unsolved word after brief delay
                setTimeout(() => {
                    const nextUnsolved = puzzleData.words.find(w => !w.solved);
                    if (nextUnsolved) {
                        setActiveWord(nextUnsolved);
                    }
                }, 750);
            }
        }
    };

    // Player Loss Screen (5 Failed Guesses reached)
    const triggerLoss = () => {
        isGameOver = true;
        lossCorrectWord.textContent = activeWord.word;
        lossCorrectCode.textContent = activeWord.code;
        lossModalDesc.innerHTML = `
            You exceeded the allowed <strong>5 guesses</strong> on the function <strong>${activeWord.word}</strong>.
            The Arduino compiler watchdog timed out!
        `;
        lossModal.style.display = 'flex';
    };

    // Puzzle Victory Screen
    const triggerVictory = () => {
        isGameOver = true;
        const totalWords = puzzleData.words.length;
        vSolvedWords.textContent = `${totalWords} / ${totalWords}`;
        vTotalAttempts.textContent = totalAttemptsMade;

        // Calculate accuracy
        const totalLetters = puzzleData.words.reduce((acc, w) => acc + w.word.length, 0);
        const accuracy = Math.max(50, Math.min(100, Math.round((totalLetters / (totalAttemptsMade || 1)) * 100)));
        vAccuracy.textContent = `${accuracy}%`;

        victoryModal.style.display = 'flex';
    };

    const updateBoardStats = () => {
        const solved = puzzleData.words.filter(w => w.solved).length;
        solvedCount.textContent = solved;
    };

    // =========================================================================
    // Virtual Keyboard (QWERTY)
    // =========================================================================
    const buildVirtualKeyboard = () => {
        virtualKeyboard.innerHTML = '';
        const rows = [
            ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
            ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
            ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'DEL']
        ];

        rows.forEach(row => {
            const rowDiv = document.createElement('div');
            rowDiv.className = 'kb-row';

            row.forEach(key => {
                const btn = document.createElement('button');
                btn.className = `kb-key ${key.length > 1 ? 'action-key' : ''}`;
                btn.textContent = key;
                btn.dataset.key = key;

                btn.addEventListener('click', () => {
                    if (isGameOver) return;
                    if (key === 'ENTER') {
                        if (guessInput.value.trim()) {
                            handleGuess(guessInput.value);
                        }
                    } else if (key === 'DEL') {
                        guessInput.value = guessInput.value.slice(0, -1);
                    } else {
                        // Directly guess this letter
                        handleGuess(key);
                    }
                });

                rowDiv.appendChild(btn);
            });

            virtualKeyboard.appendChild(rowDiv);
        });
    };

    const updateKeyboardStates = () => {
        if (!activeWord) return;
        document.querySelectorAll('.kb-key').forEach(keyBtn => {
            const letter = keyBtn.dataset.key;
            if (letter.length > 1) return; // Skip Enter / Del

            keyBtn.className = 'kb-key';

            if (activeWord.guessedLetters.has(letter)) {
                if (activeWord.word.includes(letter)) {
                    keyBtn.classList.add('key-correct');
                } else {
                    keyBtn.classList.add('key-wrong');
                }
            }
        });
    };

    // Visual Shake Feedback
    const shakeElement = (el) => {
        if (!el) return;
        el.animate([
            { transform: 'translateX(0)' },
            { transform: 'translateX(-6px)' },
            { transform: 'translateX(6px)' },
            { transform: 'translateX(-4px)' },
            { transform: 'translateX(4px)' },
            { transform: 'translateX(0)' }
        ], {
            duration: 250,
            iterations: 1
        });
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
    // Event Listeners & Controls
    // =========================================================================
    submitGuessBtn.addEventListener('click', () => {
        if (guessInput.value.trim()) {
            handleGuess(guessInput.value);
        }
    });

    guessInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (guessInput.value.trim()) {
                handleGuess(guessInput.value);
            }
        }
    });

    // Physical Keyboard Listener
    document.addEventListener('keydown', (e) => {
        if (isGameOver) return;

        // If typing in the text input, let default typing occur
        if (document.activeElement === guessInput) {
            return;
        }

        const key = e.key.toUpperCase();
        if (/^[A-Z]$/.test(key)) {
            handleGuess(key);
        } else if (e.key === 'Backspace') {
            guessInput.value = guessInput.value.slice(0, -1);
        } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
            navigateWords(1);
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
            navigateWords(-1);
        }
    });

    // Previous / Next Word Buttons
    const navigateWords = (direction) => {
        if (!activeWord || !puzzleData) return;
        const currentIndex = puzzleData.words.findIndex(w => w.id === activeWord.id);
        let nextIndex = currentIndex + direction;
        if (nextIndex < 0) nextIndex = puzzleData.words.length - 1;
        if (nextIndex >= puzzleData.words.length) nextIndex = 0;
        setActiveWord(puzzleData.words[nextIndex]);
    };

    prevWordBtn.addEventListener('click', () => navigateWords(-1));
    nextWordBtn.addEventListener('click', () => navigateWords(1));

    // Puzzle Selector Dropdown
    puzzleSelect.addEventListener('change', (e) => {
        loadPuzzle(parseInt(e.target.value, 10));
    });

    // Restart Puzzle
    restartPuzzleBtn.addEventListener('click', () => {
        loadPuzzle(currentPuzzleIndex);
    });

    tryAgainBtn.addEventListener('click', () => {
        loadPuzzle(currentPuzzleIndex);
    });

    replayPuzzleBtn.addEventListener('click', () => {
        loadPuzzle(currentPuzzleIndex);
    });

    nextPuzzleBtn.addEventListener('click', () => {
        const nextIndex = (currentPuzzleIndex + 1) % PUZZLES.length;
        loadPuzzle(nextIndex);
    });

    // Start Game with Puzzle 0
    loadPuzzle(0);
});
