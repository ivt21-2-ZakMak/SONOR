const board = document.getElementById("sonor-board");

// === Настройки поля ===
const TOTAL_ZONES = 5;
const ZONE_WIDTH_RATIO = [0.1, 0.225, 0.225, 0.225, 0.225]; // ширина каждой зоны в процентах от 100%
const ZONE_COLORS = ["#2ecc71", "#ff5733", "#d63031", "#8b0000", "#581845"];

// === Игроки ===
const players = {
    runner: {
        pawns: [],
        keys: ["q", "w", "e", "a", "d", "z", "x", "c"],
    },
    chaser: {
        pawns: [],
        keys: ["t", "y", "u", "g", "j", "b", "n", "m"],
    }
};

let currentPlayer = "runner"; // начинает убегающий
let selectedPawnIndex = 0;

// === Создание зон ===
function createZones() {
    for (let i = 0; i < TOTAL_ZONES; i++) {
        const zone = document.createElement("div");
        zone.style.position = "absolute";
        zone.style.top = "0";
        zone.style.height = "100%";
        zone.style.width = `${ZONE_WIDTH_RATIO[i] * 100}%`;
        zone.style.left = `${ZONE_WIDTH_RATIO.slice(0, i).reduce((sum, val) => sum + val, 0) * 100}%`;
        zone.style.backgroundColor = ZONE_COLORS[i];
        zone.style.borderRight = i === 0 ? "none" : "2px solid #ccc";
        zone.style.boxSizing = "border-box";

        board.appendChild(zone);
    }
}

// === Создание фишек ===
function createPawns() {
    // Убегающие — 6 штук, начинают в зоне 5
    for (let i = 0; i < 6; i++) {
        const pawn = document.createElement("div");
        pawn.classList.add("pawn", "runner");
        pawn.dataset.id = "runner-" + i;
        pawn.dataset.zone = 5;
        pawn.dataset.moved = false;
        pawn.dataset.enteredZones = JSON.stringify([5]); // уже в зоне 5
        board.appendChild(pawn);
        players.runner.pawns.push(pawn);

        // Ручное размещение фигур убегающих
        const totalHeight = board.offsetHeight; // Высота игрового поля
        const spacing = totalHeight / 6; // Разделить на 6 равных частей
        const x = board.offsetWidth - pawn.offsetWidth - 20; // Правая граница минус отступ
        const y = spacing * i + (spacing - pawn.offsetHeight) / 2; // Вертикальное расположение

        pawn.style.left = x + "px";
        pawn.style.top = y + "px";
    }

    // Преследователь — 1 штука, начинает в зоне 1
    const chaserPawn = document.createElement("div");
    chaserPawn.classList.add("pawn", "chaser");
    chaserPawn.dataset.id = "chaser-0";
    chaserPawn.dataset.zone = 1;
    chaserPawn.dataset.cell = 4; // Центральная ячейка
    board.appendChild(chaserPawn);
    players.chaser.pawns.push(chaserPawn);

    placeInZone(chaserPawn, 1, 4);
}

// === Расчёт координат внутри зоны ===
function getZoneRect(zoneNumber) {
    const totalWidth = board.offsetWidth;
    let left = 0;
    for (let i = 0; i < zoneNumber - 1; i++) {
        left += ZONE_WIDTH_RATIO[i] * totalWidth;
    }
    const width = ZONE_WIDTH_RATIO[zoneNumber - 1] * totalWidth;
    const height = board.offsetHeight;
    return { left, width, height };
}

