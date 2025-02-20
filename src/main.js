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

document.addEventListener('DOMContentLoaded', () => {
  const currentMonthElement = document.getElementById('currentMonth');
  const calendarDaysElement = document.getElementById('calendarDays');
  const prevMonthButton = document.getElementById('prevMonth');
  const nextMonthButton = document.getElementById('nextMonth');
  const selectedPeriodElement = document.getElementById('selectedPeriod');

  let currentDate = new Date();
  let startDate = null;
  let endDate = null;

  // Функция для отрисовки календаря
  function renderCalendar(date) {
    console.log("Rendering calendar for:", date);
    const year = date.getFullYear();
    const month = date.getMonth();

    // Очищаем предыдущие дни
    calendarDaysElement.innerHTML = '';

    // Устанавливаем текущий месяц и год
    currentMonthElement.textContent = new Intl.DateTimeFormat('ru-RU', {
      month: 'long',
      year: 'numeric'
    }).format(date);

    // Определяем первый день месяца и количество дней в месяце
    const firstDayOfMonth = new Date(year, month, 1);
    const startingDay = (firstDayOfMonth.getDay() + 6) % 7; // Понедельник = 0, Воскресенье = 6
    const totalDays = new Date(year, month + 1, 0).getDate();

    // Добавляем пустые ячейки для дней предыдущего месяца
    for (let i = 0; i < startingDay; i++) {
      const emptyDay = document.createElement('div');
      emptyDay.classList.add('text-center', 'text-gray-400');
      calendarDaysElement.appendChild(emptyDay);
    }

    // Добавляем дни текущего месяца
    for (let day = 1; day <= totalDays; day++) {
      const dayElement = document.createElement('div');
      dayElement.classList.add('text-center', 'p-2', 'rounded-full', 'hover:bg-gray-200', 'cursor-pointer');

      const currentDay = new Date(year, month, day);

      // Выделяем текущий день
      if (day === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear()) {
        dayElement.classList.add('bg-blue-500', 'text-white');
      }

      // Выделяем выбранные даты
      if (startDate && currentDay.getTime() === startDate.getTime()) {
        dayElement.classList.add('bg-green-500', 'text-white');
      }
      if (endDate && currentDay.getTime() === endDate.getTime()) {
        dayElement.classList.add('bg-green-500', 'text-white');
      }
      if (startDate && endDate && currentDay > startDate && currentDay < endDate) {
        dayElement.classList.add('bg-green-200');
      }

      // Добавляем текст дня и обработчик клика
      dayElement.textContent = day;
      dayElement.addEventListener('click', () => selectDate(currentDay));
      calendarDaysElement.appendChild(dayElement);
    }
  }

  // Функция для выбора даты
  function selectDate(date) {
    if (!startDate || (startDate && endDate)) {
      startDate = date;
      endDate = null;
    } else if (date > startDate) {
      endDate = date;
    } else {
      endDate = startDate;
      startDate = date;
    }

    // Обновляем выбранный период
    if (startDate && endDate) {
      selectedPeriodElement.textContent = `${startDate.toLocaleDateString('ru-RU')} - ${endDate.toLocaleDateString('ru-RU')}`;
    } else {
      selectedPeriodElement.textContent = `${startDate.toLocaleDateString('ru-RU')}`;
    }

    // Перерисовываем календарь
    renderCalendar(currentDate);
  }

  // Переключение на предыдущий месяц
  prevMonthButton.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar(currentDate);
  });

  // Переключение на следующий месяц
  nextMonthButton.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar(currentDate);
  });

  // Инициализация календаря при загрузке страницы
  renderCalendar(currentDate);
});
