export default () => {
  const lastRuleText = document.querySelector(`.rules__item:last-child`);
  const goButton = document.querySelector(`.rules__link`);

  lastRuleText.addEventListener(`animationend`, () => {
    goButton.classList.add(`rules__link--animated`);
  });
};
