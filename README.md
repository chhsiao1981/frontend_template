frontend_template
================

Usage
-----
project name/directory is recommended to fit js style (using dash as project name/directory):

* good: frontend-template

create-react-app .; git clone https://github.com/chhsiao1981/frontend_template.git; ./frontend_template/scripts/init_dev.sh; . __/bin/activate; ./scripts/init_starter.sh; cp config.js.tmpl config.js; npm install; ln -s ../config.js node_modules/config.js; mkdir -p config; mv node_modules/react-scripts/config/webpack.config.dev.js config; ln ../../../config/webpack.config.dev.js node_modules/react-scripts/config; mv node_modules/react-scripts/config/webpack.config.prod.js config; ln ../../../config/webpack.config.prod.js node_modules/react-scripts/config; npm start

* start: ./scripts/init_starter.sh
* create action/reducer: ./scripts/dev_reducer.sh
* create container: ./scripts/dev_container.sh
* create component: ./scripts/dev_component.sh

Introduction
-----
This template intends to efficiently develop with the following libraries:

* pcreate (scaffolding, from pylons pyramid)

All are welcome to improve this template
