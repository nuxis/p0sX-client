# p0sX Client
[![Build Status](https://drone.fap.no/api/badges/nuxis/p0sX-client/status.svg)](https://drone.fap.no/nuxis/p0sX-client)

Icons made by [Freepik](http://www.freepik.com "Freepik") from [www.flaticon.com](http://www.flaticon.com "Flaticon") is licensed by [CC 3.0 BY](http://creativecommons.org/licenses/by/3.0/ "Creative Commons BY 3.0")

## Development

Install dependencies:

    npm install

Create a settings file:

    mkdir build
    cp settings.json.example build/settings.json

Build the js:

    npm run build

Run electron:

    npm run electron

To be able to request data from the backend, you will need a auth token. This can be generated from Django admin on the backend. Copy the token and paste it into settings.json.
