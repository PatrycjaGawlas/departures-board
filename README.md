# departures-board

A simple flight departure board displaying all the flights fetched from the API. With additional feature included at the bottom of the page there is a possibility to update any flight status.

- Resposponsive

- App is build with Nuxt.js, Vue.js, HTML, SASS and it functions as Single Page Application.

- Unit tested with Vue Test Utils and Jest

- Support all major browsers (Chrome, Firefox, Safari, Edge)

## Build

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

## Test

```bash
$ npm run test
```

## Additonal info

- Flights are sorted by "estimatedDepartureDateTime" flight property.

- While data is loading we show simple sceleton screen to indicate a progress.

- Flight status will display with different colors (e.g 'Go to gate' is blue)

- Once flight status is updated it will be reflected on flight status element on a board (e.g if flight status is updated to Cancelled we will show 'Cancelled' text with red color)

- If flight is diverted destination will be crossed out

## Next steps

- Add actual API PUT call to update flight status

- Add 'scroll to' behaviour when the item which has been updated

- Add toggle 'info' section to each flight in order to get more informations

## External packages used:

- @nuxtjs/vuetify - https://www.npmjs.com/package/@nuxtjs/vuetify - used for form UI components (autocomplete, select, button). I choose this library as we don't need custom form components and it makes development process much faster.

- Prettier - https://www.npmjs.com/package/prettier - helps with code formatting

- ESLint - https://www.npmjs.com/package/eslint - helps with fixing code problems

