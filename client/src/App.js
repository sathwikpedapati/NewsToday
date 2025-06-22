import { useEffect, useState } from 'react';
import './App.css';
import Navbar from './Components/Navbar';
import NewsBoard from './Components/NewsBoard';
import NewsItem from './Components/NewsItem';

function App({ theme, setTheme }) {
  const [category, setCategory] = useState("general");

  useEffect(() => {
    document.body.setAttribute('data-bs-theme', theme);
    document.body.style.backgroundColor = theme === 'dark' ? '#121212' : '#f8f9fa';
    document.body.style.color = theme === 'dark' ? '#ffffff' : '#000000';
  }, [theme]);

  return (
    <>
      <Navbar setCategory={setCategory} theme={theme} setTheme={setTheme} />
      <NewsBoard category={category} />
      <NewsItem />
    </>
  );
}

export default App;
