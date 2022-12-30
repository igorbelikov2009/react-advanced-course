import React, { FC } from "react";
import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useAppSelector } from "../hooks/useAppSelector";
import { RouteNames } from "../router/router";
import { AuthActionCreators } from "../store/reducers/auth/action-creators";

const NavBar: FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { isAuth, user } = useAppSelector((state) => state.auth);

  const logout: React.MouseEventHandler = () => {
    dispatch(AuthActionCreators.logout());
    history.push(RouteNames.EVENT);
    console.log("logout");
  };

  return (
    <Navbar bg="dark" variant="dark" className="navbar">
      <Container>
        <div className="empty"></div>
        {isAuth ? (
          <div className="dFlex jcSpaceBetween">
            <Button variant="primary" onClick={logout}>
              Выйти
            </Button>

            <div className="colorWhite ml-3">
              <> {user.username} </>
            </div>
          </div>
        ) : (
          <Button variant="primary" onClick={() => history.push(RouteNames.LOGIN)}>
            Логин
          </Button>
        )}
      </Container>
    </Navbar>
  );
};

export default NavBar;
