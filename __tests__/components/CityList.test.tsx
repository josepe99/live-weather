import { render, screen } from '@testing-library/react'
import CityList from '@/components/CityList'

describe('CityList Component', () => {
  const defaultCities = [
    'Asunción',
    'Buenos Aires',
    'Bogota',
    'Madrid',
    'Santiago',
    'New York',
    'Lima',
    'Barcelona',
  ]

  describe('rendering', () => {
    it('should render the component title', () => {
      render(<CityList />)
      
      expect(screen.getByText('Quick picks')).toBeInTheDocument()
    })

    it('should render instruction text', () => {
      render(<CityList />)
      
      expect(screen.getByText('Tap to view a city')).toBeInTheDocument()
    })

    it('should render all default cities', () => {
      render(<CityList />)
      
      defaultCities.forEach((city) => {
        expect(screen.getByText(city)).toBeInTheDocument()
      })
    })

    it('should render custom cities when provided', () => {
      const customCities = ['Paris', 'London', 'Tokyo']
      render(<CityList cities={customCities} />)
      
      customCities.forEach((city) => {
        expect(screen.getByText(city)).toBeInTheDocument()
      })

      // Should not render default cities
      expect(screen.queryByText('Bogota')).not.toBeInTheDocument()
    })
  })

  describe('city links', () => {
    it('should render all cities as links', () => {
      render(<CityList />)
      
      defaultCities.forEach((city) => {
        const link = screen.getByRole('link', { name: city })
        expect(link).toBeInTheDocument()
        expect(link).toHaveAttribute('href', `/?city=${encodeURIComponent(city)}`)
      })
    })

    it('should encode city names in URLs correctly', () => {
      const cities = ['New York', 'São Paulo']
      render(<CityList cities={cities} />)
      
      const newYorkLink = screen.getByRole('link', { name: 'New York' })
      expect(newYorkLink).toHaveAttribute('href', '/?city=New%20York')
    })
  })

  describe('active city highlighting', () => {
    it('should highlight active city with exact match', () => {
      render(<CityList activeCity="Bogota" />)
      
      const bogotaLink = screen.getByRole('link', { name: 'Bogota' })
      expect(bogotaLink).toHaveClass('border-blue-300')
      expect(bogotaLink).toHaveClass('from-blue-50')
    })

    it('should be case insensitive for active city', () => {
      render(<CityList activeCity="MADRID" />)
      
      const madridLink = screen.getByRole('link', { name: 'Madrid' })
      expect(madridLink).toHaveClass('border-blue-300')
    })

    it('should not highlight any city when activeCity is not in list', () => {
      render(<CityList activeCity="Paris" />)
      
      const links = screen.getAllByRole('link')
      links.forEach((link) => {
        expect(link).not.toHaveClass('border-blue-300')
      })
    })

    it('should not highlight any city when activeCity is undefined', () => {
      render(<CityList />)
      
      const links = screen.getAllByRole('link')
      links.forEach((link) => {
        expect(link).not.toHaveClass('border-blue-300')
      })
    })
  })

  describe('styling', () => {
    it('should apply hover styles to non-active cities', () => {
      render(<CityList activeCity="Madrid" />)
      
      const bogotaLink = screen.getByRole('link', { name: 'Bogota' })
      expect(bogotaLink).toHaveClass('hover:-translate-y-0.5')
    })

    it('should have grid layout classes', () => {
      const { container } = render(<CityList />)
      
      const grid = container.querySelector('.grid')
      expect(grid).toHaveClass('grid-cols-2')
      expect(grid).toHaveClass('sm:grid-cols-3')
      expect(grid).toHaveClass('lg:grid-cols-4')
    })
  })

  describe('icon rendering', () => {
    it('should render the plus icon', () => {
      const { container } = render(<CityList />)
      
      const icon = container.querySelector('.from-sky-100')
      expect(icon).toHaveTextContent('+')
    })
  })

  describe('edge cases', () => {
    it('should handle empty cities array', () => {
      render(<CityList cities={[]} />)
      
      expect(screen.getByText('Quick picks')).toBeInTheDocument()
      expect(screen.queryByRole('link')).not.toBeInTheDocument()
    })

    it('should handle single city', () => {
      render(<CityList cities={['Lonely City']} />)
      
      expect(screen.getByRole('link', { name: 'Lonely City' })).toBeInTheDocument()
    })
  })
})
