import { Badge, Menu } from "antd";
import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RouterState } from "redux-first-history";
import { AppState } from "../../store/reducers";
import { Jwt } from "../../store/models/auth";
import useAuth from "../../hooks/useAuth";
import { TotalContext } from "../../anotherStore";
import { itemCount } from "../../helpers/cart";

const useActive = (pathname: string | undefined, path: string): string => {
  return pathname === path ? "ant-menu-item-selected" : "";
};

const Navigation = () => {
  const auth = useAuth();
  const [count, setCount] = useContext(TotalContext);

  useEffect(() => {
    setCount(itemCount());
  });

  function getDashboardUrl() {
    let url = "/user/dashboard";
    if (auth) {
      const {
        user: { role },
      } = auth as Jwt;
      if (role === 1) {
        url = "/admin/dashboard";
      }
    }
    return url;
  }

  const router = useSelector<AppState, RouterState>((state) => state.router);
  const pathname = router?.location?.pathname;
  const dashboardUrl = getDashboardUrl();
  const isHome = useActive(pathname, "/");
  const isShop = useActive(pathname, "/shop");
  const isCart = useActive(pathname, "/cart");
  const isSignIn = useActive(pathname, "/signIn");
  const isSignUp = useActive(pathname, "/signUp");
  const isDashboard = useActive(pathname, dashboardUrl);

  return (
    <Menu mode='horizontal' selectable={false}>
      <Menu.Item key='home' className={isHome}>
        <Link to='/'>首页</Link>
      </Menu.Item>
      <Menu.Item key='/shop' className={isShop}>
        <Link to='/shop'>商城</Link>
      </Menu.Item>
      <Menu.Item key='/cart' className={isCart}>
        <Link to='/cart'>
          购物车
          <Badge count={count} offset={[5, -10]} />
        </Link>
      </Menu.Item>
      {!auth && (
        <>
          <Menu.Item key='/signIn' className={isSignIn}>
            <Link to='/signIn'>登录</Link>
          </Menu.Item>
          <Menu.Item key='/signUp' className={isSignUp}>
            <Link to='/signUp'>注册</Link>
          </Menu.Item>
        </>
      )}
      {auth && (
        <Menu.Item key={dashboardUrl} className={isDashboard}>
          <Link to={dashboardUrl}>Dashboard</Link>
        </Menu.Item>
      )}
    </Menu>
  );
};

export default Navigation;
