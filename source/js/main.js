import {iosVhFix} from './utils/ios-vh-fix';
import {initModals} from './modules/modals/init-modals';

// ---------------------------------

window.addEventListener('DOMContentLoaded', () => {
  // Utils
  // ---------------------------------
  // aboutButton.addEventListener('click', (evt)=> {
  //   evt.target.textContent = 'Свернуть';

  //   if (evt.target.textContent === 'Свернуть') {
  //     evt.target.textContent = 'Подробнее';
  //   }
  // });


  iosVhFix();

  // Modules
  // ---------------------------
  const aboutButton = document.querySelector('.about__button');
  const addText = document.querySelector('.about__additional');
  const listOpen = document.querySelector('.user-nav__heading');
  const contactOpen = document.querySelector('.contact__heading');
  const screenWidth = window.screen.width;

  aboutButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    if (aboutButton.textContent === 'Подробнее') {
      aboutButton.textContent = 'Свернуть';
      addText.style.display = 'block';
      return;
    }
    if (aboutButton.textContent === 'Свернуть') {
      aboutButton.textContent = 'Подробнее';
      addText.style.display = 'none';
    }
  });
  const accordionItem = [contactOpen, listOpen];

  if (screenWidth <= 767) {
    document.querySelector('.user-nav__list').classList.add('visually-hidden');
    document.querySelector('.contact__box').classList.add('visually-hidden');
    accordionItem.forEach(function (item) {
      item.tabIndex = 0;
    });
  }

  let activeAccordion;
  accordionItem.forEach(function (item) {
    item.addEventListener('click', (evt) => {
      if (screenWidth <= 767) {
        if ((item.classList.contains('accordeon__heading--plus'))) {
          evt.target.classList.remove('accordeon__heading--plus');
          evt.target.nextElementSibling.classList.remove('visually-hidden');

          if (activeAccordion) {
            activeAccordion.classList.add('accordeon__heading--plus');
            activeAccordion.nextElementSibling.classList.add('visually-hidden');
          }

          activeAccordion = activeAccordion === item ? 0 : item;
        }
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
