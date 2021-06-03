import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import liff from "@line/liff";
import Liff from "./Liff";

liff.init({ liffId: "1656063536-1BR9j7Qg" });

function App() {
  return (
    <BrowserRouter>
      <Route exact path="/" render={(props) => <div>HELLO WORLD</div>} />
      <Route exact path="/liff" component={Liff} />
    </BrowserRouter>
  );
}

export default App;
