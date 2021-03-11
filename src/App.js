import { GlobalStyle } from "./style";
import { IconStyle } from "./assets/iconfont/iconfont";
import routes from "./routes";
import { renderRoutes } from "react-router-config";
import { HashRouter } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <HashRouter>
        <GlobalStyle></GlobalStyle>
        <IconStyle></IconStyle>
        {renderRoutes(routes)}
      </HashRouter>
    </div>
  );
}

export default App;
