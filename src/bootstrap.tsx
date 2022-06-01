import { render } from 'react-dom';
import { createStore } from './app/store/createStore';
import AppContext, { AppContextValue } from './app/common/app-context';
import App from './App';
import { ApiService } from './app/common/api';

export const bootstrap = async (config: AppConfig) => {
  const apiService = new ApiService(config.uplandOptimizerWebUrl);
  const store = createStore(config, apiService);

  const context: AppContextValue = {
      apiService
  }

  render(
    <AppContext.Provider value={context}>
      <App store={store} />
    </AppContext.Provider>,
    document.getElementById('root')
  );
}