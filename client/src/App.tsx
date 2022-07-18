import {publicRouters} from './routers'
import {BrowserRouter, Route, Routes, Link} from 'react-router-dom'
function App() {
  return (
    <BrowserRouter>
          <Routes>
            {publicRouters.map((e) => <Route path={e.path} element={<e.component/>}></Route>)}
          </Routes>
    </BrowserRouter>
  );
}

export default App;
