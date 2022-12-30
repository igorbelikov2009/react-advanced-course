import { allActionCreators } from "./../store/reducers/action-creators";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";

// useAction as useAppDispatch

export const useAction = () => {
  const dispatch = useDispatch();
  return bindActionCreators(allActionCreators, dispatch);
};
