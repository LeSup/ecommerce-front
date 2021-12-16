import { Button, Col, Divider, Form, Input, Row, Select } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategory } from "../../store/actions/category.action";
import { searchProduct } from "../../store/actions/product.action";
import { AppState } from "../../store/reducers";
import { CategoryState } from "../../store/reducers/category.reducer";
import { ProductState } from "../../store/reducers/product.reducer";
import ProductItem from "./ProductItem";

const Search = () => {
  const dispatch = useDispatch();

  const {
    category: { result },
  } = useSelector<AppState, CategoryState>((state) => state.category);
  const { search } = useSelector<AppState, ProductState>(
    (state) => state.product
  );

  useEffect(() => {
    dispatch(getCategory());
  }, []);

  const handleFinish = (values: { category: string; search: string }) => {
    dispatch(searchProduct(values.category, values.search));
  };

  return (
    <>
      <Form
        layout='inline'
        initialValues={{ category: "All" }}
        onFinish={handleFinish}
      >
        <Input.Group compact>
          <Form.Item name='category'>
            <Select>
              <Select.Option value='All'>所有分类</Select.Option>
              {result.map((item) => (
                <Select.Option key={item._id} value={item._id}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name='search'>
            <Input placeholder='请输入搜索关键字' />
          </Form.Item>
          <Form.Item>
            <Button htmlType='submit'>搜索</Button>
          </Form.Item>
        </Input.Group>
      </Form>
      <Divider />
      <Row gutter={[16, 16]}>
        {search.map((item) => (
          <Col key={item._id} span='6'>
            <ProductItem product={item} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Search;
