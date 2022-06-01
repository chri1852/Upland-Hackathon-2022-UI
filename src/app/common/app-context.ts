import React, { useContext } from 'react';

export interface AppContextValue {
  apiService: any;
}

export const useAppContext = () => useContext(AppContext);

const AppContext = React.createContext<AppContextValue>({
  apiService: null
});

export default AppContext;