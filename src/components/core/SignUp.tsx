import { useEffect } from "react";
import { Form, Input, Button, Result } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  resetSignUp,
  signUp,
  SignUpPayload,
} from "../../store/actions/auth.action";
import { AppState } from "../../store/reducers";
import { AuthState } from "../../store/reducers/auth.reducer";
import { Link } from "react-router-dom";

const SignUp = () => {
  // 获取 dispatch 方法
  const dispatch = useDispatch();
  // 获取注册结果
  const auth = useSelector<AppState, AuthState>((state) => state.auth);

  const [form] = Form.useForm();

  // 注册表单提交
  const handleFinish = (values: SignUpPayload) => {
    // 发送注册请求
    dispatch(signUp(values));
  };

  // 1. 注册成功、清空表单
  useEffect(() => {
    if (auth.signUp.loaded && auth.signUp.success) {
      form.resetFields();
    }
  }, [auth]);

  // 2. 注册成功 显示成功的提示信息
  const showSuccess = () => {
    if (auth.signUp.loaded && auth.signUp.success) {
      return (
        <Result
          status='success'
          title='注册成功'
          extra={[
            <Button type='primary'>
              <Link to='/signIn'>登录</Link>
            </Button>,
          ]}
        />
      );
    }
  };

  // 3. 注册失败 显示失败的提示信息
  const showError = () => {
    if (auth.signUp.loaded && !auth.signUp.success) {
      return (
        <Result
          status='error'
          title='注册失败'
          subTitle={auth.signUp.message}
        />
      );
    }
  };

  // 4. 离开页面之前 重置状态
  useEffect(() => {
    return () => {
      dispatch(resetSignUp());
    };
  }, []);

  const signUpForm = () => (
    <Form form={form} onFinish={handleFinish}>
      <Form.Item name='name' label='姓名'>
        <Input />
      </Form.Item>
      <Form.Item name='password' label='密码'>
        <Input.Password />
      </Form.Item>
      <Form.Item name='email' label='邮箱'>
        <Input />
      </Form.Item>
      <Form.Item>
        <Button type='primary' htmlType='submit'>
          注册
        </Button>
      </Form.Item>
    </Form>
  );

  return (
    <>
      {showSuccess()}
      {showError()}
      {signUpForm()}
    </>
  );
};

export default SignUp;
