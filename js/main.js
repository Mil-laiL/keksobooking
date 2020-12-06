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

  // добавление меток на карту
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


// module4-task2


// Поле ввода Заголовок объявления
var title = document.querySelector('#title');

// Добавление атрибутов обязательного поля и длины вводимых символов
addAttribute(title, 'type', 'text');
addAttribute(title, 'required', '');
addAttribute(title, 'minlength', 30);
addAttribute(title, 'maxlength', 100);

// Поле ввода Цена за ночь
var price = document.querySelector('#price');

// Добавление атрибутов обязательного поля, числовое поле и максимальное значение
addAttribute(price, 'required', '');
addAttribute(price, 'type', 'number');
addAttribute(price, 'max', 1000000);

// Выбор типа жилья
var selectTypeHouse = document.querySelector('#type');

// Функция изменения placeholder и добавление минимального значения в зависимости от выбранного типа жилья
var changePrice = function (evt) {
  if (evt.target.value === 'bungalo') {
    addAttribute(price, 'placeholder', 0);
    addAttribute(price, 'min', 0);
  } else if (evt.target.value === 'flat') {
    addAttribute(price, 'placeholder', 1000);
    addAttribute(price, 'min', 1000);
  } else if (evt.target.value === 'house') {
    addAttribute(price, 'placeholder', 5000);
    addAttribute(price, 'min', 5000);
  } else if (evt.target.value === 'palace') {
    addAttribute(price, 'placeholder', 10000);
    addAttribute(price, 'min', 10000);
  }
};

// вызов функции изменения placeholder
selectTypeHouse.addEventListener('change', function (evt) {
  changePrice(evt);
});

// Ограничение ручного редактирования поля
addAttribute(addres, 'readonly', '');

// время заезда
var timeIn = document.querySelector('#timein');

// время выезда
var timeOut = document.querySelector('#timeout');

// синхронизация выбора времени заезда с временем выезда
timeIn.addEventListener('change', function () {
  timeOut.selectedIndex = timeIn.selectedIndex;
});

// синхронизация выбора времени выезда с временем заезда
timeOut.addEventListener('change', function () {
  timeIn.selectedIndex = timeOut.selectedIndex;
});

// количество комнат
var roomNumberSelect = document.querySelector('#room_number');

// количество гостей
var capacityOptions = document.querySelectorAll('#capacity option');

// добавление disabled в поле выбора гостей
for (i = 0; i < capacityOptions.length; i++) {
  capacityOptions[i].disabled = true;
}

// объект количества комнат
var roomNumber = {
  one: '1',
  two: '2',
  three: '3',
  hundred: '100'
};

// функция выбора количества гостей в зависимости от количества комнат
var selectNumberRoom = function (room, capacity) {

  if (room.value === roomNumber.one) {
    capacity[0].disabled = true;
    capacity[1].disabled = true;
    capacity[2].disabled = false;
    capacity[3].disabled = true;
  } else if (room.value === roomNumber.two) {
    capacity[0].disabled = true;
    capacity[1].disabled = false;
    capacity[2].disabled = false;
    capacity[3].disabled = true;
  } else if (room.value === roomNumber.three) {
    capacity[0].disabled = false;
    capacity[1].disabled = false;
    capacity[2].disabled = false;
    capacity[3].disabled = true;
  } else if (room.value === roomNumber.hundred) {
    capacity[0].disabled = true;
    capacity[1].disabled = true;
    capacity[2].disabled = true;
    capacity[3].disabled = false;
  }

};

// вызов функции выбора количества комнат и гостей
roomNumberSelect.addEventListener('change', function () {
  selectNumberRoom(roomNumberSelect, capacityOptions);
});
