import type { WeatherSnapshot } from "@/lib/datasources/weather.datasource";

type WeatherProps = {
  data?: WeatherSnapshot;
  error?: string;
  requestedCity?: string;
};

export default function Weather({ data, error, requestedCity }: WeatherProps) {
  if (error) {
    return (
      <section className="w-full rounded-3xl border border-red-100 bg-red-50/70 px-6 py-5 text-red-800 shadow-inner">
        <p className="text-sm font-semibold">We could not fetch that city.</p>
        <p className="text-sm text-red-700">{error}</p>
      </section>
    );
  }

  if (!data) {
    return (
      <section className="w-full rounded-3xl border border-white/50 bg-white/50 px-6 py-8 text-zinc-700 backdrop-blur">
        <h2 className="text-xl font-semibold text-zinc-900">Live weather</h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-600">
          Type a city to see real-time conditions powered by OpenWeather. Try
          using the quick picks or enter a city name to get started.
        </p>
        {requestedCity ? (
          <p className="mt-4 text-sm text-zinc-500">
            Last requested: {requestedCity}
          </p>
        ) : null}
      </section>
    );
  }

  const { city, countryCode, temperature, humidity, description } = data;

  return (
    <section className="w-full overflow-hidden rounded-3xl border border-white/50 bg-gradient-to-br from-sky-100 via-white to-blue-100 px-5 py-5 shadow-xl ring-1 ring-white/50 sm:px-6 sm:py-6">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-1">
        <div className="min-w-0">
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-zinc-500">
            Current conditions
          </p>
          <h2 className="text-2xl font-bold leading-snug text-slate-900 sm:text-3xl">
            {city}
            {countryCode ? (
              <span className="text-lg font-semibold text-slate-500">
                {" "}
                / {countryCode}
              </span>
            ) : null}
          </h2>
        </div>
        <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-sm font-semibold text-sky-700 shadow-sm ring-1 ring-sky-100">
          <div className="h-2 w-2 rounded-full bg-sky-500" />
          Updated live
        </span>
      </header>

      <div className="mt-6 grid gap-6 md:grid-cols-[1.2fr_0.8fr]">
        <div className="relative overflow-hidden rounded-3xl bg-white/80 p-5 shadow-lg ring-1 ring-white/70 sm:p-6">
          <div className="absolute inset-0 bg-gradient-to-br from-sky-100/80 via-transparent to-blue-200/60" />
          <div className="relative flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0 space-y-1">
              <p className="text-sm font-semibold uppercase tracking-[0.08em] text-slate-600">
                Temperature
              </p>
              <p className="text-5xl font-bold leading-none text-slate-900 sm:text-6xl">
                {`${Math.round(temperature)}\u00b0C`}
              </p>
              <p className="pt-1 text-base font-medium capitalize text-slate-600 sm:pt-2 sm:text-lg">
                {description}
              </p>
            </div>
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-200 to-orange-300 text-amber-900 shadow-inner ring-1 ring-amber-100">
              <svg
                aria-hidden
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="h-10 w-10"
              >
                <circle cx="12" cy="12" r="4.5" />
                <path d="M12 2v2M12 20v2M4 12H2M22 12h-2M5 5l1.5 1.5M17.5 17.5 19 19M5 19l1.5-1.5M17.5 6.5 19 5" />
              </svg>
            </div>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {[
              { label: "Feels like", value: `${Math.round(temperature)}\u00b0C` },
              { label: "Humidity", value: `${humidity}%` },
              { label: "Visibility", value: "-" },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-white/70 bg-white/70 px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm"
              >
                <p className="text-xs uppercase tracking-[0.1em] text-slate-500">
                  {item.label}
                </p>
                <p className="text-lg text-slate-900">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid h-full gap-4 sm:grid-cols-2 md:grid-cols-1">
          <div className="rounded-3xl bg-white/85 p-4 shadow-md ring-1 ring-white/60">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-slate-700">
                City insights
              </p>
              <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold text-sky-700">
                Now
              </span>
            </div>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li>Clean presentation similar to OpenWeather live cards.</li>
              <li>Data fetched on the server for reliable API access.</li>
              <li>Shareable URL: this view is tied to ?city={city}.</li>
            </ul>
          </div>
          <div className="rounded-3xl border border-white/60 bg-gradient-to-br from-slate-900 to-slate-800 p-4 text-white shadow-md">
            <p className="text-xs uppercase tracking-[0.2em] text-blue-200">
              Summary
            </p>
            <p className="mt-3 text-lg font-semibold">
              {city} feels like {Math.round(temperature)}
              {"\u00b0"} with {humidity}% humidity. Perfect to explore the city
              right now.
            </p>
            <p className="mt-2 text-sm text-slate-200">
              Update the search to compare conditions across the world.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
