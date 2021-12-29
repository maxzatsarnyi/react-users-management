import React, { lazy } from 'react';
import { useRoutes } from 'react-router-dom';

const Home = lazy(() => import('../modules/Home/index'));
const UserInfo = lazy(() => import('../modules/UserInfo/index'));
const User = lazy(() => import('../modules/User/index'));
const NotFound = lazy(() => import('../modules/NotFound'));

export enum ERoutes {
  home = '/', // for users
  user = 'user', // for creation/editing
  info = 'info', // for details
}

const Routing = () => {
  const routeConfig = useRoutes([
    { path: `${ERoutes.home}`, element: <Home /> },
    {
      path: `${ERoutes.info}`,
      element: <UserInfo />,
      children: [
        {
          path: `:userId`,
          element: <UserInfo />,
        },
      ],
    },
    {
      path: `${ERoutes.user}`,
      element: <User />,
      children: [
        {
          path: `:userId`,
          element: <User />,
        },
      ],
    },
    {
      path: `*`,
      element: <NotFound />,
    },
  ]);

  return <>{routeConfig}</>;
};
export default Routing;
