"use client"

import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import styled from "styled-components"
import { useAuth } from "../contexts/AuthContexts"

const Register = () => {
  const [formData, setFormData] = useState({
    businessName: "",
    ownerName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    address: "",
  })
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [registrationSuccess, setRegistrationSuccess] = useState(false)
  const navigate = useNavigate()
  const { register } = useAuth()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      })
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.businessName.trim()) {
      newErrors.businessName = "Business name is required"
    }

    if (!formData.ownerName.trim()) {
      newErrors.ownerName = "Owner name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required"
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required"
    }

    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const validationErrors = validateForm()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setIsLoading(true)

    try {
      // In a real app, this would make an API call to register the user
      await register(formData)

      // Instead of directly navigating to sector selection, show success message and prompt to login
      setRegistrationSuccess(true)

      // Automatically redirect to login after 3 seconds
      setTimeout(() => {
        // Log the user out to ensure they need to login with their new credentials
        localStorage.removeItem("user")
        navigate("/login")
      }, 3000)
    } catch (error) {
      setErrors({
        general: "Registration failed. Please try again.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (registrationSuccess) {
    return (
      <RegisterContainer>
        <SuccessCard>
          <SuccessIcon>✓</SuccessIcon>
          <SuccessTitle>Registration Successful!</SuccessTitle>
          <SuccessMessage>
            Your account has been created successfully. You will be redirected to the login page in a moment.
          </SuccessMessage>
          <LoginButton onClick={() => navigate("/login")}>Go to Login</LoginButton>
        </SuccessCard>
      </RegisterContainer>
    )
  }

  return (
    <RegisterContainer>
      <RegisterCard>
        <LogoContainer>
          <Logo>SectorFlow</Logo>
          <Tagline>Create your business account</Tagline>
        </LogoContainer>

        {errors.general && <ErrorMessage>{errors.general}</ErrorMessage>}

        <RegisterForm onSubmit={handleSubmit}>
          <FormRow>
            <FormGroup>
              <Label htmlFor="businessName">Business Name*</Label>
              <Input
                id="businessName"
                name="businessName"
                type="text"
                value={formData.businessName}
                onChange={handleChange}
                error={errors.businessName}
              />
              {errors.businessName && <ErrorText>{errors.businessName}</ErrorText>}
            </FormGroup>

            <FormGroup>
              <Label htmlFor="ownerName">Owner Name*</Label>
              <Input
                id="ownerName"
                name="ownerName"
                type="text"
                value={formData.ownerName}
                onChange={handleChange}
                error={errors.ownerName}
              />
              {errors.ownerName && <ErrorText>{errors.ownerName}</ErrorText>}
            </FormGroup>
          </FormRow>

          <FormRow>
            <FormGroup>
              <Label htmlFor="email">Email Address*</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
              />
              {errors.email && <ErrorText>{errors.email}</ErrorText>}
            </FormGroup>

            <FormGroup>
              <Label htmlFor="phone">Phone Number*</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                error={errors.phone}
              />
              {errors.phone && <ErrorText>{errors.phone}</ErrorText>}
            </FormGroup>
          </FormRow>

          <FormGroup>
            <Label htmlFor="address">Business Address*</Label>
            <Input
              id="address"
              name="address"
              type="text"
              value={formData.address}
              onChange={handleChange}
              error={errors.address}
            />
            {errors.address && <ErrorText>{errors.address}</ErrorText>}
          </FormGroup>

          <FormRow>
            <FormGroup>
              <Label htmlFor="password">Password*</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
              />
              {errors.password && <ErrorText>{errors.password}</ErrorText>}
            </FormGroup>

            <FormGroup>
              <Label htmlFor="confirmPassword">Confirm Password*</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                error={errors.confirmPassword}
              />
              {errors.confirmPassword && <ErrorText>{errors.confirmPassword}</ErrorText>}
            </FormGroup>
          </FormRow>

          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Creating Account..." : "Create Account"}
          </Button>
        </RegisterForm>

        <LoginLink>
          Already have an account? <Link to="/login">Login</Link>
        </LoginLink>
      </RegisterCard>
    </RegisterContainer>
  )
}

const RegisterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 2rem;
`

const RegisterCard = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  width: 100%;
  max-width: 800px;
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
  font-size: 1rem;
`

const RegisterForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
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
  border: 1px solid ${(props) => (props.error ? props.theme.colors.error : props.theme.colors.border)};
  border-radius: 4px;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: ${(props) => (props.error ? props.theme.colors.error : props.theme.colors.primary)};
    box-shadow: 0 0 0 2px ${(props) => (props.error ? "rgba(220, 53, 69, 0.2)" : "rgba(75, 0, 130, 0.2)")};
  }
`

const ErrorText = styled.span`
  color: ${(props) => props.theme.colors.error};
  font-size: 0.8rem;
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

const LoginLink = styled.p`
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

// Success screen styles
const SuccessCard = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 3rem 2rem;
  width: 100%;
  max-width: 500px;
  text-align: center;
`

const SuccessIcon = styled.div`
  width: 80px;
  height: 80px;
  background-color: #e8f5e9;
  color: #2e7d32;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  margin: 0 auto 1.5rem;
`

const SuccessTitle = styled.h2`
  font-size: 1.5rem;
  color: #2e7d32;
  margin-bottom: 1rem;
`

const SuccessMessage = styled.p`
  color: ${(props) => props.theme.colors.text};
  margin-bottom: 2rem;
  line-height: 1.6;
`

const LoginButton = styled.button`
  background-color: ${(props) => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #3b0066;
  }
`

export default Register
