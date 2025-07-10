
export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white p-4 text-center mt-8 shadow-inner">
      <div className="container mx-auto">
        <p>&copy; {new Date().getFullYear()} Mi Restaurante. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};