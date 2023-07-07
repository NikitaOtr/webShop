import ymaps  from 'ymaps';
import s from './YandexMap.module.scss';

import { StaticPointOfIssue, IPlaceMarker, IPointOfIssue } from './../../types/userTypes';

const url = 'https://api-maps.yandex.ru/2.1/?lang=ru_RU&apikey=4b3916b1-09ee-4ea6-82b0-7a19670866a8';

const createMapCourier = (id: string, setAddress: Function, initAddress: IPlaceMarker) => {

    ymaps.load(url)
        .then((ApiYmaps) => {
            let myPlaceMarker;
            const map = new ApiYmaps.Map(id, {
                center: initAddress ? initAddress.coords : [57.63405186811238,39.89975989778784],
                zoom: 15,
                controls: [],
            }, {
                restrictMapArea: [[57.51758848230495,39.32604124999993], [57.78337048570149,40.380728749999946]],
                yandexMapDisablePoiInteractivity: true,
            });

            map.controls.remove('geolocationControl');
            map.controls.remove('trafficControl');
            map.controls.remove('typeSelector');
            map.controls.remove('fullscreenControl');
            map.controls.remove('rulerControl');

            if (initAddress) {
                myPlaceMarker = createPlaceMarker(initAddress.coords);
                map.geoObjects.add(myPlaceMarker);
                getAddress(myPlaceMarker.geometry.getCoordinates());
                myPlaceMarker.events.add('PositionChange',() => {
                    getAddress(myPlaceMarker.geometry.getCoordinates());
                });
            }
        
            map.events.add('click', e => {
                const coords = e.get('coords');
                if (myPlaceMarker) {
                    myPlaceMarker.geometry.setCoordinates(coords);
                    getAddress(myPlaceMarker.geometry.getCoordinates());
                } else {
                    myPlaceMarker = createPlaceMarker(coords);
                    map.geoObjects.add(myPlaceMarker);
                    myPlaceMarker.events.add('PositionChange', () => {
                        getAddress(myPlaceMarker.geometry.getCoordinates());
                    });
                    getAddress(myPlaceMarker.geometry.getCoordinates());
                }
            });

            function createPlaceMarker(coords) {
                return new ApiYmaps.Placemark(coords, {
                    iconCaption: 'поиск...'
                }, {
                    preset: 'islands#violetDotIconWithCaption',
                    draggable: false
                });
            }

            function getAddress(coords) {
                myPlaceMarker.properties.set('iconCaption', 'поиск...');
                ApiYmaps.geocode(coords).then(res => {
                    const firstGeoObject = res.geoObjects.get(0);

                    const address = [
                        firstGeoObject.getLocalities().length ? firstGeoObject.getLocalities() : firstGeoObject.getAdministrativeAreas(),
                        firstGeoObject.getThoroughfare() || firstGeoObject.getPremise()
                    ].filter(Boolean).join(', ');
            
                    myPlaceMarker.properties.set({
                        iconCaption: address,
                        balloonContent: firstGeoObject.getAddressLine()
                    });
                    setAddress({name: address, coords});
                });
            }
        });
};

const createMapPickup = (id: string, setPointOfIssue: Function, initPointOfIssue: IPointOfIssue) => {
    let map;
    const placeMarks = {};

    const changePlaceMarker = (id: number, isChangeCenter=true) => {
        setPointOfIssue(StaticPointOfIssue[id])
        Object.keys(placeMarks).forEach(key => {
            const placeMark = placeMarks[key];
            const numberKey = +key;
            if (numberKey === id) {
                placeMark.properties.set({iconCaption: `Ваш выбор: ${StaticPointOfIssue[id].shortName}`});
                if (isChangeCenter) {
                    map.setCenter(StaticPointOfIssue[id].coords);
                }
            } else {
                placeMark.properties.set({iconCaption: ''});
            }
        });
    };

    ymaps.load(url)
        .then((ApiYmaps) => {
            map = new ApiYmaps.Map(id, {
                center: [57.63405186811238,39.89975989778784],
                zoom: 15,
            },{
                restrictMapArea: [[57.51758848230495,39.32604124999993], [57.78337048570149,40.380728749999946]],
                yandexMapDisablePoiInteractivity: true,
            });

            map.controls.remove('geolocationControl'); 
            map.controls.remove('searchControl'); 
            map.controls.remove('trafficControl');
            map.controls.remove('typeSelector');
            map.controls.remove('fullscreenControl');
            map.controls.remove('rulerControl');
        
            StaticPointOfIssue.forEach(pointOfIssue => {
                const placeMark = createPlaceMarker(pointOfIssue.coords);
                map.geoObjects.add(placeMark);
                placeMark.events.add('click', () => {
                    changePlaceMarker(pointOfIssue.id, false);
                });
                placeMarks[pointOfIssue.id] = placeMark;
            });

            if (initPointOfIssue) {
                changePlaceMarker(initPointOfIssue.id, false);
            }

            function createPlaceMarker(coords) {
                return new ApiYmaps.Placemark(coords, {}, {
                    preset: 'islands#violetDotIconWithCaption',
                });
            }
        });

    return changePlaceMarker;
};

const mapStyle = s;

export { createMapCourier, createMapPickup, mapStyle };