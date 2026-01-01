import React from 'react';
import InsuranceForm from './components/InsuranceForm';

export default function App() {
  return (
    <div className="app">
      <h1>Remote App (Webpack 5)</h1>
      <p>This is a simple remote React app bundled with Webpack 5.</p>
	  <InsuranceForm />
    </div>
  );
}
