import { useEffect, useState } from "react";
import { Button, Form, Input, message } from "antd";
import axios from "axios";
import { API } from "../../config";
import useAuth from "../../hooks/useAuth";
import { Jwt } from "../../store/models/auth";
import { Link } from "react-router-dom";

const AddCategory = () => {
  const [name, setName] = useState<any>("");
  const {
    token,
    user: { _id },
  } = useAuth() as Jwt;

  useEffect(() => {
    async function addCategory() {
      try {
        const response = await axios.post<{ name: string }>(
          `${API}/category/create/${_id}`,
          {
            name,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        message.success(`[${response.data.name}] 分类添加成功`);
      } catch (error: any) {
        message.error(error.response.data.error);
      }
    }
    if (name && name.trim()) {
      addCategory();
    }
  }, [name]);

  const handleFinish = (values: { name: string }) => {
    setName(values.name);
  };

  return (
    <div>
      <Form onFinish={handleFinish}>
        <Form.Item name='name' label='分类名称'>
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type='primary' htmlType='submit'>
            提交
          </Button>
        </Form.Item>
      </Form>
      <Button>
        <Link to='/admin/dashboard'>返回 Dashboard</Link>
      </Button>
    </div>
  );
};

export default AddCategory;
