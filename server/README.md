# P0sX

Point of sale system for LAN parties.


## Development

Install python3, virtualenv, node, npm.

    make env

    make dev

## Example data

To load the example data, create and migrate the database:

    make migrate

Then load the json file:

    ./manage.py loaddata example_data.json

To dump the data, issue:
    ./manage.py dumpdata pos --indent 4 > example_data.json

