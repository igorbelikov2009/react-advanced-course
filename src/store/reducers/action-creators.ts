import { AuthActionCreators } from "./auth/action-creators";
import { EventActionCreators } from "./event/action-creators";

// Здесь мы собираем и обобщаем все возможные в нашем приложении ActionCreators
export const allActionCreators = {
  ...AuthActionCreators,
  ...EventActionCreators,
};
