import React, { FC } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { useAppSelector } from "../hooks/useAppSelector";
import { privateRoutes, publicRoutes, RouteNames } from "../router/router";

const AppRouter: FC = () => {
  // const isAuth: boolean = true;
  const { isAuth } = useAppSelector((state) => state.auth);

  return isAuth ? (
    <Switch>
      {privateRoutes.map((route) => (
        <Route path={route.path} component={route.component} exact={route.exact} key={route.path} />
      ))}

      <Redirect to={RouteNames.EVENT} />
    </Switch>
  ) : (
    <Switch>
      {publicRoutes.map((route) => (
        <Route path={route.path} component={route.component} exact={route.exact} key={route.path} />
      ))}

      <Redirect to={RouteNames.LOGIN} />
    </Switch>
  );
};

export default AppRouter;
