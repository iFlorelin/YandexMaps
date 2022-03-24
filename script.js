
let crews_info = [
    {
    "crew_id":101,
    "car_mark":"Chevrolet",
    "car_model":"Lacetti",
    "car_color":"Синий",
    "car_number":"Е234КУ",
    "driver_name":"Деточкин",
    "driver_phone":"7788",
    "lat":56.85866916495641,
    "lon":53.22141850543203,
    "distance":0,
    "time": 0
    },{
    "crew_id":102,
    "car_mark":"Hyundai",
    "car_model":"Solaris",
    "car_color":"Белый",
    "car_number":"Ф567АС",
    "driver_name":"Петров",
    "driver_phone":"8899",
    "lat":56.85992983209387,
    "lon":53.19723570895376,
    "distance":0,
    "time": 0
    },{
    "crew_id":103,
    "car_mark":"Skoda",
    "car_model":"Octavia",
    "car_color":"Желтый",
    "car_number":"Л534АУ",
    "driver_name":"Николаенко",
    "driver_phone":"8899",
    "lat":56.869876094646294,
    "lon":53.181063101405556,
    "distance":0,
    "time": 0
    },{
    "crew_id":104,
    "car_mark":"Lada",
    "car_model":"Granta",
    "car_color":"Красный",
    "car_number":"В536ЛО",
    "driver_name":"Савойлов",
    "driver_phone":"8899",
    "lat":56.872051216127524,
    "lon":53.248046936508786,
    "distance":0,
    "time": 0
    }
];

let crew_order = [
    {
    "source_time":"",
    "addresses":[
        {
            "address":"",
            "lat": 0,
            "lon": 0
        }
    ],
    "crew_id": 0
    },
    {
    "code":0,
    "descr":"",
    }      
]




let car_list = document.querySelector('.car-list')
for (let i = 0; i < crews_info.length; i++) {
    car_list.innerHTML += `<div class="driver crew_id${crews_info[i].crew_id}"><div class="driver__img"><img src="./img/car-taxi.png" alt="car" width="70px" height="70px"></div><div class="driver__car"><div class="car__model">${crews_info[i].car_mark + ' ' + crews_info[i].car_model}</div><div class="car__color">${crews_info[i].car_color}</div><div class="car__number">${crews_info[i].car_number}</div></div><div class="car_info"><div class="car__distance">0 км</div><div class="car__time">0 мин</div></div></div>`

    document.querySelector(`.crew_id${crews_info[i].crew_id}`).style = `order: ${crews_info[i].time}`
  }

