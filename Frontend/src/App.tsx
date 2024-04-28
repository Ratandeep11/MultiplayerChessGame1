import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Landing } from './screens/Landing';
import { Game } from './screens/Game';

function App() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-slate-900 to-gray-800">
      <div className="max-w-screen-lg w-full p-6 rounded-lg shadow-lg bg-gray-100">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/game" element={<Game />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
