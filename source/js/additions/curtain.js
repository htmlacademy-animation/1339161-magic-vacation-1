export default () => {
  // Названия разделов вынесены в словарь, чтобы код лучше читался
  const screenListMap = [`top`, `story`, `prizes`, `rules`, `game`];

  let screenStory = document.querySelector(`.screen--story`);
  let curtain = document.createElement(`div`);
  curtain.classList.add(`curtain`);
  screenStory.appendChild(curtain);

  // Переопределение метода, отвечающего за активацию раздела сайта. Раньше он
  // просто убирал с предыдущего раздела класс active и добавлял screen-hidden,
  // а теперь происходит проверка что это раздел и, если это раздел story,
  // то задается таймаут, за который успевает проиграться анимация шторки.
  window.fullPageScroll.changeVisibilityDisplay = function () {
    let getCurrentScreen = function () {
      let activeMenuLink = document.querySelector(`.js-menu-link.active`);
      if (activeMenuLink) {
        return screenListMap.indexOf(activeMenuLink.dataset.href);
      }
      return -1;
    };

    let switchScreens = function (screenFrom, screenTo, delay) {
      setTimeout(() => {
        screenFrom.classList.add(`screen--hidden`);
        screenFrom.classList.remove(`active`);
        screenTo.classList.remove(`screen--hidden`);
        screenTo.classList.add(`active`);
      }, delay);
    };

    let currentScreen = getCurrentScreen();
    let curtainUpDelay = 0;

    if (screenListMap[currentScreen] === `story`) {
      curtain.classList.add(`curtain--up`);
      curtainUpDelay = 750;
    }

    // Чтобы проигрывать анимацию открытия шторы при преходе в историю с других
    // разделов, нужно взять небольшой таймаут после активции раздела и только
    // после этого убрать класс curtain--up, чтобы шторка опустилась.
    if (screenListMap[this.activeScreen] === `story`) {
      let curtainDownDelay = 100;
      // Если текущий раздел — главная страница, то анимациию шторы применять не
      // нужно, для этого зануляем таймаут.
      if (screenListMap[currentScreen] === `top`) {
        curtainDownDelay = 0;
      }
      setTimeout(() => {
        curtain.classList.remove(`curtain--up`);
      }, curtainDownDelay);
    }

    switchScreens(this.screenElements[currentScreen], this.screenElements[this.activeScreen], curtainUpDelay);
  };
};
