import Header from './components/Header.tsx';
import Main from './components/Main.tsx';
import { useAdminToggle } from './hooks/useApp.ts';

const App = () => {
  const { isAdmin, toggleAdmin } = useAdminToggle();

  return (
    <div className="min-h-screen bg-gray-100">
      <Header isAdmin={isAdmin} toggleAdmin={toggleAdmin} />
      <Main isAdmin={isAdmin} />
    </div>
  );
};

export default App;
