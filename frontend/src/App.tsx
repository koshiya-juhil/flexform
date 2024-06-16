import { ToastContainer } from 'react-toastify'
import Router from './Router'
import 'react-toastify/dist/ReactToastify.min.css';



function App() {

  return (
    <div className='app'>
      <Router />
      
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

    </div>
  )
}

export default App
