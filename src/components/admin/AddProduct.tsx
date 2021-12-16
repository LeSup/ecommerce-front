import {
  Button,
  Form,
  Input,
  InputNumber,
  message,
  Radio,
  Select,
  Upload,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategory } from "../../store/actions/category.action";
import { AppState } from "../../store/reducers";
import { CategoryState } from "../../store/reducers/category.reducer";
import { RcFile } from "antd/lib/upload";
import axios from "axios";
import { API } from "../../config";
import { Jwt } from "../../store/models/auth";
import useAuth from "../../hooks/useAuth";

interface ProductValues {
  name: string;
  description: string;
  price: number;
  category: string;
  quantity: number;
  shipping: string;
}

const AddProduct = () => {
  const dispatch = useDispatch();
  const [file, setFile] = useState<RcFile>();

  const {
    user: { _id },
    token,
  } = useAuth() as Jwt;

  const categoryState = useSelector<AppState, CategoryState>(
    (state) => state.category
  );

  useEffect(() => {
    dispatch(getCategory());
  }, []);

  const handleFinish = (values: ProductValues) => {
    const formData = new FormData();
    let attr: keyof ProductValues;
    for (attr in values) {
      formData.set(attr, values[attr] + "");
    }
    if (typeof file !== "undefined") {
      formData.set("photo", file);
    }

    axios
      .post(`${API}/product/create/${_id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        message.success("商品添加成功");
      })
      .catch(() => {
        message.error("商品添加失败");
      });
  };

  const addProductForm = () => {
    const uploadProps = {
      accept: "image/*",
      beforeUpload: function (file: RcFile) {
        console.log("file", file);
        setFile(file);
        return false;
      },
    };

    return (
      <Form onFinish={handleFinish}>
        <Form.Item>
          <Upload {...uploadProps}>
            <Button icon={<UploadOutlined />}>上传商品封面</Button>
          </Upload>
        </Form.Item>
        <Form.Item name='name' label='商品名称'>
          <Input />
        </Form.Item>
        <Form.Item name='description' label='商品描述'>
          <Input />
        </Form.Item>
        <Form.Item name='price' label='商品价格'>
          <InputNumber style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item name='category' label='所属分类'>
          <Select>
            {categoryState.category.result.map((item) => (
              <Select.Option key={item._id} value={item._id}>
                {item.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name='quantity' label='商品数量'>
          <InputNumber precision={0} style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item name='shipping' label='是否需要运输'>
          <Radio.Group>
            <Radio value='1'>是</Radio>
            <Radio value='0'>否</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item>
          <Button type='primary' htmlType='submit'>
            添加商品
          </Button>
        </Form.Item>
      </Form>
    );
  };
  return <>{addProductForm()}</>;
};

export default AddProduct;
