import { Col, Row } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProductById } from "../../store/actions/product.action";
import { AppState } from "../../store/reducers";
import { ProductState } from "../../store/reducers/product.reducer";
import ProductItem from "./ProductItem";

const Product = () => {
  const { productId = "" } = useParams();
  const dispatch = useDispatch();
  const {
    product: { result },
  } = useSelector<AppState, ProductState>((state) => state.product);
  useEffect(() => {
    dispatch(getProductById({ productId }));
  }, []);
  return (
    <Row gutter={36}>
      <Col span='18'>
        <ProductItem product={result} showView={false} />
      </Col>
      <Col span='6'>right</Col>
    </Row>
  );
};

export default Product;
