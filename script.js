// Функция переключения экранов с анимацией
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });

    setTimeout(() => {
        const targetScreen = document.getElementById(screenId);
        if (targetScreen) {
            targetScreen.classList.add('active');
        }
    }, 100);
}

// Сохраняем настройки в localStorage
document.addEventListener("DOMContentLoaded", function () {
    const volumeSlider = document.getElementById("volume");
    const musicSlider = document.getElementById("music");
    const languageSelect = document.getElementById("language");

    // Загружаем сохранённые настройки
    volumeSlider.value = localStorage.getItem("volume") || 50;
    musicSlider.value = localStorage.getItem("music") || 50;
    languageSelect.value = localStorage.getItem("language") || "ru";

    // Сохраняем при изменении
    volumeSlider.addEventListener("input", () => {
        localStorage.setItem("volume", volumeSlider.value);
    });

    musicSlider.addEventListener("input", () => {
        localStorage.setItem("music", musicSlider.value);
    });

    languageSelect.addEventListener("change", () => {
        const lang = languageSelect.value;
        localStorage.setItem("language", lang);
        updateLanguage(lang);
    });

    const savedLang = localStorage.getItem("language") || "ru";
    updateLanguage(savedLang);
});

// Перевод интерфейса
function updateLanguage(lang) {
    document.querySelectorAll("[data-lang]").forEach(el => {
        el.textContent = translations[lang][el.dataset.lang] || el.textContent;
    });
}

const translations = {
    ru: {
        welcome: "Добро пожаловать в Сонор!",
        play: "Играть",
        tutorial: "Обучение",
        settings: "Настройки",
        back: "Назад",
        "tutorial-title": "Обучение",
        "tutorial-text": "Правила игры Сонор: игроки делятся на убегающих и преследователей. Убегающие должны достичь безопасной зоны, преследователь должен поймать их.",
        "settings-title": "Настройки",
        volume: "Громкость:",
        music: "Музыка:",
        language: "Выберите язык:"
    },
    sah: {
        welcome: "Сонор!",
        play: "Оонньуу",
        tutorial: "Быраабыла",
        settings: "Настройка",
        back: "Кэнниэлиир",
        "tutorial-title": "Быраабыла",
        "tutorial-text": "Оонньуу быраабылата: оонньуур дьон …",
        volume: "Тыас:",
        music: "Ырыа:",
        language: "Тыл:"
    }
};
