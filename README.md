# weather-widget
Embeddable Weather widget based on OpenWeatherMap


## Requirements:

- `Node`: Make sure to be running with the LTS (currently 6.9.0). a `.nvmrc` file is present in the repo, you simply need to run `nvm use` to point to the correct one.
- [Yarn](https://github.com/yarnpkg/yarn): not mandatory but highly recommanded to make sure you will be fetching the exact same packages as the contributor team.

## Get Started:

- run `yarn`
- Populate a `.env.js` file as shown in the `.SAMPLE.ENV.JS` with your [OpenWeatherMap](https://home.openweathermap.org) API key.
- run `npm run dev` to get started with a development version
- run `npm run build` to create a production-ready version within a `build` folder. The app is server-less, you will then simply need to open the `index.html` page to open the production-ready version.
