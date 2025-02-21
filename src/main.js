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

      // свайпы ------------------
      let startY = 0; // Начальная позиция касания
      let isDragging = false;

      dataPeriod.addEventListener('touchstart', (e) => {
        startY = e.touches[0].clientY; // Запоминаем начальную позицию Y
        isDragging = true;
      });

      dataPeriod.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        const currentY = e.touches[0].clientY; // Текущая позиция Y
        const deltaY = currentY - startY; // Разница между начальной и текущей позицией

        // Если свайп вниз (deltaY > 0) и достаточно большой
        if (deltaY > 50) {
          targetElement.classList.add('hidden'); // Закрываем модальное окно
          isDragging = false; // Сбрасываем флаг
        }
      });

      dataPeriod.addEventListener('touchend', () => {
        isDragging = false; // Сбрасываем флаг
      });

      // Обработчики для мыши
      dataPeriod.addEventListener('mousedown', (e) => {
        startY = e.clientY;
        isDragging = true;
      });

      dataPeriod.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        const currentY = e.clientY;
        const deltaY = currentY - startY;

        // Если свайп вниз (deltaY > 0) и достаточно большой
        if (deltaY > 50) {
          targetElement.classList.add('hidden');
          isDragging = false; // Сбрасываем флаг
        }
      });

      dataPeriod.addEventListener('mouseup', () => {
        isDragging = false; // Сбрасываем флаг
      });


      // свайпы ------------------

      // Закрытие модального окна периода
      bgShow.addEventListener('click', () => {
        targetElement.classList.add('hidden');
      });

      // Функция для закрытия модального окна с анимацией
      function closeModal() {
        dataPeriod.classList.add('translate-y-full'); // Анимация закрытия
        setTimeout(() => {
          targetElement.classList.add('hidden');
        }, 300); // Ждем завершения анимации
      }

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
  // Получаем кнопку удалить 1 цифру
  const digitDeleteButton = document.querySelector('.digit-delete');

  // Текущий активный инпут
  let currentInputIndex = 0;

  // Функция для объединения всех цифр в одну строку
  const getCombinedDigits = () => {
    return Array.from(inputs).map(input => input.value).join('');

  };

  // Функция для удаления последней цифры в текущем инпуте
  const deleteLastDigit = () => {
    if (inputs[currentInputIndex].value.length > 0) {
      inputs[currentInputIndex].value = inputs[currentInputIndex].value.slice(0, -1);
    } else if (currentInputIndex > 0) {
      // Если текущий инпут пуст, переходим к предыдущему и удаляем последнюю цифру
      currentInputIndex--;
      inputs[currentInputIndex].value = inputs[currentInputIndex].value.slice(0, -1);
      inputs[currentInputIndex].focus();
    }
    console.log('Текущее значение:', getCombinedDigits()); // Выводим объединенную строку
  };

  // Проверяем, существует ли кнопка удалить 1 цифру
  if (digitDeleteButton) {
    digitDeleteButton.addEventListener('click', deleteLastDigit);
  } else {
    console.error('Элемент с классом .digit-delete не найден.');
  }

  // Проверяем, существует ли кнопка "C"
  if (clearButton) {
    clearButton.addEventListener('click', () => {
      inputs.forEach(input => input.value = ''); // Очищаем все инпуты
      currentInputIndex = 0; // Сбрасываем индекс
      inputs[currentInputIndex].focus(); // Фокус на первый инпут
      console.log('Текущее значение:', getCombinedDigits()); // Выводим объединенную строку
    });
  } else {
    console.error('Элемент с классом .clear-but не найден.');
  }

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
        console.log('Текущее значение:', getCombinedDigits()); // Выводим объединенную строку
      }
    });
  });

  // Обработчик для ручного ввода в инпуты
  inputs.forEach((input, index) => {
    input.addEventListener('input', () => {
      if (input.value.length === 1) {
        moveToNextInput();
      }
      console.log('Текущее значение:', getCombinedDigits()); // Выводим объединенную строку
    });

    input.addEventListener('keydown', (event) => {
      if (event.key === 'Backspace' && input.value.length === 0) {
        moveToPreviousInput();
      }
    });
  });
  //---------------------------------------------------------------
  // логика 2 ввода цифр в получить оплату

  // Получаем все инпуты с классом auth-input

  const inputsTwo = document.querySelectorAll('.auth-input-two');
  // Получаем все кнопки с цифрами
  const digitButtonsTwo = document.querySelectorAll('.digit-button-two');
  // Получаем кнопку "C" по новому классу clear-but
  const clearButtonTwo = document.querySelector('.clear-but-two');
  // Получаем кнопку удалить 1 цифру
  const digitDeleteButtonTwo = document.querySelector('.digit-delete-two');

  // Текущий активный инпут
  let currentInputIndexTwo = 0;

  // Функция для объединения всех цифр в одну строку
  const getCombinedDigitsTwo = () => {
    return Array.from(inputsTwo).map(input => input.value).join('');

  };

  // Функция для удаления последней цифры в текущем инпуте
  const deleteLastDigitTwo = () => {
    if (inputsTwo[currentInputIndexTwo].value.length > 0) {
      inputsTwo[currentInputIndexTwo].value = inputsTwo[currentInputIndexTwo].value.slice(0, -1);
    } else if (currentInputIndexTwo > 0) {
      // Если текущий инпут пуст, переходим к предыдущему и удаляем последнюю цифру
      currentInputIndexTwo--;
      inputsTwo[currentInputIndexTwo].value = inputsTwo[currentInputIndexTwo].value.slice(0, -1);
      inputsTwo[currentInputIndexTwo].focus();
    }
    console.log('Текущее значение:', getCombinedDigitsTwo()); // Выводим объединенную строку
  };

  // Проверяем, существует ли кнопка удалить 1 цифру
  if (digitDeleteButtonTwo) {
    digitDeleteButtonTwo.addEventListener('click', deleteLastDigitTwo);
  } else {
    console.error('Элемент с классом .digit-delete не найден.');
  }

  // Проверяем, существует ли кнопка "C"
  if (clearButtonTwo) {
    clearButtonTwo.addEventListener('click', () => {
      inputsTwo.forEach(input => input.value = ''); // Очищаем все инпуты
      currentInputIndexTwo = 0; // Сбрасываем индекс
      inputsTwo[currentInputIndexTwo].focus(); // Фокус на первый инпут
      console.log('Текущее значение:', getCombinedDigitsTwo()); // Выводим объединенную строку
    });
  } else {
    console.error('Элемент с классом .clear-but не найден.');
  }

  // Функция для перехода к следующему инпуту
  const moveToNextInputTwo = () => {
    if (currentInputIndexTwo < inputsTwo.length - 1) {
      currentInputIndexTwo++;
      inputsTwo[currentInputIndexTwo].focus();
    }
  };

  // Функция для перехода к предыдущему инпуту
  const moveToPreviousInputTwo = () => {
    if (currentInputIndexTwo > 0) {
      currentInputIndexTwo--;
      inputsTwo[currentInputIndexTwo].focus();
    }
  };

  // Обработчик для цифровых кнопок
  digitButtonsTwo.forEach(button => {
    button.addEventListener('click', () => {
      if (currentInputIndexTwo < inputsTwo.length) {
        inputsTwo[currentInputIndexTwo].value = button.textContent; // Вставляем цифру
        moveToNextInputTwo(); // Переходим к следующему инпуту
        console.log('Текущее значение:', getCombinedDigitsTwo()); // Выводим объединенную строку
      }
    });
  });

  // Обработчик для ручного ввода в инпуты
  inputsTwo.forEach((input, index) => {
    input.addEventListener('input', () => {
      if (input.value.length === 1) {
        moveToNextInputTwo();
      }
      console.log('Текущее значение:', getCombinedDigitsTwo()); // Выводим объединенную строку
    });

    input.addEventListener('keydown', (event) => {
      if (event.key === 'Backspace' && input.value.length === 0) {
        moveToPreviousInputTwo();
      }
    });
  });

  //-------------------------------------------------------

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
