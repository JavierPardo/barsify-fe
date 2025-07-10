import { Button } from "../components/atom";
import { useAppContext } from "../context";

export const Header: React.FC = () => {
  const { currentRole, setCurrentRole } = useAppContext();

  return (
    <header className="bg-red-700 text-white p-4 shadow-lg">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
        <h1 className="text-3xl font-extrabold mb-4 sm:mb-0">Mi Restaurante</h1>
        <nav className="flex flex-wrap justify-center sm:justify-end gap-3">
          <Button variant={currentRole === 'customer' ? 'secondary' : 'primary'} onClick={() => setCurrentRole('customer')} className="!bg-white !text-red-700 hover:!bg-gray-100">Cliente</Button>
          <Button variant={currentRole === 'waiter' ? 'secondary' : 'primary'} onClick={() => setCurrentRole('waiter')} className="!bg-white !text-red-700 hover:!bg-gray-100">Mesero</Button>
          <Button variant={currentRole === 'cook' ? 'secondary' : 'primary'} onClick={() => setCurrentRole('cook')} className="!bg-white !text-red-700 hover:!bg-gray-100">Cocinero</Button>
          <Button variant={currentRole === 'bartender' ? 'secondary' : 'primary'} onClick={() => setCurrentRole('bartender')} className="!bg-white !text-red-700 hover:!bg-gray-100">Bartender</Button>
          <Button variant={currentRole === 'admin' ? 'secondary' : 'primary'} onClick={() => setCurrentRole('admin')} className="!bg-white !text-red-700 hover:!bg-gray-100">Administrador</Button>
          <Button variant={currentRole === 'accountant' ? 'secondary' : 'primary'} onClick={() => setCurrentRole('accountant')} className="!bg-white !text-red-700 hover:!bg-gray-100">Contador</Button>
        </nav>
      </div>
    </header>
  );
};