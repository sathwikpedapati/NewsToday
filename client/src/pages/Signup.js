import React, { useEffect } from 'react';
import Navbar from '../Components/Navbar';
import { Button, Form, Input, Upload, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';

const Signup = ({ theme, setTheme }) => {
  const navigate = useNavigate();

  useEffect(() => {
    document.body.setAttribute('data-bs-theme', 'light');
    document.body.style.backgroundColor = '#f8f9fa';
    document.body.style.color = '#000000';
  }, []);

  const onFinish = async (values) => {
    const formData = new FormData();
    formData.append("username", values.username);
    formData.append("email", values.email);
    formData.append("password", values.password);

    const fileObj = values.profilePic?.[0]?.originFileObj;
    if (!fileObj) {
      return message.error("Profile picture is required");
    }

    formData.append("profilePic", fileObj);

    try {
      const res = await axios.post("https://news-43hs.vercel.app/api/auth/signup", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      message.success("Signup Successfully");
      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("token", res.data.token);
      navigate("/");
    } catch (error) {
      console.error("Signup Error:", error);
      const msg = error?.response?.data?.message || "Signup Failed";
      message.error(msg);
    }
  };

  const labelStyle = {
    color: '#6c757d', // Light gray
    fontWeight: 'bold',
    display: "flex",
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
          name="signup"
          labelCol={{ span: 8, style: labelStyle }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600, width: '100%' }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <h2 style={{ textAlign: "center", lineHeight: '4rem', color: "#333" }}>Sign-Up</h2>

          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please enter your username" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, type: 'email', message: "Please enter a valid email" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter a password" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="Profile Picture"
            name="profilePic"
            rules={[{ required: true, message: 'Please upload your profile picture!' }]}
            valuePropName="fileList"
            getValueFromEvent={e => Array.isArray(e) ? e : e?.fileList}
          >
            <Upload maxCount={1} beforeUpload={() => false} accept="image/*">
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: "center" }}>
            <Link to="/login" style={{ marginBottom: '10px', color: "#333" }}>
              Already have an account?
            </Link>
            <Form.Item>
              <Button type="primary" htmlType="submit">Sign-Up</Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </>
  );
};

export default Signup;
