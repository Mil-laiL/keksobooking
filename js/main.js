'use strict';

// module3-task1


// массив меток
var pins = [];

// массив тип жилья
var house = ['palace', 'flat', 'house', 'bungalo'];

// функция генерации случайного числа
var getRandomNum = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

// функция создания объекта с данными
var createDataPins = function (urlImg, typeHouse, coordPinX, coordPinY) {

  var data = {
    'author': {
      'avatar': urlImg
    },
    'offer': {
      'type': typeHouse
    },

    'location': {
      'x': coordPinX,
      'y': coordPinY
    }
  };

  return data;
};

// запись данных в масив
for (var i = 1; i <= 8; i++) {
  pins.push(createDataPins('img/avatars/user0' + i + '.png', house[getRandomNum(0, house.length)], getRandomNum(0, 1150), getRandomNum(200, 560)));
}

// получение шаблона из <template>
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

// получение блока меток
var pinListElement = document.querySelector('.map__pins');

// функция отрисовки меток
var renderPins = function (locationX, locationY, src, alt) {

  var pinElement = pinTemplate.cloneNode(true);

  pinElement.style = 'left:' + locationX + 'px; top:' + locationY + 'px;';
  pinElement.querySelector('img').src = src;
  pinElement.querySelector('img').alt = alt;

  return pinElement;
};

// создание фрагмента
var fragment = document.createDocumentFragment();

// вызов функции отрисовки меток
for (i = 0; i < pins.length; i++) {
  fragment.appendChild(renderPins(pins[i].location.x, pins[i].location.y, pins[i].author.avatar, pins[i].offer.type));
}


// module4-task1


// функция добавления атрибута
var addAttribute = function (elem, name, value) {
  elem.setAttribute(name, value);
};

// функция удаления атрибута
var deleteAttribute = function (elem, att) {
  elem.removeAttribute(att);
};

// блокировка формы
var fieldset = document.querySelector('.ad-form');
for (i = 0; i < fieldset.length; i++) {
  addAttribute(fieldset[i], 'disabled', 'disabled');
}

// блокировка фильтров
var filters = document.querySelector('.map__filters');
for (i = 0; i < filters.length; i++) {
  addAttribute(filters[i], 'disabled', 'disabled');
}

// крата и главная метка
var map = document.querySelector('.map');
var mainPin = document.querySelector('.map__pin--main');

// функция активации карты
var activateMap = function () {

  // переключение карты из неактивного состояния в активное
  map.classList.remove('map--faded');
  fieldset.classList.remove('ad-form--disabled');

  // удаление атрибута disabled у формы
  for (i = 0; i < fieldset.length; i++) {
    deleteAttribute(fieldset[i], 'disabled');
  }

  // удаление атрибута disabled у фильтров
  for (i = 0; i < filters.length; i++) {
    deleteAttribute(filters[i], 'disabled');
  }

  // добавление меток на крту
  pinListElement.appendChild(fragment);
};

// вызов функции активации карты при клике на главную метку
mainPin.addEventListener('click', function () {
  activateMap();
});

// получение поля адреса
var addres = document.querySelector('#address');

// создание координат главной метки
var mainPinX = mainPin.offsetLeft;
var mainPinY = mainPin.offsetTop;

// запись в поле адреса
addres.value = mainPinX + ',' + mainPinY;

// функция записи координат главной метки в поле адреса
var getCoordMainPin = function (x, y) {
  addres.value = x + ',' + y;
};

// вызов функции записи координат главной метки в поле адреса при событии mouseup
mainPin.addEventListener('mouseup', function () {
  getCoordMainPin(mainPinX, mainPinY);
});

// console.log();
