export default () => {
  const DRAWING_PARTS = 3;
  const DRAWING_DURATION = `500ms`;

  const FALLING_VALUES = `-2.16 0; -2.16 110; -2.16 95; -2.16 110`;
  const FALLING_SPLINES = `0.55 0 1 0.45; 0.25 1 0.5 1; 0.55 0 1 0.45`;
  const FALLING_DELAY = `50ms`;
  const FALLING_DURATION = `500ms`;

  const APPEAR_SCALE_FROM = `1 1`;
  const APPEAR_SCALE_TO = `0.9 0.9`;
  const APPEAR_SCALE_DURATION = `250ms`;

  const APPEAR_TRANSLATE_FROM = `0 0`;
  const APPEAR_TRANSLATE_TO = `30 5`;
  const APPEAR_TRANSLATE_DURATION = `250ms`;

  const ANIMATION_ID_POSTFIX = `Appear`;

  /**
   * Создает SMIL-анимацию рисования контура и возвращает DOM-узел, который
   * нужно вставить в качестве потомка для объекта анимации.
   * @param  {string} begin       Время начала анимации, соответствует атрибуту
   *                              begin для <animate>.
   * @param  {[type]} strokeWidth Длина контура расчетного контура. В этот
   *                              атрибут лучше всего передавать результат
   *                              метода getTotalLength().
   * @return {element}            Узел <animate>, готовый для интеграции
   *                              с помощью appendChild().
   */
  const makeDrawingAnimation = function (begin, strokeWidth) {
    const animate = document.createElementNS(`http://www.w3.org/2000/svg`, `animate`);
    animate.setAttribute(`attributeName`, `stroke-dasharray`);
    animate.setAttribute(`class`, `positiveHeadingAppear`);
    animate.setAttribute(`from`, `0 ` + Math.ceil(strokeWidth / DRAWING_PARTS));
    animate.setAttribute(`to`, Math.ceil(strokeWidth / DRAWING_PARTS) + ` 0`);
    animate.setAttribute(`begin`, begin);
    animate.setAttribute(`dur`, DRAWING_DURATION);
    animate.setAttribute(`fill`, `freeze`);
    return animate;
  };

  /**
   * Создает SMIL-анимацию падения объекта и возвращает DOM-узел, который
   * нужно вставить в качестве потомка для объекта анимации.
   * @param  {string} begin       Время начала анимации, соответствует атрибуту
   *                              begin для <animate>.
   * @return {element}            Узел <animate>, готовый для интеграции
   *                              с помощью appendChild().
   */
  const makeFallingAnimation = function (begin) {
    const animate = document.createElementNS(`http://www.w3.org/2000/svg`, `animateTransform`);
    animate.setAttribute(`attributeName`, `transform`);
    animate.setAttribute(`type`, `translate`);
    animate.setAttribute(`begin`, begin);
    animate.setAttribute(`dur`, FALLING_DURATION);
    animate.setAttribute(`values`, FALLING_VALUES);
    animate.setAttribute(`keySplines`, FALLING_SPLINES);
    animate.setAttribute(`calcMode`, `spline`);
    animate.setAttribute(`fill`, `freeze`);
    return animate;
  };

  /**
   * Создает SMIL-анимацию появления заголовка победы.
   * @param  {string} selector CSS-селектор блока с SVG-изображением внутри
   *                           (не обязательно само изображение).
   * @param  {string} id       ID первой анимации
   * @return {void}
   */
  const assignPositiveAnimation = function (selector, id) {
    const heading = document.querySelector(selector + ` .positiveHeading`);

    const scale = document.createElementNS(`http://www.w3.org/2000/svg`, `animateTransform`);
    scale.setAttribute(`id`, id + ANIMATION_ID_POSTFIX);
    scale.setAttribute(`attributeName`, `transform`);
    scale.setAttribute(`type`, `scale`);
    scale.setAttribute(`from`, APPEAR_SCALE_FROM);
    scale.setAttribute(`to`, APPEAR_SCALE_TO);
    scale.setAttribute(`begin`, `indefinite`);
    scale.setAttribute(`dur`, APPEAR_SCALE_DURATION);
    scale.setAttribute(`fill`, `freeze`);
    heading.appendChild(scale);

    const translate = document.createElementNS(`http://www.w3.org/2000/svg`, `animateTransform`);
    translate.setAttribute(`attributeName`, `transform`);
    translate.setAttribute(`type`, `translate`);
    translate.setAttribute(`from`, APPEAR_TRANSLATE_FROM);
    translate.setAttribute(`to`, APPEAR_TRANSLATE_TO);
    translate.setAttribute(`begin`, id + ANIMATION_ID_POSTFIX + `.begin`);
    translate.setAttribute(`dur`, APPEAR_TRANSLATE_DURATION);
    translate.setAttribute(`additive`, `sum`);
    translate.setAttribute(`fill`, `freeze`);
    heading.appendChild(translate);

    const letters = heading.querySelectorAll(`.letter`);
    letters.forEach((element) => {
      element.appendChild(makeDrawingAnimation(id + `Appear.begin`, element.getTotalLength()));
    });
  };

  /**
   * Создает SMIL-анимацию появления заголовка поражения.
   * @param  {string} selector CSS-селектор блока с SVG-изображением внутри
   *                           (не обязательно само изображение).
   * @param  {string} id       ID первой анимации
   * @return {void}
   */
  const assignNegativeAnimation = function (selector, id) {
    const heading = document.querySelector(selector + ` .negativeHeading`);

    let previousAnimation = id + ANIMATION_ID_POSTFIX;

    const dummy = document.createElementNS(`http://www.w3.org/2000/svg`, `animate`);
    dummy.setAttribute(`id`, previousAnimation);
    dummy.setAttribute(`attributeName`, `opacity`);
    dummy.setAttribute(`from`, 0);
    dummy.setAttribute(`to`, 1);
    dummy.setAttribute(`begin`, `indefinite`);
    dummy.setAttribute(`dur`, `1ms`);
    heading.appendChild(dummy);

    const letters = heading.querySelectorAll(`.letter`);
    letters.forEach((element) => {
      const letterId = element.id;
      const pathLength = element.getTotalLength();
      const falligAnimation = makeFallingAnimation(previousAnimation + `.begin+` + FALLING_DELAY);
      const drawingAnimation = makeDrawingAnimation(previousAnimation + `.begin`, pathLength);
      previousAnimation = letterId + ANIMATION_ID_POSTFIX;
      falligAnimation.setAttribute(`id`, previousAnimation);

      element.setAttribute(`stroke-dasharray`, `0 ` + Math.ceil(pathLength / DRAWING_PARTS));
      element.appendChild(falligAnimation);
      element.appendChild(drawingAnimation);
    });
  };

  // Добавление анимации сообщения о главном призе
  const tripHeadingId = `tripHeading`;
  const tripResult = document.querySelector(`.js-show-result[data-target=result]`);
  assignPositiveAnimation(`.result--trip`, tripHeadingId);
  tripResult.addEventListener(`click`, () => {
    const tripHeadingAppear = document.querySelector(`#` + tripHeadingId + ANIMATION_ID_POSTFIX);
    tripHeadingAppear.beginElement();
  });

  // Добавление анимации сообщения о второстепенном призе
  const prizeHeadingId = `prizeHeading`;
  const prizeResult = document.querySelector(`.js-show-result[data-target=result2]`);
  assignPositiveAnimation(`.result--prize`, prizeHeadingId);
  prizeResult.addEventListener(`click`, () => {
    const prizeHeadingAppear = document.querySelector(`#` + prizeHeadingId + ANIMATION_ID_POSTFIX);
    prizeHeadingAppear.beginElement();
  });

  // Добавление анимации сообщения об отсутствии приза
  const negativeHeadingId = `negativeHeading`;
  const negativeResult = document.querySelector(`.js-show-result[data-target=result3]`);
  assignNegativeAnimation(`.result--negative`, negativeHeadingId);
  negativeResult.addEventListener(`click`, () => {
    const negativeHeadingAppear = document.querySelector(`#` + negativeHeadingId + ANIMATION_ID_POSTFIX);
    negativeHeadingAppear.beginElement();
  });
};
