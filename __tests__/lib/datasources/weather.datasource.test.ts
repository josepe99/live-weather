import WeatherDatasource, { WeatherSnapshot } from '@/lib/datasources/weather.datasource'

// Mock fetch globally
global.fetch = jest.fn()

describe('WeatherDatasource', () => {
  let datasource: WeatherDatasource
  const mockApiKey = 'test-api-key'

  beforeEach(() => {
    jest.clearAllMocks()
    datasource = new WeatherDatasource(mockApiKey)
  })

  describe('constructor', () => {
    it('should throw error if API key is missing', () => {
      expect(() => new WeatherDatasource('')).toThrow(
        'Missing OpenWeather API key. Set OPENWEATHER_API_KEY in your environment.'
      )
    })

    it('should create instance with valid API key', () => {
      expect(() => new WeatherDatasource('valid-key')).not.toThrow()
    })
  })

  describe('getCurrentWeather', () => {
    const mockApiResponse = {
      name: 'Bogota',
      sys: { country: 'CO' },
      main: {
        temp: 15.5,
        humidity: 75,
      },
      weather: [
        {
          description: 'cloudy skies',
        },
      ],
    }

    it('should fetch weather data successfully', async () => {
      const mockFetch = global.fetch as jest.MockedFunction<typeof fetch>
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockApiResponse,
      } as Response)

      const result = await datasource.getCurrentWeather('Bogota')

      expect(result).toEqual({
        city: 'Bogota',
        countryCode: 'CO',
        temperature: 15.5,
        humidity: 75,
        description: 'cloudy skies',
      })
    })

    it('should make request with correct URL parameters', async () => {
      const mockFetch = global.fetch as jest.MockedFunction<typeof fetch>
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockApiResponse,
      } as Response)

      await datasource.getCurrentWeather('Madrid')

      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('https://api.openweathermap.org/data/2.5/weather')
      )
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('q=Madrid')
      )
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('units=metric')
      )
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('appid=test-api-key')
      )
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('lang=es')
      )
    })

    it('should trim city name before making request', async () => {
      const mockFetch = global.fetch as jest.MockedFunction<typeof fetch>
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockApiResponse,
      } as Response)

      await datasource.getCurrentWeather('  Madrid  ')

      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('q=Madrid')
      )
    })

    it('should throw error for empty city name', async () => {
      await expect(datasource.getCurrentWeather('')).rejects.toThrow(
        'City name is required.'
      )
    })

    it('should throw error for whitespace-only city name', async () => {
      await expect(datasource.getCurrentWeather('   ')).rejects.toThrow(
        'City name is required.'
      )
    })

    it('should handle 404 not found error', async () => {
      const mockFetch = global.fetch as jest.MockedFunction<typeof fetch>
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
      } as Response)

      await expect(datasource.getCurrentWeather('InvalidCity')).rejects.toThrow(
        'City not found. Please check the name and try again.'
      )
    })

    it('should handle other HTTP errors', async () => {
      const mockFetch = global.fetch as jest.MockedFunction<typeof fetch>
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
      } as Response)

      await expect(datasource.getCurrentWeather('TestCity')).rejects.toThrow(
        'Unable to fetch weather data. Please try again later.'
      )
    })

    it('should handle missing weather description', async () => {
      const responseWithoutDescription = {
        ...mockApiResponse,
        weather: [{}],
      }

      const mockFetch = global.fetch as jest.MockedFunction<typeof fetch>
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => responseWithoutDescription,
      } as Response)

      const result = await datasource.getCurrentWeather('TestCity')

      expect(result.description).toBe('No description available')
    })

    it('should handle missing weather array', async () => {
      const responseWithoutWeather = {
        ...mockApiResponse,
        weather: undefined,
      }

      const mockFetch = global.fetch as jest.MockedFunction<typeof fetch>
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => responseWithoutWeather,
      } as Response)

      const result = await datasource.getCurrentWeather('TestCity')

      expect(result.description).toBe('No description available')
    })

    it('should handle missing country code', async () => {
      const responseWithoutCountry = {
        ...mockApiResponse,
        sys: {},
      }

      const mockFetch = global.fetch as jest.MockedFunction<typeof fetch>
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => responseWithoutCountry,
      } as Response)

      const result = await datasource.getCurrentWeather('TestCity')

      expect(result.countryCode).toBeUndefined()
    })

    it('should handle cities with special characters', async () => {
      const mockFetch = global.fetch as jest.MockedFunction<typeof fetch>
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ ...mockApiResponse, name: 'São Paulo' }),
      } as Response)

      const result = await datasource.getCurrentWeather('São Paulo')

      expect(result.city).toBe('São Paulo')
      // URLSearchParams encodes spaces as + not %20
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('S%C3%A3o+Paulo')
      )
    })

    it('should handle network errors', async () => {
      const mockFetch = global.fetch as jest.MockedFunction<typeof fetch>
      mockFetch.mockRejectedValueOnce(new Error('Network error'))

      await expect(datasource.getCurrentWeather('TestCity')).rejects.toThrow('Network error')
    })
  })

  describe('data mapping', () => {
    it('should correctly map API response to WeatherSnapshot', async () => {
      const apiResponse = {
        name: 'Madrid',
        sys: { country: 'ES' },
        main: {
          temp: 22.3,
          humidity: 65,
        },
        weather: [
          {
            description: 'clear sky',
          },
        ],
      }

      const mockFetch = global.fetch as jest.MockedFunction<typeof fetch>
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => apiResponse,
      } as Response)

      const result: WeatherSnapshot = await datasource.getCurrentWeather('Madrid')

      expect(result).toMatchObject({
        city: 'Madrid',
        countryCode: 'ES',
        temperature: 22.3,
        humidity: 65,
        description: 'clear sky',
      })
    })
  })
})
