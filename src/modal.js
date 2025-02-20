// Модальные окна
const showPeriod = document.getElementById('show-period');
const bgShow = document.getElementById('bg-show');
const bgShowTwo = document.getElementById('bg-show-two');
const targetElement = document.getElementById('target-element');
const targetElementTwo = document.getElementById('target-element-two');
const showStatus = document.getElementById('show-status');
const dataPeriodTwo = document.getElementById('data-period-two');
const setDate = document.getElementById('set-date');
const dataPeriod = document.getElementById('data-period');

// Открытие модального окна периода
showPeriod.addEventListener('click', () => {
    targetElement.classList.remove('hidden');
});

// Закрытие модального окна периода
bgShow.addEventListener('click', () => {
    targetElement.classList.add('hidden');
});

// Открытие модального окна статуса платежа
showStatus.addEventListener('click', () => {
    targetElementTwo.classList.remove('hidden');
});

// Закрытие модального окна статуса
bgShowTwo.addEventListener('click', () => {
    targetElementTwo.classList.add('hidden');
});

// Обработчик для кнопки "Задать свой"
setDate.addEventListener('click', () => {
    dataPeriod.classList.add('hidden'); // Скрываем список периодов
    dataPeriodTwo.classList.remove('hidden'); // Показываем календарь
});