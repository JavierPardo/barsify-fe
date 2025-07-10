import React from 'react';
import { AppProvider, useAppContext } from './context';
import { Header } from './layout/header';
import { Footer } from './layout';
import { AccountantPage, AdminPage, BarPage, CustomerPage, KitchenPage, WaiterPage } from './components/page';
const App: React.FC = () => {
  return (
    <AppProvider> {/* Envuelve toda la aplicación con AppProvider */}
      <div className="min-h-screen flex flex-col font-sans">
        {/* Tailwind CSS CDN para propósitos de demostración/previsualización.
            En un proyecto Vite real, Tailwind se configuraría a través de PostCSS
            y se compilaría, no se cargaría directamente desde un CDN en el HTML. */}
        <script src="https://cdn.tailwindcss.com"></script>
        <style>
          {`
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap');
            body {
              font-family: 'Inter', sans-serif;
            }
          `}
        </style>
        <Header />
        <main className="flex-grow">
          <AppContent /> {/* Componente que usa useAppContext */}
        </main>
        <Footer />
      </div>
    </AppProvider>
  );
};

// Nuevo componente para contener la lógica que usa el contexto
const AppContent: React.FC = () => {
  const { currentRole } = useAppContext();

  const renderPage = () => {
    switch (currentRole) {
      case 'customer':
        return <CustomerPage />;
      case 'waiter':
        return <WaiterPage />;
      case 'admin':
        return <AdminPage />;
      case 'cook':
        return <KitchenPage />;
      case 'bartender':
        return <BarPage />;
      case 'accountant':
        return <AccountantPage />;
      default:
        return <CustomerPage />;
    }
  };

  return (
    <>
      {renderPage()}
    </>
  );
};

export default App;

