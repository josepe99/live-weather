"use server";

import WeatherController, {
  type WeatherResponse,
} from "../controllers/weather.controller";

const controller = new WeatherController();

export async function getWeatherAction(
  input: FormData | string
): Promise<WeatherResponse> {
  const cityValue = input instanceof FormData ? input.get("city") : input;
  const city = typeof cityValue === "string" ? cityValue : "";

  if (!city.trim()) {
    return { error: "City name is required." };
  }

  return controller.getWeatherForCity(city);
}

export async function getWeatherByLocationAction(
  lat: number,
  lon: number
): Promise<WeatherResponse> {
  return controller.getWeatherByCoords(lat, lon);
}
