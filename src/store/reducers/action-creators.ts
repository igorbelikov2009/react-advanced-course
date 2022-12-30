import { AuthActionCreators } from "./auth/action-creators";

// Здесь мы собираем и обобщаем все возможные в нашем приложении ActionCreators
export const allActionCreators = {
  ...AuthActionCreators,
};
