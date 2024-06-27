import logo from './logo.svg';
import './App.css';
import CryptoPrices from './component/CryptoPrices';
import Shape from './component/Shape';

function App() {
  const data = [
    [1, 1, 0],
    [0, 1, 1],
    [1, 0, 1]
  ];

  return (
    <div className="App">
      {/* <CryptoPrices /> */}
      <Shape data={data} />
    </div>
  );
}

export default App;
