import { OPENWEATHER_API_KEY } from "@/settings";

export type WeatherSnapshot = {
  city: string;
  countryCode?: string;
  temperature: number;
  humidity: number;
  description: string;
};

class WeatherDatasource {
  private readonly apiKey: string;
  private readonly baseUrl = "https://api.openweathermap.org/data/2.5/weather";

  constructor(apiKey = OPENWEATHER_API_KEY) {
    if (!apiKey) {
      throw new Error(
        "Missing OpenWeather API key. Set OPENWEATHER_API_KEY in your environment."
      );
    }

    this.apiKey = apiKey;
  }

  async getCurrentWeather(city: string): Promise<WeatherSnapshot> {
    const trimmedCity = city.trim();

    if (!trimmedCity) {
      throw new Error("City name is required.");
    }

    const query = new URLSearchParams({
      q: trimmedCity,
      units: "metric",
      appid: this.apiKey,
      lang: "es",
    });

    const response = await fetch(`${this.baseUrl}?${query.toString()}`);

    if (!response.ok) {
      const message =
        response.status === 404
          ? "City not found. Please check the name and try again."
          : "Unable to fetch weather data. Please try again later.";

      throw new Error(message);
    }

    const payload = await response.json();
    const weatherDetails = payload.weather?.[0];

    return {
      city: payload.name,
      countryCode: payload.sys?.country,
      temperature: payload.main?.temp,
      humidity: payload.main?.humidity,
      description: weatherDetails?.description ?? "No description available",
    };
  }
}

export default WeatherDatasource;
