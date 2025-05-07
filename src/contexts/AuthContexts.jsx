"use client"

import { createContext, useState, useContext, useEffect } from "react"

const AuthContext = createContext({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => {},
  register: async () => {},
  logout: () => {},
})

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Check if user is already logged in
  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
      setIsAuthenticated(true)
    }
    setIsLoading(false)
  }, [])

  // In a real app, this would make an API call
  const login = async (email, password) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock user data
      const userData = {
        id: "1",
        name: "Test User",
        email,
        role: "owner",
        businessId: "123",
      }

      setUser(userData)
      setIsAuthenticated(true)
      localStorage.setItem("user", JSON.stringify(userData))
      return userData
    } catch (error) {
      console.error("Login failed:", error)
      throw error
    }
  }

  // Register a new user
  const register = async (userData) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Mock registered user data
      const registeredUser = {
        id: Math.floor(Math.random() * 1000).toString(),
        name: userData.ownerName,
        email: userData.email,
        role: "owner",
        businessName: userData.businessName,
        businessId: Math.floor(Math.random() * 1000).toString(),
      }

      // Store the user data but don't set as authenticated
      // This forces the user to login after registration
      localStorage.setItem("registeredUser", JSON.stringify(registeredUser))

      return registeredUser
    } catch (error) {
      console.error("Registration failed:", error)
      throw error
    }
  }

  const logout = () => {
    setUser(null)
    setIsAuthenticated(false)
    localStorage.removeItem("user")
    localStorage.removeItem("selectedSector")
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
