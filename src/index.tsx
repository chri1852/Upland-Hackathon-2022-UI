import { bootstrap } from "./bootstrap";
import configJson from './app-config.json';
import './index.scss';

export const index: Promise<void> = (async () => {
  bootstrap(configJson)
})();

