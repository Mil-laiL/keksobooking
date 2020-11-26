'use strict';

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

// переключение карты из неактивного состояния в активное
var map = document.querySelector('.map');
map.classList.remove('map--faded');

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

  // pinElement.style = 'left:' + locationX + 'px; top:' + locationY + 'px;';
  // pinImg.src = src;
  // pinImg.alt = alt;

  return pinElement;
};

// создание фрагмента
var fragment = document.createDocumentFragment();

// вызов функции отрисовки меток
for (i = 0; i < pins.length; i++) {
  fragment.appendChild(renderPins(pins[i].location.x, pins[i].location.y, pins[i].author.avatar, pins[i].offer.type));
}

// добавление меток в блок
pinListElement.appendChild(fragment);

// console.log();
