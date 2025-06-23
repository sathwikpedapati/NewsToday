import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button, message } from 'antd';

const Navbar = ({ setCategory, theme = 'light', setTheme }) => {
  const navigate = useNavigate();
  const logedinuser = JSON.parse(localStorage.getItem("user"));
  const isDark = theme === 'dark';
  const navClass = isDark ? 'navbar-dark bg-dark' : 'navbar-light bg-light';
  const badgeClass = isDark ? 'bg-light text-dark' : 'bg-dark text-light';

  const toggleTheme = () => {
    if (typeof setTheme === 'function') {
      setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
    } else {
      console.warn("setTheme function not provided to Navbar.");
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login");
    message.success("Logged Out");
  };

  return (
    <nav className={`navbar navbar-expand-lg ${navClass}`} data-bs-theme={theme}>
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          <span className={`badge ${badgeClass} fs-4`}>News Today</span>
        </a>

        {logedinuser ? (
          <>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav me-auto">
                {['technology', 'business', 'health', 'sports', 'entertainment'].map((cat) => (
                  <li className="nav-item" key={cat}>
                    <div
                      className="nav-link"
                      style={{ cursor: 'pointer' }}
                      onClick={() => setCategory && setCategory(cat)}
                    >
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </div>
                  </li>
                ))}
              </ul>

              <div style={{ display: "flex", flexDirection: "row" }}>
                <div className="dropdown">
                  <button
                    className="btn btn-secondary dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    style={{ marginRight: '1rem' }}
                  >
                    Profile Details
                  </button>
                  <ul className="dropdown-menu">
                    <li>
                      <Link to="/view" className="dropdown-item">View Profile</Link>
                    </li>
                    <li>
                      <Link to="/edit" className="dropdown-item">Edit Profile</Link>
                    </li>
                    <li>
                      <Button onClick={logout} type="link" danger className="dropdown-item">
                        Log Out
                      </Button>
                    </li>
                  </ul>
                </div>

                <button onClick={toggleTheme} className="btn btn-outline-secondary">
                  {isDark ? 'Light Mode' : 'Dark Mode'}
                </button>
              </div>
            </div>
          </>
        ) : (
          <div style={{ display: "flex", flexDirection: "row", marginLeft: "auto" }}>
            <button onClick={toggleTheme} className="btn btn-outline-secondary">
              {isDark ? 'Light Mode' : 'Dark Mode'}
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
