
const okBut = document.getElementById('ok-but')
const exitBut = document.getElementById('exit-but')
// --------------------------------
const showPeriod = document.getElementById('show-period')
const bgShow = document.getElementById('bg-show')
const bgShowTwo = document.getElementById('bg-show-two')
const targetElement = document.getElementById('target-element')
const targetElementTwo = document.getElementById('target-element-two')
const showStatus = document.getElementById('show-status')

// --------------------------------

showStatus.addEventListener('click', () => {
  targetElementTwo.classList.remove('hidden')
})

bgShowTwo.addEventListener('click', () => {
  targetElementTwo.classList.add('hidden')
})

bgShow.addEventListener('click', () => {
  targetElement.classList.add('hidden')
})

showPeriod.addEventListener('click', () => {
  targetElement.classList.remove('hidden')
})

okBut.addEventListener('click', () => {
  window.location.href = './glav.html'
})

exitBut.addEventListener('click', () => {
  window.location.href = './index.html'
})

// // Находим все инпуты
// const inputs = document.querySelectorAll('input[type="text"]');

// // Добавляем обработчик события input для каждого инпута
// inputs.forEach((input, index) => {
//   input.addEventListener('input', (e) => {
//     // Ограничиваем ввод одной цифрой
//     if (e.target.value.length > 1) {
//       e.target.value = e.target.value.slice(0, 1);
//     }

//     // Если введена цифра, переключаем фокус на следующий инпут
//     if (e.target.value !== '' && index < inputs.length - 1) {
//       inputs[index + 1].focus();
//     }
//   });

//   // Обработчик для удаления цифры и перехода на предыдущий инпут
//   input.addEventListener('keydown', (e) => {
//     if (e.key === 'Backspace' && e.target.value === '' && index > 0) {
//       inputs[index - 1].focus();
//     }
//   });
// });