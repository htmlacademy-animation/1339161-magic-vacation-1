export default () => {
  // Названия разделов вынесены в словарь, чтобы код лучше читался.
  const screenListMap = [`top`, `story`, `prizes`, `rules`, `game`];

  // Добавление шторки к экрану "История".
  const screenStory = document.querySelector(`.screen--story`);
  const curtain = document.createElement(`div`);
  curtain.classList.add(`curtain`);
  screenStory.appendChild(curtain);

  /**
   * Определение текущего экрана по активной ссылке в меню.
   * @return {int} Индекс экрана в массиве screenListMap или -1, если активыный
   *               экран не определн.
   * @return {void}
   */
  const getCurrentScreen = function () {
    const activeMenuLink = document.querySelector(`.js-menu-link.active`);
    if (activeMenuLink) {
      return screenListMap.indexOf(activeMenuLink.dataset.href);
    }
    return -1;
  };

  /**
   * Переключение между экранами.
   * @param  {Element} screenFrom Текущий (активный) экран.
   * @param  {Element} screenTo   Экран, на который призводится переключение.
   * @param  {int} delay          Задержка в милисекундах.
   * @return {void}
   */
  const switchScreens = function (screenFrom, screenTo, delay) {
    setTimeout(() => {
      screenFrom.classList.add(`screen--hidden`);
      screenFrom.classList.remove(`active`);
      screenTo.classList.remove(`screen--hidden`);
      screenTo.classList.add(`active`);
    }, delay);
  };

  /**
   * Проигрывает анимацию блока с учетом первичная эта анимация или повторная.
   * Анимация запускается через функцию animationFuncion, которая передается
   * как параметр. Если анимация проигрывается повторно, то эта функция
   * вызывается с аргументом true. Состояния хранятся как флаги в массиве
   * animatedScreensList, куда добавляются значения параметра name.
   *
   * @param  {string} name                Имя анимации, блока или экрана
   * @param  {string} animationFunction   Функция анимации. Если проигрывается
   *                                      повторно, то запускается с true
   *                                      в качестве единственного аргумента.
   * @return {void}
   */
  const animatedScreensList = [];
  const animateScreen = function (name, animationFunction) {
    if (animatedScreensList.indexOf(name) === -1) {
      animationFunction();
      animatedScreensList.push(name);
    } else {
      animationFunction(true);
    }
  };

  /**
   * Функция анимации страницы с призами.
   * @param  {Boolean} isPlayed Флаг повторной анмации (если True, то анимация
   *                            уже игралась).
   * @return {void}
   */
  const animatePrizes = function (isPlayed) {
    const prizesBlock = document.querySelector(`.screen--prizes .prizes`);
    const animationClass = `prizes--animated`;
    const primaryAward = document.querySelector(`.prizes__item--journeys img`);
    const secondaryAward = document.querySelector(`.prizes__item--cases img`);
    const secondaryAwardNumber = document.querySelector(`.prizes__item--cases .prizes__desc b`);

    if (isPlayed) {
      prizesBlock.classList.remove(animationClass);
      return;
    }

    primaryAward.src = `img/primary-award.svg`;
    secondaryAward.src = `img/secondary-award.svg`;
    secondaryAwardNumber.textContent = ``;
    prizesBlock.classList.add(animationClass);
  };

  // Если экран при загрузке — "Призы", то проигрывать анимацию сразу.
  if (screenListMap[getCurrentScreen()] === `prizes`) {
    animateScreen(`prizes`, animatePrizes);
  }

  /**
   * Переопределение метода, отвечающего за активацию раздела сайта. Раньше он
   * просто убирал с предыдущего раздела класс active и добавлял screen-hidden,
   * а теперь происходит проверка что это раздел и, если это раздел story,
   * то задается таймаут, за который успевает проиграться анимация шторки.
   */
  window.fullPageScroll.changeVisibilityDisplay = function () {
    const currentScreen = getCurrentScreen();

    // По умолчанию задержки при переключении нет.
    let curtainUpDelay = 0;

    // Если текущий экран — "История", то активируем поднятие шторки
    // и добавляем задержку при переключении.
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
      // Если сайт загружен сразу на внутреннем экране, то у шторки не будет
      // класса curtain--up, его нужно поставить.
      if (!curtain.classList.contains(`curtain--up`)) {
        curtain.classList.add(`curtain--up`);
      }
      setTimeout(() => {
        curtain.classList.remove(`curtain--up`);
      }, curtainDownDelay);
    }

    // Запуск анимации призов.
    if (screenListMap[this.activeScreen] === `prizes`) {
      animateScreen(`prizes`, animatePrizes);
    }

    // Само переключение экранов.
    switchScreens(
        this.screenElements[currentScreen],
        this.screenElements[this.activeScreen],
        curtainUpDelay
    );
  };
};
