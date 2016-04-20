# p0sX Client
[![Build Status](https://drone.fap.no/api/badges/nuxis/p0sX-client/status.svg)](https://drone.fap.no/nuxis/p0sX-client)

Icon from:

    <div>Icons made by <a href="http://www.freepik.com" title="Freepik">Freepik</a> from <a href="http://www.flaticon.com" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div></div>

## Development

Install dependencies:

    npm install

Create a settings file:
	mkdir build
    cp settings.json.example build/settings.json

Build:

    npm run build

Run electron:

    npm run electron

To be able to request data from the backend, you will need a auth token. This can be generated from Django admin on the backend. Copy the token and paste it into settings.json.
