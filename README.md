# p0sX Client
[![Build Status](https://drone.fap.no/api/badges/nuxis/p0sX-client/status.svg)](https://drone.fap.no/nuxis/p0sX-client)

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
