import { Col, Row, Typography } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../../store/actions/product.action";
import { SortBy } from "../../store/models/product";
import { AppState } from "../../store/reducers";
import { ProductState } from "../../store/reducers/product.reducer";
import ProductItem from "./ProductItem";
import Search from "./Search";

const { Title } = Typography;

const Home = () => {
  const dispatch = useDispatch();

  const { createdAt, sold } = useSelector<AppState, ProductState>(
    (state) => state.product
  );

  useEffect(() => {
    dispatch(getProduct(SortBy.CreatedAt));
    dispatch(getProduct(SortBy.Sold));
  }, []);

  return (
    <>
      <Search />
      <Title level={5}>最新上架</Title>
      <Row gutter={[16, 16]}>
        {createdAt.products.map((item) => (
          <Col key={item._id} span='6'>
            <ProductItem product={item} />
          </Col>
        ))}
      </Row>
      <Title level={5}>最受欢迎</Title>
      <Row gutter={[16, 16]}>
        {sold.products.map((item) => (
          <Col key={item._id} span='6'>
            <ProductItem product={item} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Home;
