import WeatherDatasource, { WeatherSnapshot } from "../datasources/weather.datasource";

export type WeatherResponse = {
  data?: WeatherSnapshot;
  error?: string;
};

export default class WeatherController {
  constructor(private readonly datasource = new WeatherDatasource()) {}

  async getWeatherForCity(city: string): Promise<WeatherResponse> {
    try {
      const data = await this.datasource.getCurrentWeather(city);
      return { data };
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Unexpected error fetching weather data.";

      return { error: message };
    }
  }
}
