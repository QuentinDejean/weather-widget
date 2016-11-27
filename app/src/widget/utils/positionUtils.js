/* global navigator:true */

import request from 'superagent';
// eslint-disable-next-line import/extensions
import stampit from 'stampit';

const Position = stampit()
  .init((params, { instance }) => {
    instance.navigatorOptions = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };
  })
  .methods({
    fetchWeatherInfo({ units, lat, lon }) {
      return new Promise((resolve, reject) => {
        request.get('http://api.openweathermap.org/data/2.5/weather')
        .set('Accept', 'application/json')
        .query({ units, lat, lon, APPID: 'e46823980647373f7478341aa7dfe237' })
        .end((err, { body }) => {
          if (err) {
            reject(err);
          }

          resolve(body);
        });
      });
    },
    getNavigatorInfo(callback) {
      navigator.geolocation.getCurrentPosition(
        this.onPositionSuccess.bind(this, callback),
        this.onPositionError.bind(this, callback),
        this.options
      );
    },
    getWeatherInfo(units) {
      if ('geolocation' in navigator) {
        return new Promise((resolve, reject) => {
          this.getNavigatorInfo((coordinates) => {
            return resolve(coordinates);
          }, (error) => {
            return reject(error);
          });
        })
        .then(({ latitude: lat, longitude: lon }) => {
          return this.fetchWeatherInfo({ units, lat, lon });
        })
        .catch((data) => {
          return Promise.reject(data);
        });
      }

      return this.fetchWeatherInfo({ lat: -33.9241579, lon: 151.1881965 });
    },
    onPositionError(callback, error) {
      callback(error);
    },
    onPositionSuccess(callback, { coords }) {
      callback(coords);
    }
  });

export default Position();
