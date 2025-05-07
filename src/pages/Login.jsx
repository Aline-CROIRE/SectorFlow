"use client"

import { useState, useEffect } from "react"
import { useNavigate, Link, useLocation } from "react-router-dom"
import styled from "styled-components"
import { useAuth } from "../contexts/AuthContexts"
import { useSector } from "../contexts/SectorContexts"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [showRegistrationMessage, setShowRegistrationMessage] = useState(false)

  const navigate = useNavigate()
  const location = useLocation()
  const { login } = useAuth()
  const { sector } = useSector()

  // Check if user was redirected from registration
  useEffect(() => {
    if (location.state?.fromRegistration) {
      setShowRegistrationMessage(true)
      // Clear the message after 5 seconds
      const timer = setTimeout(() => {
        setShowRegistrationMessage(false)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [location])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      await login(email, password)

      // If user has already selected a sector, go to dashboard, otherwise go to sector selection
      if (sector) {
        navigate("/dashboard")
      } else {
        navigate("/select-sector")
      }
    } catch (err) {
      setError("Invalid email or password")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <LoginContainer>
      <LoginCard>
        <LogoContainer>
          <Logo>SectorFlow</Logo>
          <Tagline>Business management for every sector</Tagline>
        </LogoContainer>

        {showRegistrationMessage && (
          <SuccessMessage>Registration successful! Please login with your new credentials.</SuccessMessage>
        )}

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <LoginForm onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </FormGroup>

          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login"}
          </Button>
        </LoginForm>

        <RegisterLink>
          Don't have an account? <Link to="/register">Register</Link>
        </RegisterLink>
        <ForgotPassword>Forgot password?</ForgotPassword>
      </LoginCard>
    </LoginContainer>
  )
}

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f5f5;
`

const LoginCard = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  width: 100%;
  max-width: 400px;
`

const LogoContainer = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`

const Logo = styled.h1`
  color: ${(props) => props.theme.colors.primary};
  font-size: 2rem;
  margin-bottom: 0.5rem;
`

const Tagline = styled.p`
  color: ${(props) => props.theme.colors.textLight};
  font-size: 0.9rem;
`

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

const Label = styled.label`
  font-weight: 500;
  font-size: 0.9rem;
`

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 4px;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.colors.primary};
    box-shadow: 0 0 0 2px rgba(75, 0, 130, 0.2);
  }
`

const Button = styled.button`
  background-color: ${(props) => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.75rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  margin-top: 0.5rem;
  
  &:hover {
    background-color: #3b0066;
  }
  
  &:disabled {
    background-color: #9d9d9d;
    cursor: not-allowed;
  }
`

const ErrorMessage = styled.div`
  background-color: #ffebee;
  color: #c62828;
  padding: 0.75rem;
  border-radius: 4px;
  margin-bottom: 1rem;
  font-size: 0.9rem;
`

const SuccessMessage = styled.div`
  background-color: #e8f5e9;
  color: #2e7d32;
  padding: 0.75rem;
  border-radius: 4px;
  margin-bottom: 1rem;
  font-size: 0.9rem;
`

const RegisterLink = styled.p`
  text-align: center;
  margin-top: 1.5rem;
  font-size: 0.9rem;
  
  a {
    color: ${(props) => props.theme.colors.primary};
    font-weight: 500;
    
    &:hover {
      text-decoration: underline;
    }
  }
`

const ForgotPassword = styled.a`
  display: block;
  text-align: center;
  margin-top: 0.75rem;
  font-size: 0.9rem;
  color: ${(props) => props.theme.colors.primary};
  cursor: pointer;
  
  &:hover {
    text-decoration: underline;
  }
`

export default Login