var myMap;
ymaps.ready(init);
function init () {

    const suggestView1 = new ymaps.SuggestView('suggest');
    myMap = new ymaps.Map('map', {
        center: [56.87495595968147,53.26797829021497], // Москва
        zoom: 17
    }, {
        searchControlProvider: 'yandex#search'
    });



    // Создание маршрута.
    function line (a, b, i) {
        var multiRoute = new ymaps.multiRouter.MultiRoute({
            referencePoints: [
                a,
                b
            ]
        }, {
            boundsAutoApply: true
        });
            
        multiRoute.model.events.add('requestsuccess', function() {
            let activeRoute = multiRoute.getActiveRoute();
            let driver = document.querySelectorAll('.driver');
            crews_info[i].distance = activeRoute.properties.get("distance").text;
            crews_info[i].time = activeRoute.properties.get("duration").text;
            driver[i].children[2].children[0].innerHTML = activeRoute.properties.get("distance").text;
            driver[i].children[2].children[1].innerHTML = activeRoute.properties.get("duration").text;
            document.querySelector(`.crew_id${crews_info[i].crew_id}`).style = `order: ${crews_info[i].time.replace(/[^0-9]/g,"")}`;
            let crew_driver = document.querySelector('.crew_driver');

            function toArray() {
                let number = [];
                for (let k = 0; k < crews_info.length; k++) {
                    let word = crews_info[k].time.toString();
                    word = +word.replace(/\D/g,'')
                    number.push(word)
                }
                function compareNumeric(a, b) {
                    if (a > b) return 1;
                    if (a == b) return 0;
                    if (a < b) return -1;
                  }
                  
                number.sort(compareNumeric);
                return number[0];
            }
            
            for (let k = 0; k < crews_info.length; k++) {
                let test = crews_info[k].time.toString().replace(/\D/g,'');
                if (toArray() == test) {
                    crew_driver.children[2].children[0].innerHTML = crews_info[k].distance
                    crew_driver.children[2].children[1].innerHTML = crews_info[k].time
                    crew_driver.children[1].children[0].innerHTML = crews_info[k].car_mark + ' ' + crews_info[k].car_model
                    crew_driver.children[1].children[1].innerHTML = crews_info[k].car_color
                    crew_driver.children[1].children[2].innerHTML = crews_info[k].car_number
                    crew_order[0].crew_id = crews_info[k].crew_id;
                }
            }
        });   
    }

    crew101 = new ymaps.Placemark([56.85866916495641,53.22141850543203], {
        balloonContentHeader: "Chevrolet Lacetti",
        balloonContentBody: "Синий",
        balloonContentFooter: "Е234КУ",
        hintContent: "Chevrolet Lacetti"
    }, {
        preset: 'islands#greenStretchyIcon',
        });
    crew102 = new ymaps.Placemark([56.85992983209387,53.19723570895376], {
        balloonContentHeader: "Hyundai Solaris",
        balloonContentBody: "Белый",
        balloonContentFooter: "Ф567АС",
        hintContent: "Hyundai Solaris"
    }, {
        preset: 'islands#greenStretchyIcon',
        });
    crew103 = new ymaps.Placemark([56.869876094646294,53.181063101405556], {
        balloonContentHeader: "Skoda Octavia",
        balloonContentBody: "Желтый",
        balloonContentFooter: "Л534АУ",
        hintContent: "Skoda Octavia"
    }, {
        preset: 'islands#greenStretchyIcon',
        });
    crew104 = new ymaps.Placemark([56.872051216127524,53.248046936508786], {
        balloonContentHeader: "Lada Granta",
        balloonContentBody: "Красный",
        balloonContentFooter: "В536ЛО",
        hintContent: "Lada Granta"
    }, {
        preset: 'islands#greenStretchyIcon',
        });

    myMap.geoObjects.add(crew101);
    myMap.geoObjects.add(crew102);
    myMap.geoObjects.add(crew103);
    myMap.geoObjects.add(crew104);

    
    myPlacemark = new ymaps.Placemark([], {
        balloonContentHeader: "Местоположение подачи Такси",
        balloonContentBody: "Пожалуйста, указывайте точный адрес",
        hintContent: "Местоположение подачи такси"
    }, {
    preset: 'islands#circleDotIcon',
    iconColor: 'yellow'
    });
    myMap.geoObjects.add(myPlacemark);

    myMap.events.add('click', function (e) {
        let coords = e.get('coords');
        crew_order[0].lat = coords[0];
        crew_order[0].lon = coords[1];
    
        for (let i = 0; i < crews_info.length; i++) {
            let car = [];
            car.push(crews_info[i].lat, crews_info[i].lon)
            line(coords, car, i)
        }

        if (myPlacemark) {
            myPlacemark.geometry.setCoordinates(coords);
        }
        else {
            myPlacemark = createPlacemark(coords);
            myMap.geoObjects.add(myPlacemark);
            myPlacemark.events.add('dragend', function () {
                getAddress(myPlacemark.geometry.getCoordinates());
            });
        }
        getAddress(coords);
        
    });
    
    
    function createPlacemark(coords) {
        return new ymaps.Placemark(coords, {
            iconCaption: 'поиск...'
        }, {
            preset: 'islands#yellowStretchyIcon',
            draggable: true
        });
    }

    function getAddress(coords) {
        myPlacemark.properties.set('iconCaption', 'поиск...');
        ymaps.geocode(coords).then(function (res) {
            let firstGeoObject = res.geoObjects.get(0);
            let input = document.querySelector('#suggest');
            let value = input.value;
            if (firstGeoObject.properties.getAll().metaDataProperty.GeocoderMetaData.precision == "exact") {
                input.value = firstGeoObject.properties.getAll().name;
                myPlacemark.options.set('iconColor', 'yellow');
                let button = document.querySelector('.button');
                let error = document.querySelector('.error__type');
                error.innerHTML = "";
                error.style.display = "none";
                button.style.background = "#ffef5e";
            }   else {
                error.style.display = "flex";
                error.innerHTML = "Адрес не найден";
                button.style.background = "#c9c9c9";
                myPlacemark.options.set('iconColor', 'red');
            }

            myPlacemark.properties
                .set({
                    iconCaption: [
                        firstGeoObject.getLocalities().length ? firstGeoObject.properties.get('name') : firstGeoObject.getAdministrativeAreas(),
                        firstGeoObject.getThoroughfare() || firstGeoObject.getPremise()
                    ].filter(Boolean).join(', '),
                    balloonContent: firstGeoObject.getAddressLine()
                });
        });
    }
}

