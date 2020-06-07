export default () => {
  const TIMER = 5 * 60 * 1000; // 5 minutes

  /**
   * Добавляет ведущий ноль.
   * @param {int} number - Исходное число.
   * @param {int} chars - Необходимая длина строки.
   * @return {string} - Число с ведущим нулем в формате строки.
   */
  const addLeadingZero = function (number, chars) {
    const charsToBeAdded = chars - number.toString().length;

    if (charsToBeAdded > 0) {
      return `0`.repeat(charsToBeAdded) + number;
    }
    return number;
  };

  /**
   * Функция анмимации времени.
   * @param  {float} progress - Показатель прогресса, от 0 (0%) до 1 (100%).
   * @return {void}
   */
  const timerFunction = function (progress) {
    const counterElement = document.querySelector(`#time`);
    const currentTime = new Date(Math.floor((1 - progress) * TIMER));

    counterElement.textContent =
      currentTime.getMinutes() + `:` +
      addLeadingZero(currentTime.getSeconds(), 2);
  };

  window.animate(TIMER, timerFunction);
};
