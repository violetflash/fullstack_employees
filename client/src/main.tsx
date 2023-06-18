import { ConfigProvider, theme } from 'antd';
import React from "react"
import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import { store } from "./app/store"
import App from "./App"
import "./index.css"
import { AuthGuard } from './features/auth/AuthGuard';

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthGuard>
        <ConfigProvider theme={{
          algorithm: theme.darkAlgorithm
        }}>
          <App />
        </ConfigProvider>
      </AuthGuard>
    </Provider>
  </React.StrictMode>,
)
