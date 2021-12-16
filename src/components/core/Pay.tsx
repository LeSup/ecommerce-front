import { Button } from "antd";
import { FC } from "react";
import { Link } from "react-router-dom";
import { CartItem } from "../../helpers/cart";
import axios from "axios";
import { API } from "../../config";
import { Jwt } from "../../store/models/auth";
import useAuth from "../../hooks/useAuth";

interface Props {
  totalPrice: number;
  address: string;
  cart: CartItem[];
}

const Pay: FC<Props> = ({ totalPrice, address, cart }) => {
  const auth = useAuth();
  const getPayUrl = () => {
    axios
      .post(`${API}/alipay`, {
        totalAmount: totalPrice,
        subject: "测试订单标题",
        body: "测试订单描述",
        products: cart.map((product) => ({
          count: product.count,
          product: product._id,
        })),
        address: address,
        userId: (auth as Jwt).user._id,
      })
      .then((response) => {
        window.location.href = response.data.result;
      });
  };

  const showButton = () => {
    return auth ? (
      <Button onClick={getPayUrl}>提交订单</Button>
    ) : (
      <Button>
        <Link to='/signin'>登录</Link>
      </Button>
    );
  };

  return <>{showButton()}</>;
};

export default Pay;