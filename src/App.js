import './App.css';
import Board from './components/Board';

function App() {
  return (
    <div className="App">
      <h1 style={{ fontFamily: "cursive", color: "rgb(35, 51, 41)" }}>Minesweeper</h1>
      <Board />
    </div>
  );
}

export default App;
