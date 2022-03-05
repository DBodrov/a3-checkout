import React from 'react';
import {Outlet, useNavigate} from 'react-router-dom';
import {Navbar} from './Navbar';
import {Layout, Content} from './styles';

export function TNSLayout() {
  const navigate = useNavigate();

  React.useEffect(() => {
    // navigate('checkout', {replace: true});
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout>
      <Navbar />
      <Content>
        <Outlet />
      </Content>
    </Layout>
  )
}
