import React from 'react';
import {useParams} from 'react-router-dom';
import {useSettings} from './use-settings';

type TConfigContext = {
  isLoading: boolean;
  settings: any;
}

const ConfigContext = React.createContext<TConfigContext | undefined>(undefined);
ConfigContext.displayName = 'ConfigContext';

type TProps = {
  children: React.ReactNode;
}

export function ConfigProvider({children}: TProps) {
  const {providerId = ''} = useParams();
  const {isIdle, isLoading: isConfigLoading, data} = useSettings(providerId);
  const ctx = React.useMemo(() => ({
    isLoading: isIdle || isConfigLoading,
    settings: data
  }), [data, isConfigLoading, isIdle])
  return (
    <ConfigContext.Provider value={ctx}>
      {children}
    </ConfigContext.Provider>
  )


}
