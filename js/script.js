// Разрешаем редактировать текст в резюме
const editableTags = ["p", "h2", "li"];
editableTags.forEach(tag => {
    document.querySelectorAll(tag).forEach(el => {
        el.setAttribute("contenteditable", "true");
    });
});

// Инициализация Telegram WebApp API
const tg = window.Telegram?.WebApp;
if (tg) tg.expand(); // на весь экран

// Генерация PDF и отправка данных
function generatePDF() {
    const element = document.getElementById('resume');

    // Собираем данные для отправки
    const name = document.querySelector('.brief-name')?.textContent || '';
    const email = document.querySelector('.contacts-email')?.textContent || '';
    const interests = Array.from(document.querySelectorAll('.interests-item')).map(el => el.textContent.trim());

    const formData = {
        name,
        email,
        interests
    };

    // Отправка данных обратно в бота
    if (tg) {
        tg.sendData(JSON.stringify(formData));
        tg.close(); // Закрываем мини-приложение
    } else {
        console.log("Telegram WebApp API недоступен. Данные:", formData);
    }

    // Сохранение в PDF (необязательно, можно убрать если не нужно)
    const options = {
        margin: [10, 10, 10, 10],
        filename: 'resume.pdf',
        html2canvas: {
            scale: 5,
            logging: false,
            scrollY: 0
        },
        jsPDF: {
            format: 'a4',
            orientation: 'portrait'
        },
    };

    html2pdf()
        .set(options)
        .from(element)
        .save();
}

// Кнопка запуска
document.querySelector(".button").addEventListener("click", generatePDF);
