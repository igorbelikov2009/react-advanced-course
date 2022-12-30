import { AppDispatch } from "./../../store";
import { SetAuthAction, SetIsLoadingAction, AuthActionEnum, SetUserAction, SetErrorAction } from "./types";
// Экшен-креаторы в данном файле будут относиться к данному редюсеру.
// Здесь можно экшен-креаторы экспортировать по отдельности, либо
// создать какой нибудь объект, и внутри него уже создать эти экшен-креаторы.
// Объект будет выступать в качестве такой обёртки.
// Экшен-креатор - это функция, которая принимает какой-то аргумент и
// возвращает объект, соответственно, сам экшен.
// У экшена есть какой-то type и какой-то Payload.

import { IUser } from "../../../models/IUser";
import axios from "axios";

export const AuthActionCreators = {
  setUser: (user: IUser): SetUserAction => ({ type: AuthActionEnum.SET_USER, payload: user }),
  setIsAuth: (isAuth: boolean): SetAuthAction => ({ type: AuthActionEnum.SET_AUTH, payload: isAuth }),
  setIsLoading: (payload: boolean): SetIsLoadingAction => ({ type: AuthActionEnum.SET_IS_LOADING, payload }),
  setError: (payload: string): SetErrorAction => ({ type: AuthActionEnum.SET_ERROR, payload }),

  login: (username: string, password: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(AuthActionCreators.setIsLoading(true));
      setTimeout(async () => {
        const response = await axios.get<IUser[]>("./users.json");
        // Будем искать пользователя, у которого username равен тому, что мы ввели в форму,
        // и сразу же проверяем, чтобы у этого пользователя был такой же пароль.
        const mockUsers = response.data.find((user) => user.username === username && user.password === password);
        // console.log("Ok", mockUsers);
        if (mockUsers) {
          localStorage.setItem("auth", "true");
          localStorage.setItem("username", mockUsers.username);
          dispatch(AuthActionCreators.setIsAuth(true));
          // передаём найденного по username и password пользователя mockUsers из массива
          dispatch(AuthActionCreators.setUser(mockUsers));
        } else {
          //  Если нет пользователя с таким username и password
          dispatch(AuthActionCreators.setError("Некорректный логин или пароль"));
        }
        dispatch(AuthActionCreators.setIsLoading(false));
      }, 1000);
    } catch (error) {
      dispatch(AuthActionCreators.setError("Произошла ошибка при авторизации."));
    }
  },

  logout: () => async (dispatch: AppDispatch) => {
    localStorage.removeItem("auth");
    localStorage.removeItem("username");
    // далее обнуляем состояние
    dispatch(AuthActionCreators.setUser({} as IUser));
    dispatch(AuthActionCreators.setIsAuth(false));
  },
};
