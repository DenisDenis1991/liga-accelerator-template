import {iosVhFix} from './utils/ios-vh-fix';
import {initModals} from './modules/modals/init-modals';

// ---------------------------------

window.addEventListener('DOMContentLoaded', () => {

  iosVhFix();

  // Modules
  // ---------------------------
  const aboutButton = document.querySelector('.about__button');
  const descriptionMobile = document.querySelector('.about__description--mobile');
  const addText = document.querySelector('.about__additional');
  const listOpen = document.querySelector('.user-nav__heading');
  const contactOpen = document.querySelector('.contact__heading');
  const navList = document.querySelector('.user-nav__list');
  const contactList = document.querySelector('.contact__box');

  aboutButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    if (evt.target.textContent === 'Подробнее') {
      evt.target.textContent = 'Свернуть';
      addText.style.display = 'block';
      descriptionMobile.classList.remove('about__description--mobile');
      return;
    }
    if (evt.target.textContent === 'Свернуть') {
      evt.target.textContent = 'Подробнее';
      addText.style.display = 'none';
      descriptionMobile.classList.add('about__description--mobile');
    }
  });

  const accordeonList = [navList, contactList];
  const accordeonOpenList = [contactOpen, listOpen];

  if (window.outerWidth <= 767) {
    accordeonList.forEach((item) => {
      item.classList.add('accordeon__close');
    });
    accordeonOpenList.forEach((element) => {
      element.tabIndex = 0;
    });
  }

  let activeAccordion;
  accordeonOpenList.forEach(function (item) {
    if (window.outerWidth <= 767) {
      item.addEventListener('click', () => {
        if ((item.classList.contains('accordeon__heading--plus'))) {
          item.classList.remove('accordeon__heading--plus');
          item.nextElementSibling.classList.remove('accordeon__close');

          if (activeAccordion) {
            activeAccordion.classList.add('accordeon__heading--plus');
            activeAccordion.nextElementSibling.classList.add('accordeon__close');
          }

          activeAccordion = activeAccordion === item ? 0 : item;
        }
      }
      );
    }
  });

  const input = document.getElementsByName('phone');

  const prefixNumber = (str) => {
    if (str === '7') {
      return '7 (';
    }
    if (str === '8') {
      return '8 (';
    }
    if (str === '9') {
      return '7 (9';
    }
    return '7 (';
  };

  // ======================================
  input.forEach((element) => element.addEventListener('input', () => {
    const value = element.value.replace(/\D+/g, '');
    const numberLength = 11;

    let result;
    if (element.value.includes('+8') || element.value[0] === '8') {
      result = '';
    } else {
      result = '+';
    }

    //
    for (let i = 0; i < value.length && i < numberLength; i++) {
      switch (i) {
        case 0:
          result += prefixNumber(value[i]);
          continue;
        case 4:
          result += ') ';
          break;
        case 7:
          result += '-';
          break;
        case 9:
          result += '-';
          break;
        default:
          break;
      }
      result += value[i];
    }
    //
    element.value = result;
  })
  );

  // все скрипты должны быть в обработчике 'DOMContentLoaded', но не все в 'load'
  // в load следует добавить скрипты, не участвующие в работе первого экрана
  window.addEventListener('load', () => {
    initModals();
  });


  // ---------------------------------

  // ❗❗❗ обязательно установите плагины eslint, stylelint, editorconfig в редактор кода.

  // привязывайте js не на классы, а на дата атрибуты (data-validate)

  // вместо модификаторов .block--active используем утилитарные классы
  // .is-active || .is-open || .is-invalid и прочие (обязателен нейминг в два слова)
  // .select.select--opened ❌ ---> [data-select].is-open ✅

  // выносим все в дата атрибуты
  // url до иконок пинов карты, настройки автопрокрутки слайдера, url к json и т.д.

  // для адаптивного JS используется matchMedia и addListener
  // const breakpoint = window.matchMedia(`(min-width:1024px)`);
  // const breakpointChecker = () => {
  //   if (breakpoint.matches) {
  //   } else {
  //   }
  // };
  // breakpoint.addListener(breakpointChecker);
  // breakpointChecker();

  // используйте .closest(el)
});
