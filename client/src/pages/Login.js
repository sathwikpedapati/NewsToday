import React, { useEffect } from 'react';
import Navbar from '../Components/Navbar';
import { Button, Form, Input, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = ({ theme, setTheme }) => {
  const navigate = useNavigate();

  useEffect(() => {
    document.body.setAttribute('data-bs-theme', 'light');
    document.body.style.backgroundColor = '#f8f9fa';
    document.body.style.color = '#000000';
  }, []);

  const onFinish = async (values) => {
    try {
      const res = await axios.post("https://news-43hs.vercel.app/api/auth/login", {
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
    color: '#6c757d', // Light gray
    fontWeight: 'bold',
    display: 'flex',
  };

  return (
    <>
      <Navbar theme="light" setTheme={() => {}} showThemeToggle={false} />
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
          <h2 style={{ textAlign: "center", lineHeight: '4rem', color: "#333" }}>Log-In</h2>

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
            <Link to="/signup" style={{ textDecoration: 'none', marginTop: "0.5rem", marginRight: "1rem" }}>
              Create New Account?
            </Link>
            <Form.Item wrapperCol={{ offset: 0 }}>
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
