import React, { ElementType, PropsWithChildren } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AUTH } from './routes';

interface IProps {
  layout: ElementType;
}

const PrivateRoute: React.FC<PropsWithChildren<IProps>> = (props) => {
  const { children, layout: Layout } = props;
  const { pathname } = useLocation();

  const isAuthenticated = true;

  return isAuthenticated ? (
    <Layout>{children}</Layout>
  ) : (
    <Navigate
      to={{
        pathname: AUTH,
        search:
          pathname && pathname !== '/' ? `?redirect=${pathname}` : undefined,
      }}
    />
  );
};

export { PrivateRoute };