import { AppRoutes } from './routing';
import { AuthContextProvider } from './contexts/AuthContext';
import { Login } from '../pages/Login';

function App() {
  return (
    <AuthContextProvider>
      <Login>
        <AppRoutes />
      </Login>
    </AuthContextProvider>
  );
}

export default App;
