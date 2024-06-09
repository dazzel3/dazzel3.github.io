import { ReactNode, createContext, useContext, useState } from 'react';

export interface ContextType {
  darkMode: boolean;
  toggleMode: () => void;
}
interface Props {
  children: ReactNode;
}

const DarkModeContext = createContext<ContextType>({
  darkMode: false,
  toggleMode: () => {
    return null;
  },
});

export const DarkModeProvider: React.FC<Props> = ({ children }) => {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const toggleMode = () => {
    setDarkMode(!darkMode);
  };
  return (
    <DarkModeContext.Provider value={{ darkMode, toggleMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

export const useDarkMode = () => useContext(DarkModeContext);
