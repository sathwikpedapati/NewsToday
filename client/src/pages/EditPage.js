import React, { useEffect } from 'react';
import Navbar from '../Components/Navbar';
import { Button, Form, Input, Upload, message } from 'antd';
import { UploadOutlined, DeleteOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EditPage = ({ theme, setTheme }) => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    form.setFieldsValue({
      username: user.username,
      email: user.email,
      profilePic: [],
    });
  }, [form, user, navigate]);

  const onFinish = async (values) => {
    const formData = new FormData();
    formData.append("username", values.username);
    formData.append("email", values.email);

    if (values.profilePic && values.profilePic.length > 0) {
      formData.append("profilePic", values.profilePic[0].originFileObj);
    }

    try {
      const res = await axios.post("https://news-today-1.onrender.com/api/auth/edit", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          token: token,
        },
      });

      localStorage.setItem("user", JSON.stringify(res.data.user));
      message.success("Profile Updated");
      navigate("/view");
    } catch (err) {
      console.error("Update Error:", err);
      message.error("Failed to update profile");
    }
  };

  const handleDelete = async () => {
    try {
      await axios.post("https://news-today-1.onrender.com/api/auth/delete", {}, {
        headers: { token },
      });

      message.success("Account Deleted");
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      navigate("/login");
    } catch (error) {
      console.error("Delete Error:", error);
      message.error("Failed to delete account");
    }
  };

  return (
    <>
      <Navbar theme={theme} setTheme={setTheme} />
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          style={{ width: 500 }}
        >
          <h2 style={{ textAlign: 'center', color: theme === 'dark' ? '#d3d3d3' : '#333' }}>
            Edit Profile
          </h2>

          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please enter your username' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please enter your email' }]}
          >
            <Input type="email" />
          </Form.Item>

          <Form.Item
            label="Profile Picture"
            name="profilePic"
            valuePropName="fileList"
            getValueFromEvent={e => (Array.isArray(e) ? e : e?.fileList || [])}
          >
            <Upload maxCount={1} beforeUpload={() => false} accept="image/*">
              <Button icon={<UploadOutlined />}>Upload New Picture</Button>
            </Upload>
          </Form.Item>

          <Form.Item style={{ textAlign: 'center' }}>
            <Button type="primary" htmlType="submit" style={{ marginRight: 10 }}>
              Update Profile
            </Button>

            <Button danger icon={<DeleteOutlined />} onClick={handleDelete}>
              Delete Account
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default EditPage;
