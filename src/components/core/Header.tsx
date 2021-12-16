import { PageHeader } from "antd";
import { useSelector } from "react-redux";
import { RouterState } from "redux-first-history";
import { AppState } from "../../store/reducers";

type HeaderProps = {
  title: string;
  subTitle: string;
};

const HeaderPropsMap: {
  [propName: string]: HeaderProps;
} = {
  home: {
    title: "ishop电商",
    subTitle: "欢迎来到ishop电商, 尽情享受吧",
  },
  shop: {
    title: "ishop商城",
    subTitle: "挑选你喜欢的商品吧",
  },
  signIn: {
    title: "登录",
    subTitle: "嘿, 小伙伴, 立即登录到ishop电商系统吧",
  },
  signUp: {
    title: "注册",
    subTitle: "还没有账号? 注册一个吧",
  },
  "user/dashboard": {
    title: "用户 Dashboard",
    subTitle: "",
  },
  "admin/dashboard": {
    title: "管理员 Dashboard",
    subTitle: "",
  },
  "create/category": {
    title: "添加分类",
    subTitle: "",
  },
  "create/product": {
    title: "添加商品",
    subTitle: "",
  },
  product: {
    title: "商品名称",
    subTitle: "商品描述",
  },
  cart: {
    title: "购物车",
    subTitle: "付款吧，我就是你的了",
  },
  paysuccess: {
    title: "支付完成",
    subTitle: "",
  },
  "admin/orders": {
    title: "订单",
    subTitle: "",
  },
};

const Header = () => {
  const router = useSelector<AppState, RouterState>((state) => state.router);
  const pathname = router?.location?.pathname;
  const pathUrl = pathname?.substring(1) || "home";

  return <PageHeader className='jumbotron' {...HeaderPropsMap[pathUrl]} />;
};

export default Header;
