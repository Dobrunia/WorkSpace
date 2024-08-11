import Header from './components/Header/Header';
import ToolPanel from './components/ToolPanel/ToolPanel';
import DrawingCanvas from './components/DrawingCanvas/DrawingCanvas';
import './App.css';
import { ControlPanel } from './components/ControlPanel/ControlPanel';

function App() {
  return (
    <div className="App">
      <Header />
      <ToolPanel />
      <ControlPanel />
      <DrawingCanvas />
    </div>
  );
}

export default App;
