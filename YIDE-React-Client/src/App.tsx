import { RouterProvider } from 'react-router-dom';
import './App.css';
import router from './router';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div>
      <RouterProvider router={router} />
      <ToastContainer />
    </div>
  );
}

export default App;
