import "./App.css";
import { RouterProvider } from 'react-router-dom';
import { appRouter } from './routes';

function App() {
  console.log(import.meta.env.VITE_PORT)
  return (
    <RouterProvider router={appRouter} />
  )
}

export default App
