import React, { lazy } from 'react';
import { useRoutes } from 'react-router-dom';

const Home = lazy(() => import('../modules/Home/index'));
const UserInfo = lazy(() => import('../modules/UserInfo/index'));

export enum ERoutes {
  home = '/',
  info = 'info',
  create = 'create',
  edit = 'edit',
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
    // {
    //   path: `*`,
    //   element: <NotFound />,
    // },
  ]);

  return <>{routeConfig}</>;
};
export default Routing;
