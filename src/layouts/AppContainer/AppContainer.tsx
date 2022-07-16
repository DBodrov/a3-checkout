import React from 'react';
import {Outlet} from 'react-router-dom';
import {ConfigProvider} from '@/context'


export function AppContainer() {
  return (
    <ConfigProvider>
      <Outlet />
    </ConfigProvider>
  )


}
