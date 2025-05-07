"use client"

import React from "react"
import { Routes, Route, useNavigate, useLocation } from "react-router-dom"
import styled from "styled-components"
import {
  Home,
  Package,
  ShoppingCart,
  Users,
  BarChart2,
  Settings,
  LogOut,
  Menu,
  X,
  Truck,
  Calendar,
} from "react-feather"
import { useAuth } from "../contexts/AuthContexts"
import { useSector } from "../contexts/SectorContexts"
import Inventory from "./Inventory"
import Overview from "./Overview"
import Sales from "./Sales"
import { getThemeForSector } from "../styles/themes"

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false)
  const { logout, user } = useAuth()
  const { sector } = useSector()
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  // Close sidebar when clicking outside on mobile
  const handleContentClick = () => {
    if (sidebarOpen) {
      setSidebarOpen(false)
    }
  }

  // Get sector name for display
  const getSectorName = () => {
    switch (sector) {
      case "retail":
        return "Retail / Shop"
      case "restaurant":
        return "Restaurant / Café"
      case "pharmacy":
        return "Pharmacy"
      case "hotel":
        return "Hotel / Accommodation"
      case "agribusiness":
        return "Agribusiness / Farm"
      case "construction":
        return "Construction"
      default:
        return "Business"
    }
  }

  // Get sector-specific menu items
  const getSectorMenuItems = () => {
    const baseMenuItems = [
      { path: "/dashboard", label: "Overview", icon: <Home size={20} /> },
      { path: "/dashboard/inventory", label: "Inventory", icon: <Package size={20} /> },
      { path: "/dashboard/sales", label: "Sales", icon: <ShoppingCart size={20} /> },
      { path: "/dashboard/customers", label: "Customers", icon: <Users size={20} /> },
      { path: "/dashboard/reports", label: "Reports", icon: <BarChart2 size={20} /> },
    ]

    // Add sector-specific menu items
    switch (sector) {
      case "retail":
        return [...baseMenuItems, { path: "/dashboard/suppliers", label: "Suppliers", icon: <Truck size={20} /> }]
      case "restaurant":
        return [
          ...baseMenuItems,
          { path: "/dashboard/reservations", label: "Reservations", icon: <Calendar size={20} /> },
        ]
      case "hotel":
        return [...baseMenuItems, { path: "/dashboard/bookings", label: "Bookings", icon: <Calendar size={20} /> }]
      default:
        return baseMenuItems
    }
  }

  const menuItems = getSectorMenuItems()

  return (
    <DashboardContainer>
      {/* Mobile menu toggle */}
      <MobileMenuToggle onClick={toggleSidebar}>{sidebarOpen ? <X size={24} /> : <Menu size={24} />}</MobileMenuToggle>

      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen}>
        <SidebarHeader>
          <Logo>SectorFlow</Logo>
          <SectorBadge accentColor={getThemeForSector(sector).colors.accent}>{getSectorName()}</SectorBadge>
        </SidebarHeader>

        <SidebarNav>
          {menuItems.map((item) => (
            <SidebarLink
              key={item.path}
              onClick={() => {
                navigate(item.path)
                if (window.innerWidth < 768) {
                  setSidebarOpen(false)
                }
              }}
              active={location.pathname === item.path}
            >
              {item.icon}
              <span>{item.label}</span>
            </SidebarLink>
          ))}

          <SidebarLink
            onClick={() => navigate("/dashboard/settings")}
            active={location.pathname === "/dashboard/settings"}
          >
            <Settings size={20} />
            <span>Settings</span>
          </SidebarLink>
        </SidebarNav>

        <SidebarFooter>
          <UserInfo>
            <UserAvatar>{user?.name?.charAt(0) || "U"}</UserAvatar>
            <UserDetails>
              <UserName>{user?.name || "User"}</UserName>
              <UserRole>{user?.role || "Owner"}</UserRole>
            </UserDetails>
          </UserInfo>

          <LogoutButton onClick={handleLogout}>
            <LogOut size={18} />
            <span>Logout</span>
          </LogoutButton>
        </SidebarFooter>
      </Sidebar>

      {/* Main content */}
      <MainContent sidebarOpen={sidebarOpen} onClick={handleContentClick}>
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/sales" element={<Sales />} />
          <Route path="/customers" element={<div>Customers page</div>} />
          <Route path="/reports" element={<div>Reports page</div>} />
          <Route path="/suppliers" element={<div>Suppliers page</div>} />
          <Route path="/reservations" element={<div>Reservations page</div>} />
          <Route path="/bookings" element={<div>Bookings page</div>} />
          <Route path="/settings" element={<div>Settings page</div>} />
          <Route path="*" element={<div>Page not found</div>} />
        </Routes>
      </MainContent>
    </DashboardContainer>
  )
}

const DashboardContainer = styled.div`
  display: flex;
  min-height: 100vh;
  position: relative;
`

const Sidebar = styled.aside`
  width: 250px;
  background-color: white;
  border-right: 1px solid ${(props) => props.theme.colors.border};
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 100;
  transition: transform 0.3s ease;
  
  @media (max-width: 768px) {
    transform: translateX(${(props) => (props.isOpen ? "0" : "-100%")});
    width: 80%;
    max-width: 300px;
  }
`

const SidebarHeader = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
`

const Logo = styled.h1`
  color: ${(props) => props.theme.colors.primary};
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
`

const SectorBadge = styled.div`
  display: inline-block;
  background-color: ${(props) => `${props.accentColor}20`};
  color: ${(props) => props.accentColor};
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 500;
`

const SidebarNav = styled.nav`
  flex: 1;
  padding: 1.5rem 0;
  overflow-y: auto;
`

const SidebarLink = styled.a`
  display: flex;
  align-items: center;
  padding: 0.75rem 1.5rem;
  color: ${(props) => (props.active ? props.theme.colors.primary : props.theme.colors.text)};
  background-color: ${(props) => (props.active ? `${props.theme.colors.primary}10` : "transparent")};
  font-weight: ${(props) => (props.active ? "500" : "normal")};
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: ${(props) => props.theme.colors.background};
  }
  
  svg {
    margin-right: 0.75rem;
  }
`

const SidebarFooter = styled.div`
  padding: 1.5rem;
  border-top: 1px solid ${(props) => props.theme.colors.border};
`

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`

const UserAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${(props) => props.theme.colors.primary};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  margin-right: 0.75rem;
`

const UserDetails = styled.div`
  display: flex;
  flex-direction: column;
`

const UserName = styled.div`
  font-weight: 500;
  font-size: 0.9rem;
`

const UserRole = styled.div`
  font-size: 0.8rem;
  color: ${(props) => props.theme.colors.textLight};
`

const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0.75rem;
  background-color: transparent;
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 4px;
  color: ${(props) => props.theme.colors.text};
  font-size: 0.9rem;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: ${(props) => props.theme.colors.background};
  }
  
  svg {
    margin-right: 0.75rem;
  }
`

const MobileMenuToggle = styled.button`
  position: fixed;
  top: 1rem;
  left: 1rem;
  z-index: 200;
  background-color: white;
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 4px;
  padding: 0.5rem;
  display: none;
  
  @media (max-width: 768px) {
    display: flex;
  }
`

const MainContent = styled.main`
  flex: 1;
  padding: 2rem;
  margin-left: 250px;
  
  @media (max-width: 768px) {
    margin-left: 0;
    padding-top: 4rem;
    opacity: ${(props) => (props.sidebarOpen ? "0.5" : "1")};
    transition: opacity 0.3s ease;
  }
`

export default Dashboard
