"use client"

import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import { useSector } from "../contexts/SectorContexts"
import { Pill, Hotel, Leaf, Hammer } from 'lucide-react';
import { Coffee, ShoppingBag } from 'lucide-react';


const SectorSelection = () => {
  const navigate = useNavigate()
  const { setSector, sectorFeatures } = useSector()

  const sectorOptions = [
    {
      id: "retail",
      name: "Retail / Shop",
      description: "For general stores, supermarkets, and specialty shops",
      icon: <ShoppingBag size={24} />,
      color: "#2ecc71",
    },
    {
      id: "restaurant",
      name: "Restaurant / Café",
      description: "For eateries, cafés, and food service businesses",
      icon: <Coffee size={24} />,
      color: "#e74c3c",
    },
    {
      id: "pharmacy",
      name: "Pharmacy",
      description: "For pharmacies and medical supply stores",
      icon: <Pill size={24} />,
      color: "#1abc9c",
    },
    {
      id: "hotel",
      name: "Hotel / Accommodation",
      description: "For hotels, guest houses, and rental properties",
      icon: <Hotel size={24} />,
      color: "#2980b9",
    },
    {
      id: "agribusiness",
      name: "Agribusiness / Farm",
      description: "For farms, agricultural suppliers, and processors",
      icon: <Leaf size={24} />,
      color: "#3D9970",
    },
    {
      id: "construction",
      name: "Construction",
      description: "For construction companies and contractors",
      icon: <Hammer size={24} />,
      color: "#e67e22",
    },
  ]

  const handleSectorSelect = (sectorId) => {
    setSector(sectorId)
    navigate("/dashboard")
  }

  return (
    <Container>
      <Header>
        <Title>Select Your Business Sector</Title>
        <Subtitle>SectorFlow will customize features and interface based on your selection</Subtitle>
      </Header>

      <SectorsGrid>
        {sectorOptions.map((sector) => (
          <SectorCard key={sector.id} onClick={() => handleSectorSelect(sector.id)} accentColor={sector.color}>
            <IconContainer accentColor={sector.color}>{sector.icon}</IconContainer>
            <SectorName>{sector.name}</SectorName>
            <SectorDescription>{sector.description}</SectorDescription>
            <FeaturesList>
              {sectorFeatures[sector.id]?.map((feature, index) => (
                <FeatureItem key={index}>• {feature}</FeatureItem>
              ))}
            </FeaturesList>
          </SectorCard>
        ))}
      </SectorsGrid>
    </Container>
  )
}

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`

const Header = styled.header`
  text-align: center;
  margin-bottom: 3rem;
`

const Title = styled.h1`
  font-size: 2rem;
  color: ${(props) => props.theme.colors.primary};
  margin-bottom: 0.5rem;
`

const Subtitle = styled.p`
  color: ${(props) => props.theme.colors.textLight};
  font-size: 1.1rem;
`

const SectorsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
`

const SectorCard = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  border-top: 4px solid ${(props) => props.accentColor};
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
  }
`

const IconContainer = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: ${(props) => `${props.accentColor}20`};
  color: ${(props) => props.accentColor};
  margin-bottom: 1rem;
`

const SectorName = styled.h2`
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
`

const SectorDescription = styled.p`
  color: ${(props) => props.theme.colors.textLight};
  font-size: 0.9rem;
  margin-bottom: 1rem;
`

const FeaturesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`

const FeatureItem = styled.li`
  font-size: 0.9rem;
  margin-bottom: 0.25rem;
  color: ${(props) => props.theme.colors.text};
`

export default SectorSelection
