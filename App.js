import { TodoProvider } from './firebase/FirestoreController';
import { PaperProvider } from 'react-native-paper';
import { AuthProvider} from './firebase/FirebaseAuthControl';
import Navigation from './pages/Navigation';


export default function App() {
  return (
    <AuthProvider>
      <TodoProvider>
        <PaperProvider>
          <Navigation/>
        </PaperProvider>
      </TodoProvider>
    </AuthProvider>
  );
}




