import { createContext, useContext, useState, ReactNode } from 'react';
import { User, users } from '@/data/mockData';

interface AuthContextType {
  currentUser: User | null;
  login: (email: string, password: string, role: 'student' | 'tutor' | 'admin') => boolean;
  logout: () => void;
  switchUser: (userId: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(users[0]); // Default to first user

  const login = (email: string, password: string, role: 'student' | 'tutor' | 'admin') => {
    // Demo credentials check
    const demoCredentials = [
      { email: 'student@skillora.com', password: 'password', role: 'student' },
      { email: 'tutor@skillora.com', password: 'password', role: 'tutor' },
      { email: 'admin@skillora.com', password: 'password', role: 'admin' }
    ];

    const isValidDemo = demoCredentials.some(cred => 
      cred.email === email && cred.password === password && cred.role === role
    );

    if (isValidDemo) {
      const user = users.find(u => u.role === role);
      if (user) {
        setCurrentUser(user);
        return true;
      }
    }
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const switchUser = (userId: string) => {
    const user = users.find(u => u.id === userId);
    if (user) {
      setCurrentUser(user);
    }
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, switchUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}