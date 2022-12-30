// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { AppDispatch, RootState } from "./../store/store";
import { TypedUseSelectorHook } from "react-redux";
import { useSelector, useDispatch } from "react-redux";

// export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
