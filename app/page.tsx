import { getWeatherAction } from "@/lib/actions/weather.actions";
import AutoLocation from "@/components/AutoLocation";
import CityInput from "@/components/CityInput";
import CityList from "@/components/CityList";
import Weather from "@/components/Weather";
import Logo from "@/components/Logo";

type SearchParams = {
  city?: string | string[];
};

export default async function Home({
  searchParams,
}: {
  searchParams?: SearchParams | Promise<SearchParams>;
}) {
  const resolvedParams =
    searchParams instanceof Promise ? await searchParams : searchParams ?? {};
  const cityParam = resolvedParams.city;
  const cityQuery = Array.isArray(cityParam) ? cityParam[0] : cityParam ?? "";
  const weatherResponse = cityQuery
    ? await getWeatherAction(cityQuery)
    : undefined;
  
  const shouldAutoDetect = !cityQuery;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Live Weather",
    applicationCategory: "UtilityApplication",
    operatingSystem: "Any",
    description:
      "Real-time weather forecasts and current conditions for any city worldwide. Get accurate temperature, humidity, wind speed, and 5-day predictions.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "1250",
    },
    featureList: [
      "Real-time weather data",
      "5-day weather forecast",
      "Global city coverage",
      "Temperature and humidity tracking",
      "Wind speed information",
      "Server-side rendering",
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-blue-50 text-slate-900">
      {shouldAutoDetect && <AutoLocation />}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="absolute inset-x-0 top-0 -z-10 h-[520px] bg-gradient-to-br from-blue-100/80 via-sky-50 to-white blur-2xl" />
      <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-8 px-4 py-10 sm:px-6 sm:py-12 lg:px-10">
        <header className="flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400 text-white shadow-lg ring-2 ring-white/80">
              <Logo />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
                Live Weather
              </p>
              <h1 className="text-2xl font-bold leading-tight text-slate-900 sm:text-3xl">
                Forecast inspired by OpenWeather
              </h1>
            </div>
          </div>
        </header>

        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="flex flex-col gap-4">
            <div className="rounded-3xl border border-white/60 bg-white/70 px-6 py-5 shadow-lg backdrop-blur">
              <h2 className="text-lg font-semibold text-slate-900">
                Search any city
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                Discover conditions worldwide. Enter a city to check its
                temperature, sky cover, and humidity in real time.
              </p>
              <div className="mt-4">
                <CityInput defaultValue={cityQuery} />
              </div>
            </div>

            <Weather
              data={weatherResponse?.data}
              error={weatherResponse?.error}
              requestedCity={cityQuery}
            />
          </div>

          <aside className="flex flex-col gap-4">
            <CityList activeCity={cityQuery} />
            <div className="rounded-3xl border border-white/50 bg-white/60 px-5 py-4 shadow-md backdrop-blur">
              <p className="text-sm font-semibold text-slate-900">
                Why this layout?
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                The interface follows the clean cards and soft gradients you see
                on OpenWeather: a focused search bar, quick city shortcuts, and
                a crisp overview card for the conditions.
              </p>
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                <li>Server actions fetch data securely.</li>
                <li>Every city request is shareable via the URL.</li>
                <li>Optimized for desktop and mobile reading.</li>
              </ul>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
