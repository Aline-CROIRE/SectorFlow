"use client"

import { useState } from "react"
import styled from "styled-components"
import { Plus, Search, ArrowDown, ArrowUp, Edit, Trash2, BarChart2 } from "react-feather"
import { useSector } from "../../contexts/SectorContexts"
import { getThemeForSector } from "../../styles/themes"

const RetailInventory = () => {
  const { sector } = useSector()
  const sectorColor = getThemeForSector(sector).colors.accent

  const [searchTerm, setSearchTerm] = useState("")
  const [sortField, setSortField] = useState("name")
  const [sortDirection, setSortDirection] = useState("asc")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [showAddModal, setShowAddModal] = useState(false)

  // Mock inventory data for retail
  const inventoryData = [
    {
      id: 1,
      name: "Smartphone X",
      category: "Electronics",
      quantity: 25,
      price: 100000,
      cost: 80000,
      barcode: "BC-12345",
      supplier: "TechWorld Ltd",
      lastUpdated: "2023-05-15",
    },
    {
      id: 2,
      name: "Designer T-Shirt",
      category: "Clothing",
      quantity: 50,
      price: 25000,
      cost: 15000,
      barcode: "BC-23456",
      supplier: "Fashion Hub",
      lastUpdated: "2023-05-20",
    },
    {
      id: 3,
      name: "Bluetooth Headphones",
      category: "Electronics",
      quantity: 15,
      price: 50000,
      cost: 35000,
      barcode: "BC-34567",
      supplier: "TechWorld Ltd",
      lastUpdated: "2023-05-18",
    },
    {
      id: 4,
      name: "Kitchen Blender",
      category: "Home & Kitchen",
      quantity: 10,
      price: 30000,
      cost: 20000,
      barcode: "BC-45678",
      supplier: "HomeGoods Inc",
      lastUpdated: "2023-05-10",
    },
    {
      id: 5,
      name: "Organic Coffee",
      category: "Food & Beverages",
      quantity: 30,
      price: 15000,
      cost: 8000,
      barcode: "BC-56789",
      supplier: "Organic Farms",
      lastUpdated: "2023-05-22",
    },
    {
      id: 6,
      name: "Face Moisturizer",
      category: "Beauty & Health",
      quantity: 8,
      price: 20000,
      cost: 12000,
      barcode: "BC-67890",
      supplier: "Beauty Essentials",
      lastUpdated: "2023-05-05",
    },
    {
      id: 7,
      name: "Wireless Mouse",
      category: "Electronics",
      quantity: 5,
      price: 18000,
      cost: 10000,
      barcode: "BC-78901",
      supplier: "TechWorld Ltd",
      lastUpdated: "2023-05-12",
    },
  ]

  // Get unique categories for filter
  const categories = ["all", ...new Set(inventoryData.map((item) => item.category))]

  // Filter and sort inventory data
  const filteredAndSortedData = inventoryData
    .filter((item) => {
      // Filter by search term
      const matchesSearch =
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.supplier.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.barcode.toLowerCase().includes(searchTerm.toLowerCase())

      // Filter by category
      const matchesCategory = selectedCategory === "all" || item.category === selectedCategory

      return matchesSearch && matchesCategory
    })
    .sort((a, b) => {
      const fieldA = a[sortField]
      const fieldB = b[sortField]

      if (fieldA < fieldB) return sortDirection === "asc" ? -1 : 1
      if (fieldA > fieldB) return sortDirection === "asc" ? 1 : -1
      return 0
    })

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  return (
    <Container>
      <Header>
        <Title>Inventory Management</Title>
        <AddButton onClick={() => setShowAddModal(true)}>
          <Plus size={16} />
          <span>Add Product</span>
        </AddButton>
      </Header>

      <ToolBar>
        <SearchContainer>
          <SearchIcon>
            <Search size={18} />
          </SearchIcon>
          <SearchInput
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchContainer>

        <FilterContainer>
          <FilterLabel>Category:</FilterLabel>
          <FilterSelect value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category === "all" ? "All Categories" : category}
              </option>
            ))}
          </FilterSelect>
        </FilterContainer>
      </ToolBar>

      <StatsBar>
        <StatItem>
          <StatValue>{inventoryData.length}</StatValue>
          <StatLabel>Total Products</StatLabel>
        </StatItem>
        <StatItem>
          <StatValue>{inventoryData.reduce((sum, item) => sum + item.quantity, 0)}</StatValue>
          <StatLabel>Total Units</StatLabel>
        </StatItem>
        <StatItem>
          <StatValue>
            RWF {inventoryData.reduce((sum, item) => sum + item.price * item.quantity, 0).toLocaleString()}
          </StatValue>
          <StatLabel>Inventory Value</StatLabel>
        </StatItem>
        <StatItem>
          <StatValue>{inventoryData.filter((item) => item.quantity <= 10).length}</StatValue>
          <StatLabel>Low Stock Items</StatLabel>
        </StatItem>
      </StatsBar>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeader onClick={() => handleSort("name")}>
                Product Name
                {sortField === "name" && (sortDirection === "asc" ? <ArrowUp size={14} /> : <ArrowDown size={14} />)}
              </TableHeader>
              <TableHeader onClick={() => handleSort("category")}>
                Category
                {sortField === "category" &&
                  (sortDirection === "asc" ? <ArrowUp size={14} /> : <ArrowDown size={14} />)}
              </TableHeader>
              <TableHeader onClick={() => handleSort("quantity")}>
                Quantity
                {sortField === "quantity" &&
                  (sortDirection === "asc" ? <ArrowUp size={14} /> : <ArrowDown size={14} />)}
              </TableHeader>
              <TableHeader onClick={() => handleSort("price")}>
                Price (RWF)
                {sortField === "price" && (sortDirection === "asc" ? <ArrowUp size={14} /> : <ArrowDown size={14} />)}
              </TableHeader>
              <TableHeader onClick={() => handleSort("barcode")}>
                Barcode
                {sortField === "barcode" && (sortDirection === "asc" ? <ArrowUp size={14} /> : <ArrowDown size={14} />)}
              </TableHeader>
              <TableHeader onClick={() => handleSort("supplier")}>
                Supplier
                {sortField === "supplier" &&
                  (sortDirection === "asc" ? <ArrowUp size={14} /> : <ArrowDown size={14} />)}
              </TableHeader>
              <TableHeader>Actions</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredAndSortedData.map((item) => (
              <TableRow key={item.id} lowStock={item.quantity <= 10}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell>
                  <QuantityDisplay lowStock={item.quantity <= 10}>
                    {item.quantity}
                    {item.quantity <= 10 && <LowStockIndicator>Low Stock</LowStockIndicator>}
                  </QuantityDisplay>
                </TableCell>
                <TableCell>RWF {item.price.toLocaleString()}</TableCell>
                <TableCell>{item.barcode}</TableCell>
                <TableCell>{item.supplier}</TableCell>
                <TableCell>
                  <ActionButtons>
                    <ActionButton title="Edit">
                      <Edit size={16} />
                    </ActionButton>
                    <ActionButton title="Delete">
                      <Trash2 size={16} />
                    </ActionButton>
                    <ActionButton title="View Stats">
                      <BarChart2 size={16} />
                    </ActionButton>
                  </ActionButtons>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {filteredAndSortedData.length === 0 && (
        <EmptyState>
          <EmptyStateText>No products found matching your search criteria.</EmptyStateText>
        </EmptyState>
      )}
    </Container>
  )
}

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`

const Title = styled.h1`
  font-size: 1.75rem;
