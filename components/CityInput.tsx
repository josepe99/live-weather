"use client";

import { getWeatherByLocationAction } from "@/lib/actions/weather.actions";
import { useRouter } from "next/navigation";
import { useState } from "react";

type CityInputProps = {
  defaultValue?: string;
};

export default function CityInput({ defaultValue = "" }: CityInputProps) {
  const router = useRouter();
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);

  const handleUseLocation = async () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    setIsLoadingLocation(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const weatherResponse = await getWeatherByLocationAction(
            latitude,
            longitude
          );

          if (weatherResponse.data?.city) {
            router.push(`/?city=${encodeURIComponent(weatherResponse.data.city)}`);
          } else if (weatherResponse.error) {
            alert(weatherResponse.error);
          }
        } finally {
          setIsLoadingLocation(false);
        }
      },
      (err) => {
        console.log("Location not available:", err.message);
        setIsLoadingLocation(false);
        alert("We could not use your location. Try searching by city name instead.");
      }
    );
  };

  return (
    <div className="flex flex-col gap-3">
      <form
        action="/"
        method="get"
        className="w-full rounded-3xl bg-white/60 p-1 shadow-xl ring-1 ring-white/50 backdrop-blur"
      >
        <label htmlFor="city" className="sr-only">
          Search for a city
        </label>
        <div className="flex flex-wrap items-center gap-3 rounded-[26px] bg-white/80 px-4 py-2.5 shadow-inner ring-1 ring-zinc-200">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-200 to-orange-300 text-zinc-900 shadow-sm ring-1 ring-amber-100">
            <svg
              aria-hidden
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-4.35-4.35M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16Z"
              />
            </svg>
          </div>
          <input
            id="city"
            name="city"
            autoComplete="off"
            placeholder="Search city, e.g. Bogota"
            defaultValue={defaultValue}
            className="min-w-0 flex-1 bg-transparent text-lg font-medium text-zinc-900 placeholder:text-zinc-400 focus:outline-none sm:min-w-[240px]"
          />
          <button
            type="submit"
            className="w-full flex-shrink-0 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:from-sky-600 hover:to-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 sm:w-auto"
          >
            Get weather
          </button>
        </div>
      </form>
      
      <button
        type="button"
        onClick={handleUseLocation}
        disabled={isLoadingLocation}
        className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:from-emerald-600 hover:to-teal-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-5 w-5"
        >
          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
        {isLoadingLocation ? "Getting location..." : "Use my location"}
      </button>
    </div>
  );
}
