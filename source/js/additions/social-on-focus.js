export default () => {
  const addFocusListeners = function (blockSelector, triggers) {
    const block = document.querySelector(blockSelector);
    triggers.forEach((triggerSelector) => {
      const trigger = document.querySelector(triggerSelector);
      trigger.addEventListener(`focus`, () => {
        block.classList.add(`social-block--active`);
      });
      trigger.addEventListener(`blur`, () => {
        block.classList.remove(`social-block--active`);
      });
    });
  };

  // Добавление обработчика фокуса на кнопках соцсетей, чтобы блок списка
  // соцсетей не пропадал при навигации табом по ним
  addFocusListeners(`.js-social-block`, [
    `.social-block__toggler`,
    `.social-block__link--fb`,
    `.social-block__link--insta`,
    `.social-block__link--vk`
  ]);

  const toggler = document.querySelector(`.social-block__toggler`);
  toggler.addEventListener(`click`, () => {
    toggler.classList.toggle(`social-block__toggler--down`);
  });
  toggler.addEventListener(`blur`, () => {
    toggler.classList.remove(`social-block__toggler--down`);
  });
};
