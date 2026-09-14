import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App";
import { store } from "./components/redux/store";
import TodoContextProvider from "./Context/TaskContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <TodoContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </TodoContextProvider>
    </Provider>
  </StrictMode>
);
