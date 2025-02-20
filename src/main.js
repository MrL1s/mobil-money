document.addEventListener('DOMContentLoaded', () => {
  // Проверяем, находимся ли мы на странице history
  if (window.location.pathname.includes('/history')) {
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

    // Проверяем, существуют ли элементы
    if (showPeriod && bgShow && bgShowTwo && targetElement && targetElementTwo && showStatus && dataPeriodTwo && setDate && dataPeriod) {
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
    } else {
      console.error('Один или несколько элементов модальных окон не найдены.');
    }
  } else {
    console.log('Модальные окна не активированы, так как страница не является /history.');
  }
  // Логика для инпутов
  // Получаем все инпуты с классом auth-input
  const inputs = document.querySelectorAll('.auth-input');
  // Получаем все кнопки с цифрами
  const digitButtons = document.querySelectorAll('.digit-button');
  // Получаем кнопку "C" по новому классу clear-but
  const clearButton = document.querySelector('.clear-but');

  // Проверяем, существует ли кнопка "C"
  if (clearButton) {
    clearButton.addEventListener('click', () => {
      inputs.forEach(input => input.value = ''); // Очищаем все инпуты
      currentInputIndex = 0; // Сбрасываем индекс
      inputs[currentInputIndex].focus(); // Фокус на первый инпут
    });
  } else {
    console.error('Элемент с классом .clear-but не найден.');
  }

  // Текущий активный инпут
  let currentInputIndex = 0;

  // Функция для перехода к следующему инпуту
  const moveToNextInput = () => {
    if (currentInputIndex < inputs.length - 1) {
      currentInputIndex++;
      inputs[currentInputIndex].focus();
    }
  };

  // Функция для перехода к предыдущему инпуту
  const moveToPreviousInput = () => {
    if (currentInputIndex > 0) {
      currentInputIndex--;
      inputs[currentInputIndex].focus();
    }
  };

  // Обработчик для цифровых кнопок
  digitButtons.forEach(button => {
    button.addEventListener('click', () => {
      if (currentInputIndex < inputs.length) {
        inputs[currentInputIndex].value = button.textContent; // Вставляем цифру
        moveToNextInput(); // Переходим к следующему инпуту
      }
    });
  });

  // Обработчик для ручного ввода в инпуты
  inputs.forEach((input, index) => {
    input.addEventListener('input', () => {
      if (input.value.length === 1) {
        moveToNextInput();
      }
    });

    input.addEventListener('keydown', (event) => {
      if (event.key === 'Backspace' && input.value.length === 0) {
        moveToPreviousInput();
      }
    });
  });

  // Логика для календаря
  const currentMonthElement = document.getElementById('currentMonth');
  const calendarDaysElement = document.getElementById('calendarDays');
  const prevMonthButton = document.getElementById('prevMonth');
  const nextMonthButton = document.getElementById('nextMonth');
  const selectedPeriodElement = document.getElementById('selectedPeriod');

  let currentDate = new Date();
  let startDate = null;
  let endDate = null;

  function renderCalendar(date) {
    const year = date.getFullYear();
    const month = date.getMonth();

    calendarDaysElement.innerHTML = '';

    currentMonthElement.textContent = new Intl.DateTimeFormat('ru-RU', {
      month: 'long',
      year: 'numeric'
    }).format(date);

    const firstDayOfMonth = new Date(year, month, 1);
    const startingDay = (firstDayOfMonth.getDay() + 6) % 7;
    const totalDays = new Date(year, month + 1, 0).getDate();

    for (let i = 0; i < startingDay; i++) {
      const emptyDay = document.createElement('div');
      emptyDay.classList.add('text-center', 'text-gray-400');
      calendarDaysElement.appendChild(emptyDay);
    }

    for (let day = 1; day <= totalDays; day++) {
      const dayElement = document.createElement('div');
      dayElement.classList.add('text-center', 'p-2', 'rounded-full', 'hover:bg-gray-200', 'cursor-pointer');

      const currentDay = new Date(year, month, day);

      if (day === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear()) {
        dayElement.classList.add('bg-blue-500', 'text-white');
      }

      if (startDate && currentDay.getTime() === startDate.getTime()) {
        dayElement.classList.add('bg-green-500', 'text-white');
      }
      if (endDate && currentDay.getTime() === endDate.getTime()) {
        dayElement.classList.add('bg-green-500', 'text-white');
      }
      if (startDate && endDate && currentDay > startDate && currentDay < endDate) {
        dayElement.classList.add('bg-green-200');
      }

      dayElement.textContent = day;
      dayElement.addEventListener('click', () => selectDate(currentDay));
      calendarDaysElement.appendChild(dayElement);
    }
  }

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

    if (startDate && endDate) {
      selectedPeriodElement.textContent = `${startDate.toLocaleDateString('ru-RU')} - ${endDate.toLocaleDateString('ru-RU')}`;
    } else {
      selectedPeriodElement.textContent = `${startDate.toLocaleDateString('ru-RU')}`;
    }

    renderCalendar(currentDate);
  }

  prevMonthButton.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar(currentDate);
  });

  nextMonthButton.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar(currentDate);
  });

  renderCalendar(currentDate);
});
