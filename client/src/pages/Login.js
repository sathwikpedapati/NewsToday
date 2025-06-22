import React from 'react';
import Navbar from '../Components/Navbar';
import { Button, Form, Input, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = ({ theme, setTheme }) => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const res = await axios.post("https://news-backend-pr6b.onrender.com/api/auth/login", {
        email: values.email,
        password: values.password,
      });
      localStorage.setItem("user", JSON.stringify(res.data.user));
      message.success("Welcome to Our News Today");
      navigate("/");
    } catch (error) {
      console.error("Login Error:", error);
      message.error("Authentication Failed");
    }
  };

  const labelStyle = {
    color: '#d3d3d3',
    fontWeight: 'bold',
    display: 'flex',
  };

  return (
    <>
      <Navbar theme={theme} setTheme={setTheme} />
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
      }}>
        <Form
          name="basic"
          labelCol={{ span: 8, style: labelStyle }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600, width: '100%' }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <h2 style={{ textAlign: "center", lineHeight: '4rem', color: "#d3d3d3" }}>Log-In</h2>

          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please input your Email!' }]}
          >
            <Input type='email' />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>

          <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'row', justifyContent: "center" }}>
            <Link to="/signup" style={{ textDecoration: 'none', marginTop: "0.5rem" }}>
              Create New Account?
            </Link>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Sign-In
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </>
  );
};

export default Login;
