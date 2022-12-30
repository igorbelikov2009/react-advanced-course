import Event from "../pages/Event";
import Login from "../pages/Login";

export interface IRoute {
  path: string;
  component: React.ComponentType;
  exact?: boolean;
}

// Создаём перечисление маршрутов - констант
export enum RouteNames {
  LOGIN = "/login",
  // Здесь стартовый путь, просто слэш
  EVENT = "/",
}

export const publicRoutes: IRoute[] = [
  {
    path: RouteNames.LOGIN,
    component: Login,
    exact: true,
  },
];

export const privateRoutes: IRoute[] = [
  {
    path: RouteNames.EVENT,
    component: Event,
    exact: true,
  },
];
