import { useState } from 'react';
import ExcuseForm from './components/ExcuseForm';

function App(){
  return(
    <div className="container">
      <h1>Excuse Generator</h1>
      <p>Generate believable excuses for escaping your responsibilities.</p>
      <ExcuseForm />
    </div>
  );
}

export default App;