// === Помещаем фишку в нужную ячейку ===
function placeInZone(pawn, zoneNumber, cellIndex) {
    const { left, width, height } = getZoneRect(zoneNumber);

    if (zoneNumber === 5) {
        // Для зоны 5: равномерное расположение по вертикали вдоль правой границы
        const cellHeight = height / 3;
        const x = left + width - pawn.offsetWidth; // Правая граница зоны
        const y = cellIndex * cellHeight + (cellHeight - pawn.offsetHeight) / 2;

        // Убедимся, что x не выходит за пределы поля
        x = Math.min(x, left + width - pawn.offsetWidth);

        pawn.style.left = x + "px";
        pawn.style.top = y + "px";
    } else {
        // Для других зон: обычное центрирование
        const cellX = cellIndex % 3;
        const cellY = Math.floor(cellIndex / 3);

        const cellWidth = width / 3;
        const cellHeight = height / 3;

        const x = left + cellX * cellWidth + (cellWidth - pawn.offsetWidth) / 2;
        const y = cellY * cellHeight + (cellHeight - pawn.offsetHeight) / 2;

        pawn.style.left = x + "px";
        pawn.style.top = y + "px";
    }

    pawn.dataset.zone = zoneNumber;
    pawn.dataset.cell = cellIndex;
}

// === Выделение фишки ===
function highlightPawn(pawn) {
    players[currentPlayer].pawns.forEach(p => p.classList.remove("active"));
    if (pawn) pawn.classList.add("active");
}

// === Автовыбор следующей фишки ===
function selectNextPawn() {
    const availablePawns = players[currentPlayer].pawns.filter(p => !p.dataset.moved);
    if (availablePawns.length === 0) return;

    selectedPawnIndex = selectedPawnIndex % availablePawns.length;
    const selected = availablePawns[selectedPawnIndex];

    highlightPawn(selected);
}

// === Смена хода ===
function endTurn() {
    players.runner.pawns.forEach(p => p.dataset.moved = false);
    players.chaser.pawns.forEach(p => p.dataset.moved = false);

    currentPlayer = currentPlayer === "runner" ? "chaser" : "runner";
    selectedPawnIndex = 0;
    updateTurnIndicator();
    selectNextPawn();
}

// === Обновление текста статуса ===
function updateTurnIndicator() {
    const turnIndicator = document.getElementById("turn-indicator");
    if (turnIndicator) {
        turnIndicator.textContent = currentPlayer === "runner"
            ? "Ход убегающего"
            : "Ход преследователя";
    }
}

// === Управление клавишами ===
document.addEventListener("keydown", (e) => {
    const key = e.key.toLowerCase();

    if (key === " " || key === "enter") {
        e.preventDefault();
        selectedPawnIndex++;
        selectNextPawn();
        return;
    }

    const player = players[currentPlayer];
    if (!player.keys.includes(key)) return;

    const index = player.keys.indexOf(key);
    const zone = Math.floor(index / 9) + 1;
    const cell = index % 9;

    const availablePawns = player.pawns.filter(p => !p.dataset.moved);
    if (availablePawns.length === 0) return;

    const pawn = availablePawns[selectedPawnIndex % availablePawns.length];
    const currentZone = parseInt(pawn.dataset.zone);
    const targetZone = zone;
    const targetCell = cell;

    const dx = Math.abs((targetCell % 3) - (pawn.dataset.cell % 3));
    const dy = Math.abs(Math.floor(targetCell / 3) - Math.floor(pawn.dataset.cell / 3));

    if (dx <= 1 && dy <= 1) {
        placeInZone(pawn, targetZone, targetCell);
        pawn.dataset.moved = true;

        // Если достиг безопасной зоны
        if (parseInt(pawn.dataset.zone) === 1) {
            pawn.remove();
            players.runner.pawns = players.runner.pawns.filter(p => p !== pawn);
        }

        checkCapture(pawn);
        selectedPawnIndex++;
        selectNextPawn();
    }

    if (player.pawns.every(p => p.dataset.moved === "true")) {
        endTurn();
    }
});

// === Проверка захвата ===
function checkCapture(movingPawn) {
    if (currentPlayer === "chaser") return;

    players.chaser.pawns.forEach(chaser => {
        if (
            chaser.dataset.zone === movingPawn.dataset.zone &&
            chaser.dataset.cell === movingPawn.dataset.cell
        ) {
            movingPawn.remove();
            players.runner.pawns = players.runner.pawns.filter(p => p !== movingPawn);
        }
    });
}

// === Инициализация ===
createZones();
createPawns();
updateTurnIndicator();
selectNextPawn();
