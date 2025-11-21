import { render, screen } from '@testing-library/react'
import Weather from '@/components/Weather'
import type { WeatherSnapshot } from '@/lib/datasources/weather.datasource'

describe('Weather Component', () => {
  const mockWeatherData: WeatherSnapshot = {
    city: 'Bogota',
    countryCode: 'CO',
    temperature: 15.5,
    humidity: 75,
    description: 'cloudy skies',
  }

  describe('when no data is provided', () => {
    it('should render the default message without data', () => {
      render(<Weather />)
      
      expect(screen.getByText('Live weather')).toBeInTheDocument()
      expect(screen.getByText(/Type a city to see real-time conditions/i)).toBeInTheDocument()
    })

    it('should display last requested city when provided', () => {
      render(<Weather requestedCity="Madrid" />)
      
      expect(screen.getByText('Last requested: Madrid')).toBeInTheDocument()
    })

    it('should not display last requested city when not provided', () => {
      render(<Weather />)
      
      expect(screen.queryByText(/Last requested:/)).not.toBeInTheDocument()
    })
  })

  describe('when error occurs', () => {
    it('should render error message', () => {
      const errorMessage = 'City not found'
      render(<Weather error={errorMessage} requestedCity="InvalidCity" />)
      
      expect(screen.getByText('We could not fetch that city.')).toBeInTheDocument()
      expect(screen.getByText(errorMessage)).toBeInTheDocument()
    })

    it('should have error styling', () => {
      render(<Weather error="Test error" />)
      
      const errorSection = screen.getByText('We could not fetch that city.').closest('section')
      expect(errorSection).toHaveClass('bg-red-50/70')
    })
  })

  describe('when data is provided', () => {
    it('should render city name', () => {
      render(<Weather data={mockWeatherData} />)
      
      expect(screen.getByText('Bogota')).toBeInTheDocument()
    })

    it('should render country code when provided', () => {
      render(<Weather data={mockWeatherData} />)
      
      expect(screen.getByText('/ CO')).toBeInTheDocument()
    })

    it('should render temperature rounded', () => {
      render(<Weather data={mockWeatherData} />)
      
      // Temperature 15.5 should be rounded to 16 (appears multiple times in component)
      const tempElements = screen.getAllByText('16°C')
      expect(tempElements.length).toBeGreaterThan(0)
      expect(tempElements[0]).toBeInTheDocument()
    })

    it('should render humidity', () => {
      render(<Weather data={mockWeatherData} />)
      
      expect(screen.getByText('75%')).toBeInTheDocument()
    })

    it('should render weather description capitalized', () => {
      render(<Weather data={mockWeatherData} />)
      
      expect(screen.getByText('cloudy skies')).toBeInTheDocument()
    })

    it('should display "Updated live" badge', () => {
      render(<Weather data={mockWeatherData} />)
      
      expect(screen.getByText('Updated live')).toBeInTheDocument()
    })

    it('should render without country code if not provided', () => {
      const dataWithoutCountry = { ...mockWeatherData, countryCode: undefined }
      render(<Weather data={dataWithoutCountry} />)
      
      expect(screen.getByText('Bogota')).toBeInTheDocument()
      expect(screen.queryByText(/\//)).not.toBeInTheDocument()
    })
  })

  describe('accessibility', () => {
    it('should have proper semantic structure', () => {
      render(<Weather data={mockWeatherData} />)
      
      const sections = screen.getAllByRole('generic')
      expect(sections.length).toBeGreaterThan(0)
    })

    it('should render current conditions header', () => {
      render(<Weather data={mockWeatherData} />)
      
      expect(screen.getByText('Current conditions')).toBeInTheDocument()
    })
  })
})
