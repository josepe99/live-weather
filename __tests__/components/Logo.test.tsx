import { render } from '@testing-library/react'
import Logo from '@/components/Logo'

describe('Logo Component', () => {
  it('should render SVG element', () => {
    const { container } = render(<Logo />)
    
    const svg = container.querySelector('svg')
    expect(svg).toBeInTheDocument()
  })

  it('should have correct SVG attributes', () => {
    const { container } = render(<Logo />)
    
    const svg = container.querySelector('svg')
    expect(svg).toHaveAttribute('xmlns', 'http://www.w3.org/2000/svg')
    expect(svg).toHaveAttribute('viewBox', '0 0 24 24')
    expect(svg).toHaveAttribute('fill', 'none')
    expect(svg).toHaveAttribute('stroke', 'currentColor')
    expect(svg).toHaveAttribute('stroke-width', '1.5')
  })

  it('should have aria-hidden attribute for accessibility', () => {
    const { container } = render(<Logo />)
    
    const svg = container.querySelector('svg')
    expect(svg).toHaveAttribute('aria-hidden')
  })

  it('should have proper CSS classes', () => {
    const { container } = render(<Logo />)
    
    const svg = container.querySelector('svg')
    expect(svg).toHaveClass('h-7', 'w-7')
  })

  it('should render the sun icon with circle', () => {
    const { container } = render(<Logo />)
    
    const circle = container.querySelector('circle')
    expect(circle).toBeInTheDocument()
    expect(circle).toHaveAttribute('cx', '12')
    expect(circle).toHaveAttribute('cy', '12')
    expect(circle).toHaveAttribute('r', '4')
  })

  it('should render sun rays as lines', () => {
    const { container } = render(<Logo />)
    
    const lines = container.querySelectorAll('line')
    expect(lines.length).toBe(8) // Sun has 8 rays
  })

  it('should match snapshot', () => {
    const { container } = render(<Logo />)
    expect(container.firstChild).toMatchSnapshot()
  })
})
