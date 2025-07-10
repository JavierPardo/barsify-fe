import type { AppContextType } from "../../context";

interface RoleDashboardProps {
  role: AppContextType['currentRole'];
  children: React.ReactNode;
}

export const RoleDashboard: React.FC<RoleDashboardProps> = ({ role, children }) => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">
        Panel de Control - {role.charAt(0).toUpperCase() + role.slice(1)}
      </h1>
      {children}
    </div>
  );
};