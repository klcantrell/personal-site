import 'core-js/fn/array/from';
import '../css/main.css';

import Controller from './controller';
import Router from './router';
import TriggersView from './triggersView';
import { EventBus } from './utils';

const eventBus = EventBus();
const triggersView = TriggersView(eventBus);
const router = Router();
const controller = Controller();

router
  .add('about', controller)
  .bindPopstate()
  .initHistory();

eventBus.on('routeChange', router.onRouteChange.bind(router));
