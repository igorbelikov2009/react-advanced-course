import React, { FC } from "react";
import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { useHistory } from "react-router-dom";
import { useAction } from "../hooks/useAction";
import { useAppSelector } from "../hooks/useAppSelector";
import { RouteNames } from "../router/router";

const NavBar: FC = () => {
  const history = useHistory();
  const { isAuth, user } = useAppSelector((state) => state.auth);
  const { logout } = useAction();

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
