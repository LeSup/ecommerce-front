import { Button, Col, Empty, Row, Space } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterProduct } from "../../store/actions/product.action";
import { AppState } from "../../store/reducers";
import { ProductState } from "../../store/reducers/product.reducer";
import CheckBox from "./CheckBox";
import ProductItem from "./ProductItem";
import RadioBox from "./RadioBox";

const Shop = () => {
  const dispatch = useDispatch();

  const [skip, setSkip] = useState<number>(0);

  const [filters, setFilters] = useState<{
    category: string[];
    price: number[];
  }>({ category: [], price: [] });

  const {
    filter: {
      result: { size, data },
    },
  } = useSelector<AppState, ProductState>((state) => state.product);

  useEffect(() => {
    setSkip(0);
  }, [filters]);

  useEffect(() => {
    dispatch(filterProduct({ skip, filters }));
  }, [filters, skip]);

  const filterDom = () => (
    <Space size='middle' direction='vertical'>
      <CheckBox
        onChange={(value: string[]) => {
          setFilters({
            ...filters,
            category: value,
          });
        }}
      />
      <RadioBox
        onChange={(value: number[]) => {
          setFilters({
            ...filters,
            price: value,
          });
        }}
      />
    </Space>
  );

  const filterProductDom = () => (
    <Row gutter={[16, 16]}>
      {data.map((item) => (
        <Col span='6' key={item._id}>
          <ProductItem product={item} />
        </Col>
      ))}
    </Row>
  );

  const loadMore = () => {
    setSkip(skip + 4);
  };

  const loadMoreButton = () => (
    <Row>{size >= 4 && <Button onClick={loadMore}>加载更多</Button>}</Row>
  );

  const noData = () => {
    return <Row>{size === 0 && <Empty />}</Row>;
  };

  return (
    <Row>
      <Col span='4'>{filterDom()}</Col>
      <Col span='20'>
        {filterProductDom()}
        {loadMoreButton()}
        {noData()}
      </Col>
    </Row>
  );
};

export default Shop;
