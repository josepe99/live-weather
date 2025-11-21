import { getWeatherAction } from '@/lib/actions/weather.actions'

// Mock fetch globally to intercept API calls
global.fetch = jest.fn()

describe('getWeatherAction', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('with FormData input', () => {
    it('should extract city from FormData and return weather data', async () => {
      const mockApiResponse = {
        name: 'Bogota',
        sys: { country: 'CO' },
        main: { temp: 15, humidity: 75 },
        weather: [{ description: 'cloudy' }],
      }

      const mockFetch = global.fetch as jest.MockedFunction<typeof fetch>
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockApiResponse,
      } as Response)

      const formData = new FormData()
      formData.append('city', 'Bogota')

      const result = await getWeatherAction(formData)

      expect(result.data).toBeDefined()
      expect(result.data?.city).toBe('Bogota')
      expect(result.error).toBeUndefined()
    })

    it('should handle empty FormData city value', async () => {
      const formData = new FormData()
      formData.append('city', '')

      const result = await getWeatherAction(formData)

      expect(result).toEqual({ error: 'City name is required.' })
    })

    it('should handle FormData with only whitespace', async () => {
      const formData = new FormData()
      formData.append('city', '   ')

      const result = await getWeatherAction(formData)

      expect(result).toEqual({ error: 'City name is required.' })
    })

    it('should handle FormData without city field', async () => {
      const formData = new FormData()

      const result = await getWeatherAction(formData)

      expect(result).toEqual({ error: 'City name is required.' })
    })
  })

  describe('with string input', () => {
    it('should process string city name and return weather data', async () => {
      const mockApiResponse = {
        name: 'Madrid',
        sys: { country: 'ES' },
        main: { temp: 20, humidity: 60 },
        weather: [{ description: 'sunny' }],
      }

      const mockFetch = global.fetch as jest.MockedFunction<typeof fetch>
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockApiResponse,
      } as Response)

      const result = await getWeatherAction('Madrid')

      expect(result.data).toBeDefined()
      expect(result.data?.city).toBe('Madrid')
      expect(result.error).toBeUndefined()
    })

    it('should return error for empty string', async () => {
      const result = await getWeatherAction('')

      expect(result).toEqual({ error: 'City name is required.' })
    })

    it('should return error for whitespace-only string', async () => {
      const result = await getWeatherAction('   ')

      expect(result).toEqual({ error: 'City name is required.' })
    })

    it('should handle string with special characters', async () => {
      const mockApiResponse = {
        name: 'São Paulo',
        sys: { country: 'BR' },
        main: { temp: 25, humidity: 70 },
        weather: [{ description: 'rainy' }],
      }

      const mockFetch = global.fetch as jest.MockedFunction<typeof fetch>
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockApiResponse,
      } as Response)

      const result = await getWeatherAction('São Paulo')

      expect(result.data).toBeDefined()
      expect(result.data?.city).toBe('São Paulo')
      expect(result.error).toBeUndefined()
    })
  })

  describe('error handling', () => {
    it('should return error when city is not found', async () => {
      const mockFetch = global.fetch as jest.MockedFunction<typeof fetch>
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
      } as Response)

      const result = await getWeatherAction('InvalidCity')

      expect(result.data).toBeUndefined()
      expect(result.error).toBe('City not found. Please check the name and try again.')
    })

    it('should handle API errors', async () => {
      const mockFetch = global.fetch as jest.MockedFunction<typeof fetch>
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
      } as Response)

      const result = await getWeatherAction('TestCity')

      expect(result.data).toBeUndefined()
      expect(result.error).toBe('Unable to fetch weather data. Please try again later.')
    })

    it('should handle network errors', async () => {
      const mockFetch = global.fetch as jest.MockedFunction<typeof fetch>
      mockFetch.mockRejectedValueOnce(new Error('Network error'))

      const result = await getWeatherAction('TestCity')

      expect(result.data).toBeUndefined()
      expect(result.error).toBe('Network error')
    })
  })
})
