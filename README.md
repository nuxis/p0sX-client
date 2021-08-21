# p0sX Client
[![Build Status](https://drone.fap.no/api/badges/nuxis/p0sX-client/status.svg)](https://drone.fap.no/nuxis/p0sX-client)

Icon made by [Freepik](http://www.freepik.com "Freepik") from [www.flaticon.com](http://www.flaticon.com "Flaticon") is licensed by [CC 3.0 BY](http://creativecommons.org/licenses/by/3.0/ "Creative Commons BY 3.0")

## Contributing

Please read the [guidelines](https://github.com/nuxis/p0sX-client/blob/master/.github/CONTRIBUTING.md) before contributing.

## Development
Stack:

- Node 5.x
- React
- Redux

### Code style
The code base should follow the defined code style. The code based is enforced with eslint, and the code should _always_ be linted before pull-requested.

Style rules:

- StandardJS
- Indent: 4 spaces
- camelCase
- react/recommended
- eslint-plugin-immutable
    - no-let
    - no-mutation

### Setup

Install dependencies:

    npm install

Build the js:

    npm run build

Run electron:

    npm run electron

To be able to request data from the backend, you will need a auth token. This can be generated from Django admin on the backend. Copy the token and paste it into settings.json.

There is an example settings.json file in the build/ folder. It may be wise to copy this to your settings folder and edit it to get the correct structure.

The settings file will be located at:

    Windows: C:\Users\me\AppData\Roaming\p0sX\settings.json
    OS X: ~/Library/Application Support/p0sX/settings.json
    Linux: ~/.config/p0sX/settings.json

### Directories

#### app/
Contains the files that will be packed inside the application when it is distributed. When the JavaScript is transpiled the resulting files will be placed here.

Static data like css and fonts also lives in this folder.

#### build/
Contains files that electron-builder uses to create the distributions of our application. Icons and backgrounds for installers are located here.

#### src/
Contains the ECMAScript 6 and React/JSX code. This is where you code :).

### Configuration

**package.json:** Everything Node and NPM related.

**.webpack/**: Configuration for the transpiler.

## Distributions

To build the application into platform spesific apps, use:

    npm run dist:PLATFORM

Where platform is darwin, win32, win64, linux32, linux64 or all.

You will probably have a hard time building for other platforms than the one you are on. Let our buildserver fix this. It will build and distribute every time a pull-request is merged.

The distribution files will be located at [https://kradalby.no/p0sX/](https://kradalby.no/p0sX/)


### linux files
The .deb package will be put in ./out/make/p0sx-client_0.0.1_amd64.deb
Installing this package the the client will live in: /usr/lib/p0sx-client/p0sX 

