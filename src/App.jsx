import React, { useState } from 'react';
import NavBar from './components/NavBar';
import NavBoard from './components/NavBoard';
import Foter from './components/Foter';

const App = () => {
  const [category, setCategory] = useState('general');

  return (
    <div>
      <NavBar setCategory={setCategory} />
      <NavBoard category={category} />
      <Foter/>
    </div>
  );
};

export default App;


