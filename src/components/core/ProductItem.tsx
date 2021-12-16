import { Button, Card, Col, Row, Typography, Image } from "antd";
import moment from "moment";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { push } from "redux-first-history";
import { API } from "../../config";
import { addItem } from "../../helpers/cart";
import { Product } from "../../store/models/product";

const { Title, Paragraph } = Typography;

interface ProductProps {
  product: Product;
  showView?: boolean;
  showCart?: boolean;
}

const ProductItem = ({
  product,
  showView = true,
  showCart = true,
}: ProductProps) => {
  const dispatch = useDispatch();

  const addToCart = () => {
    addItem(product, () => {
      dispatch(push("/cart"));
    });
  };

  const showButtons = () => {
    const result = [];
    if (showView) {
      result.push(
        <Button type='link'>
          <Link to={`/product/${product._id}`}>查看详情</Link>
        </Button>
      );
    }
    if (showCart) {
      result.push(
        <Button type='link' onClick={addToCart}>
          加入购物车
        </Button>
      );
    }
    return result;
  };
  return (
    <Card
      cover={
        <Image src={`${API}/product/photo/${product._id}`} alt={product.name} />
      }
      actions={showButtons()}
    >
      <Title level={5}>{product.name}</Title>
      <Paragraph ellipsis={{ rows: 2 }}>{product.description}</Paragraph>
      <Row>
        <Col span='12'>销量：{product.sold}</Col>
        <Col span='12' style={{ textAlign: "right" }}>
          价格：{product.price}
        </Col>
      </Row>
      <Row>
        <Col span='12'>
          上架时间：{moment(product.createdAt).format("YYYY-MM-DD")}
        </Col>
        <Col span='12' style={{ textAlign: "right" }}>
          所属分类：{product.category.name}
        </Col>
      </Row>
    </Card>
  );
};

export default ProductItem;
