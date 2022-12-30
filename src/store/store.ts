import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import reducers from "./reducers/reducers";

const rootReducer = combineReducers(reducers);

export const store = createStore(rootReducer, applyMiddleware(thunk));

// Типизируем наш стор, предварительно, получив его тип из состояния при помощи функции getState.
// Этот тип будет знать всё о редюсерах, которыми мы работаем, и о тех данных, с которыми этот
// редюсер работает, то есть состояние каждого отдельного редюсера.
export type RootState = ReturnType<typeof store.getState>;
// Так же сразу получим тип нашего диспатча, смотрим документацию https://redux-toolkit.js.org/usage/usage-with-typescript,
// параграф- Usage With TypeScript: import { configureStore } from '@reduxjs/toolkit'....
export type AppDispatch = typeof store.dispatch;