document.querySelector('.btn').addEventListener('click', function (e) {
    let input = document.querySelector('#suggest');
    let value = input.value;

    ymaps.geocode(value, {
        results: 1
    }).then(function (res) {
            let firstGeoObject = res.geoObjects.get(0),
                coords = firstGeoObject.geometry.getCoordinates(),
                bounds = firstGeoObject.properties.get('boundedBy');
                
                crew_order[0].lat = coords[0];
                crew_order[0].lon = coords[1];

            firstGeoObject.options.set('preset', 'islands#darkBlueDotIconWithCaption');
            firstGeoObject.properties.set('iconCaption', firstGeoObject.getAddressLine());

            myMap.setBounds(bounds, {
                checkZoomRange: true
            });

            function line (a, b, i) {
                let multiRoute = new ymaps.multiRouter.MultiRoute({
                    referencePoints: [
                        a,
                        b
                    ]
                }, {
                    boundsAutoApply: true
                });
                
                multiRoute.model.events.add('requestsuccess', function() {
                    let activeRoute = multiRoute.getActiveRoute();
                    let driver = document.querySelectorAll('.driver');
                    crews_info[i].distance = activeRoute.properties.get("distance").text;
                    crews_info[i].time = activeRoute.properties.get("duration").text;
                    driver[i].children[2].children[0].innerHTML = activeRoute.properties.get("distance").text;
                    driver[i].children[2].children[1].innerHTML = activeRoute.properties.get("duration").text;
                    document.querySelector(`.crew_id${crews_info[i].crew_id}`).style = `order: ${crews_info[i].time.replace(/[^0-9]/g,"")}`
                    let crew_driver = document.querySelector('.crew_driver');

                    function toArray() {
                        let number = [];
                        for (let k = 0; k < crews_info.length; k++) {
                            let word = crews_info[k].time.toString();
                            word = +word.replace(/\D/g,'')
                            number.push(word)
                        }
                        function compareNumeric(a, b) {
                            if (a > b) return 1;
                            if (a == b) return 0;
                            if (a < b) return -1;
                          }
                          
                        number.sort(compareNumeric);
                        return number[0];
                    }
                    
                    for (let k = 0; k < crews_info.length; k++) {
                        let test = crews_info[k].time.toString().replace(/\D/g,'');
                        if (toArray() == test) {
                            crew_driver.children[2].children[0].innerHTML = crews_info[k].distance
                            crew_driver.children[2].children[1].innerHTML = crews_info[k].time
                            crew_driver.children[1].children[0].innerHTML = crews_info[k].car_mark + ' ' + crews_info[k].car_model
                            crew_driver.children[1].children[1].innerHTML = crews_info[k].car_color
                            crew_driver.children[1].children[2].innerHTML = crews_info[k].car_number
                            crew_order[0].crew_id = crews_info[k].crew_id;

                        }
                    }

                });
        }
            
        for (let i = 0; i < crews_info.length; i++) {
            let car = [];
            car.push(crews_info[i].lat, crews_info[i].lon)
            line(coords, car, i)
        }

            myPlacemark.geometry.setCoordinates(coords);
            myPlacemark.properties.set('iconCaption', 'поиск...');
            ymaps.geocode(coords).then(function (res) {
                let firstGeoObject = res.geoObjects.get(0);
                if (firstGeoObject.properties.getAll().metaDataProperty.GeocoderMetaData.precision == "exact") {
                input.value = firstGeoObject.properties.getAll().name;
                myPlacemark.options.set('iconColor', 'yellow');
                let button = document.querySelector('.button');
                let error = document.querySelector('.error__type');
                error.innerHTML = "";
                error.style.display = "none";
                button.style.background = "#ffef5e";
            }   else {
                error.style.display = "flex";
                error.innerHTML = "Адрес не найден";
                button.style.background = "#c9c9c9";
                myPlacemark.options.set('iconColor', 'red');
            }

                myPlacemark.properties
                    .set({
                        iconCaption: [
                            firstGeoObject.getLocalities().length ? firstGeoObject.properties.get('name') : firstGeoObject.getAdministrativeAreas(),
                            firstGeoObject.getThoroughfare() || firstGeoObject.getPremise()
                        ].filter(Boolean).join(', '),
                        balloonContent: firstGeoObject.getAddressLine()
                    });
            });
        });
});

let button = document.querySelector('.button');
let input = document.querySelector('#suggest');
let error = document.querySelector('.error__type');
button.addEventListener('click', function clearInput() {

    if (input.value == "") {
        error.style.display = "flex";
        error.innerHTML = "Это обязательное поле";
        button.style.background = "#c9c9c9";
    }

    if (error.textContent == "Адрес не найден") {
        error.style.display = "flex";
        error.innerHTML = "Адрес не найден";
        button.style.background = "#c9c9c9";
    }

    if (error.textContent == "") {
        let word = input.value.slice(input.value.indexOf('улица'));
        input.value = word;

        alert("Ваш заказ успешно обработан")
        let date = new Date();
        date = date.getFullYear() + ' ' + date.getMonth() + ' ' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
        crew_order[0].source_time = date;
        crew_order[0].addresses = input.value;
        crew_order[1].descr = "Ok";
        console.log(crew_order)


    }
})

input.addEventListener('input', ()=> {

    if (input.value !== "" && error.textContent == "Это обязательное поле") {
        error.innerHTML = "";
        error.style.display = "none";
        button.style.background = "#ffef5e";
    }
})







