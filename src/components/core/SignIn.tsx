import { Form, Input, Button, Result } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { signIn, SignInPayload } from "../../store/actions/auth.action";
import { Jwt } from "../../store/models/auth";
import { AppState } from "../../store/reducers";
import { AuthState } from "../../store/reducers/auth.reducer";

const SignIp = () => {
  // 获取 auth
  const auth = useAuth();
  // 获取 location
  const location = useLocation();
  // 获取 dispatch
  const dispatch = useDispatch();
  // 提交登录表单
  const handleFinish = (values: SignInPayload) => {
    dispatch(signIn(values));
  };

  // 1. 获取登录结果
  const authState = useSelector<AppState, AuthState>((state) => state.auth);
  // 2. 登录失败，显示错误信息
  const showError = () => {
    if (authState.signIn.loaded && !authState.signIn.success) {
      return (
        <Result
          status='error'
          title='登录失败'
          subTitle={authState.signIn.message}
        />
      );
    }
  };
  // 3. 登录成功 根据角色跳转到对应的管理页面
  const redirectToDashboard = () => {
    if (auth) {
      const from = location.state?.from?.pathname;
      if (from) {
        return <Navigate to={from} replace={true} />;
      }

      const {
        user: { role },
      } = auth as Jwt;
      if (role === 0) {
        // 注册用户
        return <Navigate to='/user/dashboard' />;
      } else {
        // 管理员
        return <Navigate to='/admin/dashboard' />;
      }
    }
  };

  const signInForm = () => (
    <Form onFinish={handleFinish}>
      <Form.Item name='email' label='邮箱'>
        <Input />
      </Form.Item>
      <Form.Item name='password' label='密码'>
        <Input.Password />
      </Form.Item>
      <Form.Item>
        <Button type='primary' htmlType='submit'>
          登录
        </Button>
      </Form.Item>
    </Form>
  );

  // 4. 处理导航链接，已登录：隐藏 【登录，注册】，显示 【dashboard】
  return (
    <>
      {showError()}
      {redirectToDashboard()}
      {signInForm()}
    </>
  );
};

export default SignIp;
