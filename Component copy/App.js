'use client';
import { useEffect, useState } from 'react'
import Hero from './Preloader';

const App = ({childrenn}) => {
const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 8000); // 4s loader
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className=''>
      {loading ? <Hero /> : childrenn}
    </div>
  )
}

export default App
