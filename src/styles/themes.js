// Base theme with common colors
const baseTheme = {
    name: "base",
    colors: {
      primary: "#4B0082", // Indigo (brand color)
      secondary: "#6C757D",
      accent: "#4B0082", // Will be overridden by sector themes
      background: "#F8F9FA",
      cardBackground: "#FFFFFF",
      text: "#2D2D2D", // Dark Gray
      textLight: "#6C757D",
      border: "#DEE2E6",
      success: "#28A745",
      warning: "#FFC107",
      error: "#DC3545",
    },
  }
  
  // Sector-specific themes
  const retailTheme = {
    ...baseTheme,
    name: "retail",
    colors: {
      ...baseTheme.colors,
      accent: "#2ecc71", // Green
    },
  }
  
  const restaurantTheme = {
    ...baseTheme,
    name: "restaurant",
    colors: {
      ...baseTheme.colors,
      accent: "#e74c3c", // Red
    },
  }
  
  const pharmacyTheme = {
    ...baseTheme,
    name: "pharmacy",
    colors: {
      ...baseTheme.colors,
      accent: "#1abc9c", // Teal
    },
  }
  
  const hotelTheme = {
    ...baseTheme,
    name: "hotel",
    colors: {
      ...baseTheme.colors,
      accent: "#2980b9", // Blue
    },
  }
  
  const agribusinessTheme = {
    ...baseTheme,
    name: "agribusiness",
    colors: {
      ...baseTheme.colors,
      accent: "#3D9970", // Olive
    },
  }
  
  const constructionTheme = {
    ...baseTheme,
    name: "construction",
    colors: {
      ...baseTheme.colors,
      accent: "#e67e22", // Orange
    },
  }
  
  // Function to get theme based on sector
  export const getThemeForSector = (sector) => {
    switch (sector) {
      case "retail":
        return retailTheme
      case "restaurant":
        return restaurantTheme
      case "pharmacy":
        return pharmacyTheme
      case "hotel":
        return hotelTheme
      case "agribusiness":
        return agribusinessTheme
      case "construction":
        return constructionTheme
      default:
        return baseTheme
    }
  }
  