`

const AddButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: ${(props) => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #3b0066;
  }
`

const ToolBar = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`

const SearchContainer = styled.div`
  position: relative;
  flex: 1;
  min-width: 200px;
`

const SearchIcon = styled.div`
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: ${(props) => props.theme.colors.textLight};
`

const SearchInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  padding-left: 2.5rem;
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 4px;
  font-size: 0.9rem;
  
  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.colors.primary};
    box-shadow: 0 0 0 2px rgba(75, 0, 130, 0.2);
  }
`

const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

const FilterLabel = styled.label`
  font-size: 0.9rem;
  color: ${(props) => props.theme.colors.textLight};
`

const FilterSelect = styled.select`
  padding: 0.75rem;
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 4px;
  font-size: 0.9rem;
  background-color: white;
  
  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.colors.primary};
    box-shadow: 0 0 0 2px rgba(75, 0, 130, 0.2);
  }
`

const StatsBar = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
`

const StatItem = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  padding: 1rem;
  text-align: center;
`

const StatValue = styled.div`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
`

const StatLabel = styled.div`
  color: ${(props) => props.theme.colors.textLight};
  font-size: 0.8rem;
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
  
  ${(props) =>
    props.lowStock &&
    `
    background-color: #fff8e1 !important;
  `}
`

const TableHeader = styled.th`
  padding: 1rem;
  text-align: left;
  font-weight: 600;
  font-size: 0.9rem;
  color: ${(props) => props.theme.colors.textLight};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  
  &:hover {
    color: ${(props) => props.theme.colors.primary};
  }
`

const TableCell = styled.td`
  padding: 1rem;
  font-size: 0.9rem;
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
`

const QuantityDisplay = styled.div`
  display: flex;
  flex-direction: column;
  
  ${(props) =>
    props.lowStock &&
    `
    color: #f57c00;
    font-weight: 500;
  `}
`

const LowStockIndicator = styled.span`
  font-size: 0.7rem;
  color: #f57c00;
  background-color: #fff3e0;
  padding: 0.1rem 0.3rem;
  border-radius: 4px;
  margin-top: 0.25rem;
  display: inline-block;
  width: fit-content;
`

const ActionButtons = styled.div`
  display: flex;
  gap: 0.5rem;
`

const ActionButton = styled.button`
  background-color: transparent;
  border: none;
  color: ${(props) => props.theme.colors.textLight};
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 4px;
  transition: all 0.2s;
  
  &:hover {
    background-color: ${(props) => props.theme.colors.background};
    color: ${(props) => props.theme.colors.primary};
  }
`

const EmptyState = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  padding: 3rem;
  text-align: center;
  margin-top: 1rem;
`

const EmptyStateText = styled.p`
  color: ${(props) => props.theme.colors.textLight};
  font-size: 1rem;
`

export default RetailInventory
