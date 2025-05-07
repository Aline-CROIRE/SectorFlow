"use client"

import styled from "styled-components"
import { ShoppingBag, DollarSign, Users, AlertTriangle } from "react-feather"
import { useSector } from "../../contexts/SectorContexts"
import { getThemeForSector } from "../../styles/themes"
import SalesChart from "../../components/charts/SalesChart"
import ProductCategoryChart from "../../components/charts/ProductCtegoryChart"
import InventoryStatusChart from "../../components/charts/InventoryStatusChart"

const RetailOverview = () => {
  const { sector } = useSector()
  const sectorColor = getThemeForSector(sector).colors.accent

  // Mock data for retail dashboard
  const stats = [
    { label: "Total Products", value: "1,245", icon: <ShoppingBag size={24} /> },
    { label: "Today's Sales", value: "RWF 456,000", icon: <DollarSign size={24} /> },
    { label: "Customers", value: "89", icon: <Users size={24} /> },
    { label: "Low Stock Items", value: "12", icon: <AlertTriangle size={24} /> },
  ]

  // Mock data for top selling products
  const topSellingProducts = [
    { id: 1, name: "Smartphone X", category: "Electronics", sold: 45, revenue: 4500000 },
    { id: 2, name: "Designer T-Shirt", category: "Clothing", sold: 38, revenue: 950000 },
    { id: 3, name: "Bluetooth Headphones", category: "Electronics", sold: 32, revenue: 1600000 },
    { id: 4, name: "Kitchen Blender", category: "Home & Kitchen", sold: 28, revenue: 840000 },
    { id: 5, name: "Organic Coffee", category: "Food & Beverages", sold: 25, revenue: 375000 },
  ]

  return (
    <Container>
      <Header>
        <Title>Retail Dashboard</Title>
        <DateDisplay>
          {new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
        </DateDisplay>
      </Header>

      <StatsGrid>
        {stats.map((stat, index) => (
          <StatCard key={index} accentColor={sectorColor}>
            <StatIcon>{stat.icon}</StatIcon>
            <StatValue>{stat.value}</StatValue>
            <StatLabel>{stat.label}</StatLabel>
          </StatCard>
        ))}
      </StatsGrid>

      <SalesChart sectorColor={sectorColor} />

      <ChartsGrid>
        <ProductCategoryChart sectorColor={sectorColor} />
        <InventoryStatusChart sectorColor={sectorColor} />
      </ChartsGrid>

      <Section>
        <SectionTitle>Top Selling Products</SectionTitle>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableHeader>Product Name</TableHeader>
                <TableHeader>Category</TableHeader>
                <TableHeader>Units Sold</TableHeader>
                <TableHeader>Revenue</TableHeader>
              </TableRow>
            </TableHead>
            <TableBody>
              {topSellingProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>{product.sold}</TableCell>
                  <TableCell>RWF {product.revenue.toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Section>

      <Section>
        <SectionTitle>Recent Activities</SectionTitle>
        <ActivityList>
          <ActivityItem>
            <ActivityTime>10:45 AM</ActivityTime>
            <ActivityContent>
              <ActivityTitle>New Sale</ActivityTitle>
              <ActivityDescription>Customer purchased 5 items for RWF 125,000</ActivityDescription>
            </ActivityContent>
          </ActivityItem>
          <ActivityItem>
            <ActivityTime>09:30 AM</ActivityTime>
            <ActivityContent>
              <ActivityTitle>Inventory Update</ActivityTitle>
              <ActivityDescription>15 new products added to inventory</ActivityDescription>
            </ActivityContent>
          </ActivityItem>
          <ActivityItem>
            <ActivityTime>Yesterday</ActivityTime>
            <ActivityContent>
              <ActivityTitle>Low Stock Alert</ActivityTitle>
              <ActivityDescription>Smartphone X is running low on stock (5 remaining)</ActivityDescription>
            </ActivityContent>
          </ActivityItem>
          <ActivityItem>
            <ActivityTime>Yesterday</ActivityTime>
            <ActivityContent>
              <ActivityTitle>New Customer</ActivityTitle>
              <ActivityDescription>John Doe registered as a new customer</ActivityDescription>
            </ActivityContent>
          </ActivityItem>
        </ActivityList>
      </Section>
    </Container>
  )
}

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`

const Header = styled.header`
  margin-bottom: 2rem;
`

const Title = styled.h1`
  font-size: 1.75rem;
  margin-bottom: 0.5rem;
`

const DateDisplay = styled.p`
  color: ${(props) => props.theme.colors.textLight};
  font-size: 0.9rem;
`

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`

const StatCard = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  padding: 1.5rem;
  border-left: 4px solid ${(props) => props.accentColor};
`

const StatIcon = styled.div`
  color: ${(props) => props.theme.colors.textLight};
  margin-bottom: 1rem;
`

const StatValue = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
`

const StatLabel = styled.div`
  color: ${(props) => props.theme.colors.textLight};
  font-size: 0.9rem;
`

const ChartsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`

const Section = styled.section`
  margin-bottom: 2rem;
`

const SectionTitle = styled.h2`
  font-size: 1.25rem;
  margin-bottom: 1.5rem;
`

const TableContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  overflow-x: auto;
`

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`

const TableHead = styled.thead`
  background-color: ${(props) => props.theme.colors.background};
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
`

const TableBody = styled.tbody`
  & tr:nth-child(even) {
    background-color: ${(props) => props.theme.colors.background};
  }
`

const TableRow = styled.tr`
  &:hover {
    background-color: ${(props) => `${props.theme.colors.primary}05`};
  }
`

const TableHeader = styled.th`
  padding: 1rem;
  text-align: left;
  font-weight: 600;
  font-size: 0.9rem;
  color: ${(props) => props.theme.colors.textLight};
`

const TableCell = styled.td`
  padding: 1rem;
  font-size: 0.9rem;
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
`

const ActivityList = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`

const ActivityItem = styled.div`
  display: flex;
  padding: 1rem;
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
  
  &:last-child {
    border-bottom: none;
  }
`

const ActivityTime = styled.div`
  min-width: 100px;
  color: ${(props) => props.theme.colors.textLight};
  font-size: 0.9rem;
`

const ActivityContent = styled.div`
  flex: 1;
`

const ActivityTitle = styled.div`
  font-weight: 500;
  margin-bottom: 0.25rem;
`

const ActivityDescription = styled.div`
  color: ${(props) => props.theme.colors.textLight};
  font-size: 0.9rem;
`

export default RetailOverview
