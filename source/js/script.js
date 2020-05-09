// modules
import mobileHeight from './modules/mobile-height-adjust.js';
import slider from './modules/slider.js';
import menu from './modules/menu.js';
import footer from './modules/footer.js';
import chat from './modules/chat.js';
import result from './modules/result.js';
import form from './modules/form.js';
import social from './modules/social.js';
import FullPageScroll from './modules/full-page-scroll';

// init modules
mobileHeight();
slider();
menu();
footer();
chat();
result();
form();
social();

// fullPageScroll выносится в глобальную область видимости, чтобы была
// возможность перезаписать метод changeVisibilityDisplay() в отдельном
// модуле additions/curtain.js
window.fullPageScroll = new FullPageScroll();
window.fullPageScroll.init();

// custom modules
import bodyload from './additions/bodyload.js';
import socialOnFocus from './additions/social-on-focus.js';
import curtain from './additions/curtain.js';
import rulesButton from './additions/rules-button.js';

bodyload();
socialOnFocus();
curtain();
rulesButton();
