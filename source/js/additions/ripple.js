export default () => {
  const stringClassName = `ripple`;
  const wordClassName = `ripple__word`;
  const letterClassName = `ripple__letter`;

  const markUpString = function (text) {
    const markedWords = document.createDocumentFragment();

    if (typeof text !== `string`) {
      return markedWords;
    }

    const words = text.trim().split(` `).filter((word) => word !== ``);

    for (let i = 0; i < words.length; i++) {
      if (i > 0) {
        markedWords.appendChild(document.createTextNode(` `));
      }

      let wordSpan = document.createElement(`span`);
      wordSpan.classList.add(wordClassName);

      for (let j = 0; j < words[i].length; j++) {
        let letterSpan = document.createElement(`span`);
        letterSpan.classList.add(letterClassName);
        letterSpan.textContent = words[i][j];
        wordSpan.appendChild(letterSpan);
      }

      markedWords.appendChild(wordSpan);
    }

    return markedWords;
  };

  const ripple = function (selector, delay) {
    const element = document.querySelector(selector);
    const elementMarkup = markUpString(element.textContent);

    while (element.firstChild) {
      element.removeChild(element.lastChild);
    }

    element.appendChild(elementMarkup);

    setTimeout(() => {
      element.classList.add(stringClassName);
    }, delay);
  };

  ripple(`.intro__title`, 350);
  ripple(`.intro__date`, 1000);
  ripple(`.prizes__title`, 250);
};
