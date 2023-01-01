import React, { FC, useEffect } from "react";
import "./App.css";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import { useAction } from "./hooks/useAction";
import { IUser } from "./models/IUser";

const App: FC = () => {
  const { setUser, setIsAuth } = useAction();

  // При помощи useEffect(), единожды, при первом запуске приложения, проверяем
  // наличие флагов "auth" и "username" в localStorage. Если таковые там имеются,
  // то достаём username пользователя, и определяем значение isAuth = true.
  // Это надо для того, чтобы, после авторизации, при обновлении страницы,
  // нас не редиректило на страницу Login.tsx
  useEffect(() => {
    // Проверяем, если в localStorage по ключю "auth" что-то находится,
    if (localStorage.getItem("auth")) {
      // тогда пользователя будем логинить. Получаем username из localStorage.
      // Всё это имитцация. В реалии мы бы получали токен и т.д.
      setUser({ username: localStorage.getItem("username" || "") } as IUser);
      // здесь просто передаём значение true
      setIsAuth(true);
    }
  }, []);

  return (
    <div>
      <NavBar />

      <AppRouter />
    </div>
  );
};

export default App;
