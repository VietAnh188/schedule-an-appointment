import {publicRouters} from './routers'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import "./index.css";
function App() {
  return (
    <BrowserRouter>
          <Routes>
            {publicRouters.map((e) => <Route key={e.path} path={e.path} element={<e.component/>}></Route>)}
          </Routes>
    </BrowserRouter>
  );
}

export default App;
