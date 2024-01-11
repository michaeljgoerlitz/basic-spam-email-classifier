import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [emailText, setEmailText] = useState('');
  const [prediction, setPrediction] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post('http://localhost:5000/predict', { emailText });
      setPrediction(response.data.prediction);
    } catch (error) {
      console.error(error);
      setError(error);
      // setPrediction('Error predicting spam');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1>Spam Predictor</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Enter email text here..."
          value={emailText}
          onChange={(e) => setEmailText(e.target.value)}
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Predicting...' : 'Predict'}
        </button>
      </form>
      {prediction && <p>Prediction: {prediction}</p>}
      {error && <p className='error'>{error}</p>}
    </div>
  );
}

export default App;

// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
