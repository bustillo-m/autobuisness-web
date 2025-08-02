import { User } from '../types';

// Simulación de autenticación (en producción usar Supabase Auth)
export const authenticateUser = (email: string, password: string): User | null => {
  // Demo users para testing
  const demoUsers: User[] = [
    {
      id: '1',
      name: 'Juan Pérez',
      email: 'demo@autobusiness.ai',
      plan: 'Pro',
      credits: 6,
      createdAt: new Date()
    }
  ];

  const user = demoUsers.find(u => u.email === email);
  return user || null;
};

export const registerUser = (name: string, email: string, password: string, plan: string): User => {
  const planCredits = {
    'Freemium': 1,
    'Starter': 3,
    'Pro': 6,
    'Empresa': 15
  };

  return {
    id: Date.now().toString(),
    name,
    email,
    plan: plan as User['plan'],
    credits: planCredits[plan as keyof typeof planCredits] || 1,
    createdAt: new Date()
  };
};

export const getPlanCredits = (plan: string): number => {
  const planCredits = {
    'Freemium': 1,
    'Starter': 3,
    'Pro': 6,
    'Empresa': 15
  };
  return planCredits[plan as keyof typeof planCredits] || 1;
};