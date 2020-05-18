export default () => {
  // Названия разделов вынесены в словарь, чтобы код лучше читался
  const screenListMap = [`top`, `story`, `prizes`, `rules`, `game`];

  const screenStory = document.querySelector(`.screen--story`);
  const curtain = document.createElement(`div`);
  curtain.classList.add(`curtain`);
  screenStory.appendChild(curtain);

  let prizesShown = false; // Флаг, предотваращает повторны запуск анимации призов
  const prizesBlock = document.querySelector(`.screen--prizes .prizes`);
  const primaryAward = document.querySelector(`.prizes__item--journeys img`);


  // Переопределение метода, отвечающего за активацию раздела сайта. Раньше он
  // просто убирал с предыдущего раздела класс active и добавлял screen-hidden,
  // а теперь происходит проверка что это раздел и, если это раздел story,
  // то задается таймаут, за который успевает проиграться анимация шторки.
  window.fullPageScroll.changeVisibilityDisplay = function () {
    const getCurrentScreen = function () {
      const activeMenuLink = document.querySelector(`.js-menu-link.active`);
      if (activeMenuLink) {
        return screenListMap.indexOf(activeMenuLink.dataset.href);
      }
      return -1;
    };

    const switchScreens = function (screenFrom, screenTo, delay) {
      setTimeout(() => {
        screenFrom.classList.add(`screen--hidden`);
        screenFrom.classList.remove(`active`);
        screenTo.classList.remove(`screen--hidden`);
        screenTo.classList.add(`active`);
      }, delay);
    };

    const currentScreen = getCurrentScreen();
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

    // Запуск анимации призов
    if (screenListMap[this.activeScreen] === `prizes`) {
      if (!prizesShown) {
        prizesBlock.classList.add(`prizes--animated`);
        if (primaryAward) {
          primaryAward.src = `img/primary-award.svg`;
        }

        prizesShown = true;
      } else {
        prizesBlock.classList.remove(`prizes--animated`);
      }
    }

    switchScreens(this.screenElements[currentScreen], this.screenElements[this.activeScreen], curtainUpDelay);
  };
};
