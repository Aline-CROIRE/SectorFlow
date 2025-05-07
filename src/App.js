"use client"

import { useState, useEffect } from "react"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { ThemeProvider } from "styled-components"
import GlobalStyles from "./styles/GLobalStyles"
import { getThemeForSector } from "./styles/themes"
import Dashboard from "./pages/Dashboard"
import Login from "./pages/Login"
import Register from "./pages/Register"
import SectorSelection from "./pages/SectorSelection"
import { SectorProvider, useSector } from "./contexts/SectorContexts"
import { AuthProvider, useAuth } from "./contexts/AuthContexts"

const AppRoutes = () => {
  const { isAuthenticated, isLoading: authLoading } = useAuth()
  const { sector, isLoading: sectorLoading } = useSector()
  const [isReady, setIsReady] = useState(false)

  // Wait for both auth and sector to be loaded before rendering routes
  useEffect(() => {
    if (!authLoading && !sectorLoading) {
      setIsReady(true)
    }
  }, [authLoading, sectorLoading])

  if (!isReady) {
    return <div>Loading...</div>
  }

  return (
    <Routes>
      <Route path="/register" element={!isAuthenticated ? <Register /> : <Navigate to="/dashboard" />} />
      <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/dashboard" />} />
      <Route path="/select-sector" element={isAuthenticated ? <SectorSelection /> : <Navigate to="/login" />} />
      <Route
        path="/dashboard/*"
        element={isAuthenticated ? sector ? <Dashboard /> : <Navigate to="/select-sector" /> : <Navigate to="/login" />}
      />
      {/* Default route redirects to register */}
      <Route
        path="/"
        element={
          isAuthenticated ? (
            sector ? (
              <Navigate to="/dashboard" />
            ) : (
              <Navigate to="/select-sector" />
            )
          ) : (
            <Navigate to="/register" />
          )
        }
      />
      {/* Catch all other routes and redirect to register if not authenticated */}
      <Route path="*" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/register" />} />
    </Routes>
  )
}

const AppWithTheme = () => {
  const { sector } = useSector()
  // Use a default theme if no sector is selected
  const theme = getThemeForSector(sector || null)

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Router>
        <AppRoutes />
      </Router>
    </ThemeProvider>
  )
}

const App = () => {
  return (
    <AuthProvider>
      <SectorProvider>
        <AppWithTheme />
      </SectorProvider>
    </AuthProvider>
  )
}

export default App
