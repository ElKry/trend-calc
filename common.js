'use strict';

(function () {
var d = {
  "programms":[
      {
      "id":1421,
      "name":" 2.4 - 2 очередь 4 кв. 2017",
      "programms":[
          {
          "id":1,
          "name":"Беспроцентная рассрочка на 36 месяцев",
          "props":[
              {
                  "id":"pay_type",
                  "name":"Ежемесячный или ежеквартальный платеж",
                  "type":"select",
                  "sendName":"pay_type",
                  "values":[
                  {
                      "name":"Ежемесячный платеж",
                      "value":1
                  },
                  {
                      "name":"Eжеквартальный платеж",
                      "value":2
                  }]
              },
              {
                  "id":"price",
                  "name":"Стоимость квартиры, руб",
                  "type":"input",
                  "sendName":"price",
                  "defaultValue":1800011
              },
              {
                  "id":"first_pay",
                  "name":"Первый взнос, руб",
                  "type":"input",
                  "sendName":"first_pay",
                  "min":0.3,
                  "max":0.9,
                  "parent":"price"
              },
              {
                  "id":"date",
                  "type":"hidden",
                  "sendName":"date_end",
                  "value":"2017-12-14T21:00:00.000Z"
              }
          ]},
          {
          "id":2,
          "name":"Беспроцентная рассрочка на 38 месяцев",
          "props":[
              {
                  "id":"pay_type",
                  "name":"Ежемесячный или ежеквартальный платеж",
                  "type":"select",
                  "sendName":"pay_type",
                  "values":[
                  {
                      "name":"Ежемесячный платеж",
                      "value":1
                  },
                  {
                      "name":"Eжеквартальный платеж",
                      "value":2
                  }]
              },
              {
                  "id":"price",
                  "name":"Стоимость квартиры, руб",
                  "type":"input",
                  "sendName":"price",
                  "defaultValue":1800012
              },
              {
                  "id":"first_pay",
                  "name":"Первый взнос, руб",
                  "type":"input",
                  "sendName":"first_pay",
                  "min":0.3,
                  "max":0.9,
                  "parent":"price"
              },
              {
                  "id":"date",
                  "type":"hidden",
                  "sendName":"date_end",
                  "value":"2017-12-14T21:00:00.000Z"
              }
          ]}
        ]
			},
			{
      "id":1401,
      "name":" 2.5 - 2 очередь 4 кв. 2017",
      "programms":[
          {
          "id":1,
          "name":"Беспроцентная рассрочка на 39 месяцев",
          "props":[
              {
                  "id":"pay_type",
                  "name":"Ежемесячный или ежеквартальный платеж",
                  "type":"select",
                  "sendName":"pay_type",
                  "values":[
                  {
                      "name":"Ежемесячный платеж",
                      "value":1
                  },
                  {
                      "name":"Eжеквартальный платеж",
                      "value":2
                  }]
              },
              {
                  "id":"price",
                  "name":"Стоимость квартиры, руб",
                  "type":"input",
                  "sendName":"price",
                  "defaultValue":1800018
              },
              {
                  "id":"first_pay",
                  "name":"Первый взнос, руб",
                  "type":"input",
                  "sendName":"first_pay",
                  "min":0.3,
                  "max":0.9,
                  "parent":"price"
              },
              {
                  "id":"date",
                  "type":"hidden",
                  "sendName":"date_end",
                  "value":"2017-12-14T21:00:00.000Z"
              }
          ]}
        ]
			}]
};

var response = {
    "building": "1421",
    "programm_id": "1",
    "pay_type": "2",
    "price": "10000000",
    "first_pay": "3000000",
    "date_end": "2022-09-29T13:32:00+00:00",
};

var load = function () {
  return function (url, onLoad) {
    var xhr = new XMLHttpRequest();

    xhr.addEventListener('load', function (evt) {
      if (evt.target.status >= 400) {
        window.console.log('Failed to load data. Server returned status: ' + evt.target.status);
      } else if (evt.target.status >= 200) {
        onLoad(evt.target.response);
      }
    });

    xhr.responseType = 'json';

    xhr.open('GET', url);
    xhr.send();
  };
};

var initializeSelect = function (programm, select) {
	for (var i = 0; i < programm.length; i++) {
		var option = document.createElement('option');
		option.setAttribute('id', programm[i].id);
		option.text = programm[i].name;
		select.appendChild(option);

		if (i === 0) {
			option.setAttribute('selected', '');
		}
	}
};

var createPropsElements = function (form, props, number) {
	var formGroup =  document.createElement('div');
	var submit = form.querySelector('button.submit');
	formGroup.classList.add('form-group');

	var label = document.createElement('label');
	label.setAttribute('for', props[number].id);
	label.innerText = props[number].name;
	formGroup.appendChild(label);

	var element = document.createElement(props[number].type);
	element.setAttribute('id', props[number].id);
	element.setAttribute('name', props[number].sendName);

	formGroup.appendChild(label);
	formGroup.appendChild(element);
	form.insertBefore(formGroup, submit);

	if (props[number].type === 'select') {
		var options = props[number].values;
		options.forEach(function (item, l, arr) {
			var option = document.createElement('option');
			option.setAttribute('value', item.value);
			option.text = item.name;
			element.appendChild(option);
		
			if (l === 0) {
				option.setAttribute('selected', '');
			}
		});
	} else {
		if (props[number].id === 'price') {
			element.value = props[number].defaultValue;
		}
		if (props[number].id === 'first_pay') {
			element.value = Math.floor(props[number].min * props[1].defaultValue);
		}
	}
};

var changeForm = function (resp, form, programms) {
	var programmNameBlock = document.querySelector('.info-wrap .name');
	var everyDateBlock = document.querySelector('.info-wrap .every-date span');
	var everyPayBlock = document.querySelector('.info-wrap .every-pay span');
	var lastDateBlock = document.querySelector('.info-wrap .last-date');
	var lastPayBlock = document.querySelector('.info-wrap .last-pay span');
	var building = resp.building;
	var programmId = resp.programm_id;
	var payTypeId = resp.pay_type;
	var everyPay = resp.first_pay;
	for (var i = 0; i < programms.length; i++) {
		if (programms[i].id == building) {
			console.log(programms[i].id);
			for (var j = 0; j < programms[i].programms.length; j++) {
				if (programms[i].programms[j].id == programmId) {
					programmNameBlock.innerText = programms[i].programms[j].name;
					var payNames = programms[i].programms[j].props[0].values;
					for (var l = 0; l < payNames.length; l++) {
						if (payNames[l].value == payTypeId) {
							everyDateBlock.innerText = programms[i].programms[j].props[0].values[l].name;
						}
					}
					everyPayBlock.innerText = everyPay;
				}
			}
		}
	}
};

var initializeForm = function (data, resp) {
	var form = document.querySelector('form');
	var selects = form.querySelectorAll('.form-group > select');
	var programms = data.programms;

	initializeSelect(programms, selects[0]);
	initializeSelect(programms[0].programms, selects[1]);

	var props = programms[0].programms[0].props;
	for (var i = 0; i < props.length - 1; i++) {
		createPropsElements(form, props, i);
	}

	form.addEventListener('change', function () {
		changeForm(resp, form, programms);
	});

	form.addEventListener('submit', function (evt) {
		evt.preventDefault();
		changeForm(resp, form, programms);
	});
};

initializeForm(d, response);
})();