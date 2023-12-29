import { ROUTES } from './src/app/routes/routes';
import { Routing } from './src/app/routes/routing';

const routing = new Routing(ROUTES);

window.addEventListener('load', () => {
  routing.init(document.querySelector('.router-view'));
});
