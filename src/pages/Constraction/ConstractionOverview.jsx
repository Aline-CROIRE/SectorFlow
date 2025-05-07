"use client"

import styled from "styled-components"
import { Tool, DollarSign, Users, AlertTriangle } from "react-feather"
import { useSector } from "../../contexts/SectorContexts"
import { getThemeForSector } from "../../styles/themes"

const ConstructionOverview = () => {
  const { sector } = useSector()
  const sectorColor = getThemeForSector(sector).colors.accent

  // Mock data for construction dashboard
  const stats = [
    { label: "Active Projects", value: "4", icon: <Tool size={24} /> },
    { label: "Total Budget", value: "RWF 12,500,000", icon: <DollarSign size={24} /> },
    { label: "Workers", value: "32", icon: <Users size={24} /> },
    { label: "Low Stock Materials", value: "8", icon: <AlertTriangle size={24} /> },
  ]

  // Mock data for projects
  const projects = [
    {
      id: 1,
      name: "Office Building Renovation",
      client: "ABC Corporation",
      location: "Kigali Central",
      progress: 75,
      startDate: "2023-03-15",
      endDate: "2023-07-30",
    },
    {
      id: 2,
      name: "Residential Complex",
      client: "Kigali Housing Authority",
      location: "Nyarutarama",
      progress: 45,
      startDate: "2023-02-10",
      endDate: "2023-10-20",
    },
    {
      id: 3,
      name: "Shopping Mall Extension",
      client: "Retail Developers Ltd",
      location: "Kimihurura",
      progress: 30,
      startDate: "2023-04-05",
      endDate: "2023-12-15",
    },
    {
      id: 4,
      name: "Hotel Renovation",
      client: "Hospitality Group",
      location: "Kacyiru",
      progress: 10,
      startDate: "2023-05-01",
      endDate: "2023-08-30",
    },
  ]

  return (
    <Container>
      <Header>
        <Title>Construction Dashboard</Title>
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

      <Section>
        <SectionTitle>Active Projects</SectionTitle>
        <ProjectsGrid>
          {projects.map((project) => (
            <ProjectCard key={project.id}>
              <ProjectHeader>
                <ProjectName>{project.name}</ProjectName>
                <ProjectClient>{project.client}</ProjectClient>
              </ProjectHeader>
              <ProjectDetails>
                <ProjectDetail>
                  <DetailLabel>Location:</DetailLabel>
                  <DetailValue>{project.location}</DetailValue>
                </ProjectDetail>
                <ProjectDetail>
                  <DetailLabel>Timeline:</DetailLabel>
                  <DetailValue>
                    {new Date(project.startDate).toLocaleDateString()} -{" "}
                    {new Date(project.endDate).toLocaleDateString()}
                  </DetailValue>
                </ProjectDetail>
                <ProjectProgressContainer>
                  <ProjectProgressLabel>Progress: {project.progress}%</ProjectProgressLabel>
                  <ProjectProgressBar>
                    <ProjectProgressFill progress={project.progress} accentColor={sectorColor} />
                  </ProjectProgressBar>
                </ProjectProgressContainer>
              </ProjectDetails>
            </ProjectCard>
          ))}
        </ProjectsGrid>
      </Section>

      <Section>
        <SectionTitle>Material Inventory Status</SectionTitle>
        <MaterialsTable>
          <thead>
            <tr>
              <TableHeader>Material</TableHeader>
              <TableHeader>Current Stock</TableHeader>
              <TableHeader>Unit</TableHeader>
              <TableHeader>Assigned To</TableHeader>
              <TableHeader>Status</TableHeader>
            </tr>
          </thead>
          <tbody>
            <tr>
              <TableCell>Cement</TableCell>
              <TableCell>120</TableCell>
              <TableCell>Bags</TableCell>
              <TableCell>Office Building Renovation</TableCell>
              <TableCell>
                <StatusBadge status="good">In Stock</StatusBadge>
              </TableCell>
            </tr>
            <tr>
              <TableCell>Steel Rods (12mm)</TableCell>
              <TableCell>85</TableCell>
              <TableCell>Pieces</TableCell>
              <TableCell>Residential Complex</TableCell>
              <TableCell>
                <StatusBadge status="good">In Stock</StatusBadge>
              </TableCell>
            </tr>
            <tr>
              <TableCell>Bricks</TableCell>
              <TableCell>350</TableCell>
              <TableCell>Pieces</TableCell>
              <TableCell>Shopping Mall Extension</TableCell>
              <TableCell>
                <StatusBadge status="low">Low Stock</StatusBadge>
              </TableCell>
            </tr>
            <tr>
              <TableCell>Paint (White)</TableCell>
              <TableCell>8</TableCell>
              <TableCell>Gallons</TableCell>
              <TableCell>Hotel Renovation</TableCell>
              <TableCell>
                <StatusBadge status="low">Low Stock</StatusBadge>
              </TableCell>
            </tr>
            <tr>
              <TableCell>Timber</TableCell>
              <TableCell>0</TableCell>
              <TableCell>Pieces</TableCell>
              <TableCell>Office Building Renovation</TableCell>
              <TableCell>
                <StatusBadge status="out">Out of Stock</StatusBadge>
              </TableCell>
            </tr>
          </tbody>
        </MaterialsTable>
      </Section>

      <Section>
        <SectionTitle>Recent Activities</SectionTitle>
        <ActivityList>
          <ActivityItem>
            <ActivityTime>10:45 AM</ActivityTime>
            <ActivityContent>
              <ActivityTitle>Material Delivery</ActivityTitle>
              <ActivityDescription>50 bags of cement delivered to Office Building Renovation site</ActivityDescription>
            </ActivityContent>
          </ActivityItem>
          <ActivityItem>
            <ActivityTime>09:30 AM</ActivityTime>
            <ActivityContent>
              <ActivityTitle>Worker Assignment</ActivityTitle>
              <ActivityDescription>5 new workers assigned to Residential Complex project</ActivityDescription>
            </ActivityContent>
          </ActivityItem>
          <ActivityItem>
            <ActivityTime>Yesterday</ActivityTime>
            <ActivityContent>
              <ActivityTitle>Low Stock Alert</ActivityTitle>
              <ActivityDescription>Bricks are running low (350 remaining)</ActivityDescription>
            </ActivityContent>
          </ActivityItem>
          <ActivityItem>
            <ActivityTime>Yesterday</ActivityTime>
            <ActivityContent>
              <ActivityTitle>Project Update</ActivityTitle>
              <ActivityDescription>Shopping Mall Extension progress updated to 30%</ActivityDescription>
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

const Section = styled.section`
  margin-bottom: 2rem;
`

const SectionTitle = styled.h2`
  font-size: 1.25rem;
  margin-bottom: 1.5rem;
`

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
`

const ProjectCard = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  overflow: hidden;
`

const ProjectHeader = styled.div`
  padding: 1.5rem;
  background-color: ${(props) => `${props.theme.colors.primary}10`};
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
`

const ProjectName = styled.h3`
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
`

const ProjectClient = styled.div`
  font-size: 0.9rem;
  color: ${(props) => props.theme.colors.textLight};
`

const ProjectDetails = styled.div`
  padding: 1.5rem;
`

const ProjectDetail = styled.div`
  display: flex;
  margin-bottom: 0.75rem;
`

const DetailLabel = styled.div`
  font-weight: 500;
  min-width: 80px;
  font-size: 0.9rem;
`

const DetailValue = styled.div`
  font-size: 0.9rem;
`

const ProjectProgressContainer = styled.div`
  margin-top: 1rem;
`

const ProjectProgressLabel = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
`

const ProjectProgressBar = styled.div`
  height: 8px;
  background-color: ${(props) => props.theme.colors.border};
  border-radius: 4px;
  overflow: hidden;
`

const ProjectProgressFill = styled.div`
  height: 100%;
  width: ${(props) => props.progress}%;
  background-color: ${(props) => props.accentColor};
  border-radius: 4px;
`

const MaterialsTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  overflow: hidden;
`

const TableHeader = styled.th`
  padding: 1rem;
  text-align: left;
  background-color: ${(props) => props.theme.colors.background};
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
  font-weight: 600;
  font-size: 0.9rem;
  color: ${(props) => props.theme.colors.textLight};
`

const TableCell = styled.td`
  padding: 1rem;
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
  font-size: 0.9rem;
`

const StatusBadge = styled.span`
  display: inline-block;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 500;
  
  ${(props) => {
    switch (props.status) {
      case "good":
        return `
          background-color: #e8f5e9;
          color: #2e7d32;
        `
      case "low":
        return `
          background-color: #fff8e1;
          color: #f57c00;
        `
      case "out":
        return `
          background-color: #ffebee;
          color: #c62828;
        `
      default:
        return `
          background-color: #e8f5e9;
          color: #2e7d32;
        `
    }
  }}
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

export default ConstructionOverview
