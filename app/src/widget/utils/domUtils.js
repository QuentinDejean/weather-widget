/* global document:true */
/* eslint valid-typeof: 0 */

import unitValidation, { paramValidation } from './validationUtils';

const extractWidgetParams = function extractWidgetParams(wScript) {
  try {
    const params = {
      showWind: wScript.getAttribute('data-show-wind') === 'true',
      title: wScript.getAttribute('data-title'),
      unit: wScript.getAttribute('data-unit')
    };

    const typeError = Object.keys(params).find((key) => {
      return typeof params[key] !== paramValidation[key];
    });

    if (typeError) {
      return Promise.reject(new Error(`${typeError} should be of type ${paramValidation[typeError]}`));
    }

    if (!unitValidation.includes(params.unit)) {
      return Promise.reject(new Error(`unit should be of type ${unitValidation.toString()}`));
    }

    return Promise.resolve(params);
  } catch (e) {
    return Promise.reject(e);
  }
};

const createWidgetContainer = function createWidgetContainer(wScript, index) {
  const widgetId = `weather-widget-${index}`;
  return Promise.resolve()
  .then(() => {
    const widgetContainer = document.createElement('div');
    widgetContainer.id = widgetId;
    wScript.parentNode.insertBefore(widgetContainer, wScript);
  })
  .then(() => {
    return widgetId;
  })
  .catch((e) => {
    return Promise.reject(new Error(e));
  });
};

const findWidget = function findWidget() {
  if (!document.weatherWidget) {
    document.weatherWidget = {};
  }

  const weatherWidget = document.weatherWidget;

  if (!weatherWidget.existing) {
    weatherWidget.existing = [];
  }

  const existing = weatherWidget.existing;
  const weatherScripts = document.getElementsByTagName('script');
  const regExp = /.*bundle.widget\.([^/]+\.)?js/;

  const scriptIndex = Object.keys(weatherScripts).find((key) => {
    const currentScript = weatherScripts[key];
    return currentScript.src.match(regExp) && !existing.includes(currentScript);
  });

  if (scriptIndex) {
    existing.push(weatherScripts[scriptIndex]);
    return Promise.resolve({
      wScript: weatherScripts[scriptIndex],
      index: existing.length - 1
    });
  }

  return Promise.reject(new Error('No widget was found'));
};

const getWidgetParams = function getWidgetParams() {
  return Promise.resolve()
  .then(() => {
    return findWidget();
  })
  .then(({ wScript, index }) => {
    return Promise.all([
      createWidgetContainer(wScript, index),
      extractWidgetParams(wScript)
    ]);
  })
  .catch((e) => {
    Promise.reject(e);
  });
};

export default getWidgetParams;
