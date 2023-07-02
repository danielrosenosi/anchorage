import { AppRoutes } from './routing';
import './global.css';
import { AuthContextProvider } from './contexts/AuthContext';
import { Login } from '../pages/Login';

function App() {
  return (
    <div className="app">
      <AuthContextProvider>
        <Login>
          <AppRoutes />
        </Login>
      </AuthContextProvider>
    </div>
  );
}

export default App;
