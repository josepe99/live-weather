import WeatherController from '@/lib/controllers/weather.controller'
import WeatherDatasource, { WeatherSnapshot } from '@/lib/datasources/weather.datasource'

// Mock the WeatherDatasource
jest.mock('@/lib/datasources/weather.datasource')

describe('WeatherController', () => {
  let controller: WeatherController
  let mockDatasource: jest.Mocked<WeatherDatasource>

  beforeEach(() => {
    jest.clearAllMocks()
    mockDatasource = new WeatherDatasource() as jest.Mocked<WeatherDatasource>
    controller = new WeatherController(mockDatasource)
  })

  describe('getWeatherForCity', () => {
    const mockWeatherData: WeatherSnapshot = {
      city: 'Bogota',
      countryCode: 'CO',
      temperature: 15.5,
      humidity: 75,
      description: 'cloudy skies',
    }

    it('should return weather data successfully', async () => {
      mockDatasource.getCurrentWeather = jest.fn().mockResolvedValue(mockWeatherData)

      const result = await controller.getWeatherForCity('Bogota')

      expect(mockDatasource.getCurrentWeather).toHaveBeenCalledWith('Bogota')
      expect(result).toEqual({ data: mockWeatherData })
    })

    it('should handle datasource errors gracefully', async () => {
      const errorMessage = 'City not found. Please check the name and try again.'
      mockDatasource.getCurrentWeather = jest.fn().mockRejectedValue(new Error(errorMessage))

      const result = await controller.getWeatherForCity('InvalidCity')

      expect(result).toEqual({ error: errorMessage })
      expect(result.data).toBeUndefined()
    })

    it('should handle generic errors', async () => {
      mockDatasource.getCurrentWeather = jest.fn().mockRejectedValue('Unknown error')

      const result = await controller.getWeatherForCity('TestCity')

      expect(result).toEqual({ error: 'Unexpected error fetching weather data.' })
    })

    it('should handle null error', async () => {
      mockDatasource.getCurrentWeather = jest.fn().mockRejectedValue(null)

      const result = await controller.getWeatherForCity('TestCity')

      expect(result).toEqual({ error: 'Unexpected error fetching weather data.' })
    })

    it('should pass city name to datasource', async () => {
      mockDatasource.getCurrentWeather = jest.fn().mockResolvedValue(mockWeatherData)

      await controller.getWeatherForCity('Madrid')

      expect(mockDatasource.getCurrentWeather).toHaveBeenCalledWith('Madrid')
      expect(mockDatasource.getCurrentWeather).toHaveBeenCalledTimes(1)
    })

    it('should handle cities with special characters', async () => {
      const saoPauloData = { ...mockWeatherData, city: 'São Paulo' }
      mockDatasource.getCurrentWeather = jest.fn().mockResolvedValue(saoPauloData)

      const result = await controller.getWeatherForCity('São Paulo')

      expect(mockDatasource.getCurrentWeather).toHaveBeenCalledWith('São Paulo')
      expect(result).toEqual({ data: saoPauloData })
    })

    it('should handle cities with spaces', async () => {
      const newYorkData = { ...mockWeatherData, city: 'New York' }
      mockDatasource.getCurrentWeather = jest.fn().mockResolvedValue(newYorkData)

      const result = await controller.getWeatherForCity('New York')

      expect(mockDatasource.getCurrentWeather).toHaveBeenCalledWith('New York')
      expect(result).toEqual({ data: newYorkData })
    })
  })

  describe('error message handling', () => {
    it('should preserve error message from Error object', async () => {
      const customError = new Error('Custom error message')
      mockDatasource.getCurrentWeather = jest.fn().mockRejectedValue(customError)

      const result = await controller.getWeatherForCity('Test')

      expect(result.error).toBe('Custom error message')
    })

    it('should use default message for non-Error objects', async () => {
      mockDatasource.getCurrentWeather = jest.fn().mockRejectedValue({ someError: 'value' })

      const result = await controller.getWeatherForCity('Test')

      expect(result.error).toBe('Unexpected error fetching weather data.')
    })
  })
})
