# Changelog

History of the changes mades to the Weather Widget.

## v1.0.2
##### 28 November, 2016

- Bug Fix: eslint was complaining about `WEATHER_API_KEY` global variable
- Bug Fix: `WEATHER_API_KEY` was not configured properly for production

## v1.0.1
##### 28 November, 2016

- Bug Fix: `WEATHER_API_KEY` was not being passed properly to the app

## v1.0.0
##### 28 November, 2016

Major: Released `v1` featuring:
- embeddable widget fetching data from the `OpenWeatherMap` APIs
- Following parameters can be passed through: `title`, `unit` and `wind`
- `Editor` to dynamically create a widget
