import { createContext } from "react";
import type { AppContextType } from "./appContextType";

export const AppContext = createContext<AppContextType | undefined>(undefined);
