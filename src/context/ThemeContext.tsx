import {
  fetchThemeFromLocalStorage,
  writeThemeToLocalStorage,
} from "../lib/localStorage";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const THEMES = ["latte", "frappe", "macchiato", "mocha"] as const;

export type Theme = (typeof THEMES)[number];

export function isTheme(value: string): value is Theme {
  return THEMES.includes(value as Theme);
}

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    const loaded = fetchThemeFromLocalStorage();
    if (!loaded) {
      return "macchiato";
    }
    return loaded;
  });

  useEffect(() => {
    document.documentElement.classList.remove(
      "theme-latte",
      "theme-frappe",
      "theme-macchiato",
      "theme-mocha",
    );
    document.documentElement.classList.add(`theme-${theme}`);
    writeThemeToLocalStorage(theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
