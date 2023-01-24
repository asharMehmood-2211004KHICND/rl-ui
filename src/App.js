import './App.css';
import TopBar from './Components/Header/TopBar';
import Home from './Components/Pages/Home/Home';
import SideBar from './Components/SideBar/SideBar';


function App() {
  return (
    <div className="App">
      <TopBar />
      <div className="containerz">
        <SideBar />
        <div className="pages">
          
          <Home />

        </div>

      </div>
    </div>
  );
}

export default App;
