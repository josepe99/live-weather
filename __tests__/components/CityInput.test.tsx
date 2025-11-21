import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CityInput from '@/components/CityInput'

describe('CityInput Component', () => {
  describe('rendering', () => {
    it('should render the input field', () => {
      render(<CityInput />)
      
      const input = screen.getByPlaceholderText(/Search city/i)
      expect(input).toBeInTheDocument()
    })

    it('should render the submit button', () => {
      render(<CityInput />)
      
      const button = screen.getByRole('button', { name: /Get weather/i })
      expect(button).toBeInTheDocument()
    })

    it('should have a form with GET method', () => {
      const { container } = render(<CityInput />)
      
      const form = container.querySelector('form')
      expect(form).toHaveAttribute('method', 'get')
      expect(form).toHaveAttribute('action', '/')
    })

    it('should render with default value when provided', () => {
      render(<CityInput defaultValue="Madrid" />)
      
      const input = screen.getByDisplayValue('Madrid')
      expect(input).toBeInTheDocument()
    })

    it('should render with empty value when no default provided', () => {
      render(<CityInput />)
      
      const input = screen.getByPlaceholderText(/Search city/i) as HTMLInputElement
      expect(input.value).toBe('')
    })
  })

  describe('accessibility', () => {
    it('should have a label for the input', () => {
      render(<CityInput />)
      
      const input = screen.getByLabelText(/Search for a city/i)
      expect(input).toBeInTheDocument()
    })

    it('should have sr-only label for screen readers', () => {
      const { container } = render(<CityInput />)
      
      const label = container.querySelector('label')
      expect(label).toHaveClass('sr-only')
    })

    it('should have proper input attributes', () => {
      render(<CityInput />)
      
      const input = screen.getByRole('textbox')
      expect(input).toHaveAttribute('name', 'city')
      expect(input).toHaveAttribute('id', 'city')
      expect(input).toHaveAttribute('autoComplete', 'off')
    })
  })

  describe('user interactions', () => {
    it('should allow typing in the input', async () => {
      const user = userEvent.setup()
      render(<CityInput />)
      
      const input = screen.getByPlaceholderText(/Search city/i) as HTMLInputElement
      await user.type(input, 'Bogota')
      
      expect(input.value).toBe('Bogota')
    })

    it('should clear input value', async () => {
      const user = userEvent.setup()
      render(<CityInput defaultValue="Madrid" />)
      
      const input = screen.getByDisplayValue('Madrid') as HTMLInputElement
      await user.clear(input)
      
      expect(input.value).toBe('')
    })

    it('should handle special characters', async () => {
      const user = userEvent.setup()
      render(<CityInput />)
      
      const input = screen.getByPlaceholderText(/Search city/i) as HTMLInputElement
      await user.type(input, 'São Paulo')
      
      expect(input.value).toBe('São Paulo')
    })
  })

  describe('form behavior', () => {
    it('should have city input name for form submission', () => {
      render(<CityInput />)
      
      const input = screen.getByPlaceholderText(/Search city/i)
      expect(input).toHaveAttribute('name', 'city')
    })
  })
})
