import 'core-js/es6/promise';
import 'core-js/fn/array/from';
import '../css/main.css';

import Controller from './controller';
import Router from './router';
import View from './view';
import { EventBus } from './utils';

const eventBus = EventBus();
const view = View(eventBus);
const controller = Controller(view);
const router = Router();

view.init();

router
  .add('/', controller)
  .add('about', controller)
  .add('projects', controller)
  .add('contributions', controller)
  .bindPopstate()
  .initHistory();

eventBus.on('routeChange', router.onRouteChange.bind(router));
