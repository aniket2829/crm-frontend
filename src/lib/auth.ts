import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'manager' | 'sales'
  avatar?: string
}

interface LoginCredentials {
  email: string
  password: string
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  isInitialized: boolean
  login: (credentials: LoginCredentials) => Promise<void>
  logout: () => void
  checkAuth: () => Promise<void>
  initialize: () => void
}

// Mock user data for demonstration
const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'admin',
    avatar: '/api/placeholder/32/32'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'manager',
    avatar: '/api/placeholder/32/32'
  }
]

export const useAuth = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      isInitialized: false,
      
      initialize: () => {
        const { user } = get()
        // Set authenticated state based on stored user
        const isAuth = !!user
        set({ 
          isAuthenticated: isAuth, 
          isInitialized: true 
        })
      },
      
      login: async (credentials: LoginCredentials) => {
        set({ isLoading: true })
        
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1000))
          
          const user = mockUsers.find(u => u.email === credentials.email)
          
          if (user && credentials.password === 'password') {
            set({ 
              user, 
              isAuthenticated: true, 
              isLoading: false 
            })
          } else {
            throw new Error('Invalid credentials')
          }
        } catch (error) {
          set({ isLoading: false })
          throw error
        }
      },
      
      logout: () => {
        set({ 
          user: null, 
          isAuthenticated: false 
        })
      },
      
      checkAuth: async () => {
        const { user } = get()
        if (user) {
          set({ isAuthenticated: true })
        }
      }
    }),
    { 
      name: 'auth-storage',
      partialize: (state) => ({ 
        user: state.user, 
        isAuthenticated: state.isAuthenticated 
      }),
      // Skip hydration for isInitialized to prevent mismatch
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.isInitialized = false
        }
      }
    }
  )
)
