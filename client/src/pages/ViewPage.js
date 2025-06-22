import React, { useEffect, useState } from 'react';
import Navbar from '../Components/Navbar';
import { Card, Space, Avatar } from 'antd';
import { useNavigate, Link } from 'react-router-dom';

const ViewPage = ({ theme, setTheme }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user"));
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [navigate, user]);

  if (!user) return null;

  return (
    <>
      <Navbar theme={theme} setTheme={setTheme} />

      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '90vh'
      }}>
        <Space direction="vertical" size={16}>
          <Card
            title={user.username || "User Profile"}
            style={{
              width: 400,
              textAlign: 'center',
              borderRadius: '10px',
              boxShadow: '0 4px 10px rgba(0,0,0,0.3)'
            }}
          >
            {user.profilePic ? (
              <Avatar
                size={100}
                src={user.profilePic}
                style={{ marginBottom: '16px' }}
              />
            ) : (
              <Avatar
                size={100}
                style={{ backgroundColor: '#f56a00', marginBottom: '16px' }}
              >
                {user.username?.charAt(0).toUpperCase() || 'U'}
              </Avatar>
            )}
            <p><strong>Email:</strong> {user.email || "N/A"}</p>
            <Link
              to="/"
              style={{
                textDecoration: "none",
                color: '#1890ff',
                fontWeight: 'bold'
              }}
            >
              Back to Home
            </Link>
          </Card>
        </Space>
      </div>
    </>
  );
};

export default ViewPage;
