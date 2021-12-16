import { Col, Descriptions, Menu, Row, Typography } from "antd";
import { Link } from "react-router-dom";
import {
  ShoppingCartOutlined,
  UserOutlined,
  OrderedListOutlined,
} from "@ant-design/icons";
import useAuth from "../../hooks/useAuth";
import { Jwt } from "../../store/models/auth";

const { Title } = Typography;

const AdminDashboard = () => {
  const {
    user: { name, email },
  } = useAuth() as Jwt;

  const adminLinks = () => (
    <>
      <Title level={5}>管理员链接</Title>
      <Menu>
        <Menu.Item key='/create/category'>
          <ShoppingCartOutlined />
          <Link to='/create/category'>添加分类</Link>
        </Menu.Item>
        <Menu.Item key='/create/product'>
          <UserOutlined />
          <Link to='/create/product'>添加产品</Link>
        </Menu.Item>
        <Menu.Item key='/admin/orders'>
          <OrderedListOutlined />
          <Link to='/admin/orders'>订单列表</Link>
        </Menu.Item>
      </Menu>
    </>
  );

  const adminInfo = () => (
    <Descriptions title='管理员信息' bordered>
      <Descriptions.Item label='昵称'>{name}</Descriptions.Item>
      <Descriptions.Item label='邮件'>{email}</Descriptions.Item>
      <Descriptions.Item label='角色'>管理员</Descriptions.Item>
    </Descriptions>
  );

  return (
    <Row>
      <Col span='4'>{adminLinks()}</Col>
      <Col span='20'>{adminInfo()}</Col>
    </Row>
  );
};

export default AdminDashboard;
