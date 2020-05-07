export default () => {
  let socialBlock = document.querySelector(`.js-social-block`);
  let socialBlockToggler = document.querySelector(`.social-block__toggler`);
  let socialBlockLinkFB = document.querySelector(`.social-block__link--fb`);
  let socialBlockLinkInsta = document.querySelector(`.social-block__link--insta`);
  let socialBlockLinkVK = document.querySelector(`.social-block__link--vk`);

  socialBlockToggler.addEventListener(`focus`, function () {
    socialBlock.classList.add(`social-block--active`);
  });

  socialBlockLinkFB.addEventListener(`focus`, function () {
    socialBlock.classList.add(`social-block--active`);
  });

  socialBlockLinkInsta.addEventListener(`focus`, function () {
    socialBlock.classList.add(`social-block--active`);
  });

  socialBlockLinkVK.addEventListener(`focus`, function () {
    socialBlock.classList.add(`social-block--active`);
  });

  socialBlockToggler.addEventListener(`blur`, function () {
    socialBlock.classList.remove(`social-block--active`);
  });

  socialBlockLinkFB.addEventListener(`blur`, function () {
    socialBlock.classList.remove(`social-block--active`);
  });

  socialBlockLinkInsta.addEventListener(`blur`, function () {
    socialBlock.classList.remove(`social-block--active`);
  });

  socialBlockLinkVK.addEventListener(`blur`, function () {
    socialBlock.classList.remove(`social-block--active`);
  });
};
