import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import JiraLogin from "./Components/JiraLogin";
import Landing from "./Components/Landing";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";

function App() {
  return (
    <div className="App">
      <Provider store={appStore}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<JiraLogin />} />
            <Route path="/landing" element={<Landing />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
