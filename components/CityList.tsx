const defaultCities = [
  "Buenos Aires",
  "Mexico City",
  "Bogota",
  "Madrid",
  "Santiago",
  "New York",
  "Lima",
  "Barcelona",
];

type CityListProps = {
  activeCity?: string;
  cities?: string[];
};

export default function CityList({
  activeCity,
  cities = defaultCities,
}: CityListProps) {
  return (
    <section className="w-full rounded-3xl border border-white/40 bg-white/40 px-5 py-4 backdrop-blur">
      <header className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2 font-semibold text-zinc-900">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-100 to-blue-200 text-blue-700 ring-1 ring-blue-100">
            +
          </span>
          Quick picks
        </div>
        <p className="text-sm text-zinc-500">Tap to view a city</p>
      </header>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {cities.map((city) => {
          const isActive =
            activeCity &&
            activeCity.toLocaleLowerCase() === city.toLocaleLowerCase();

          return (
            <a
              key={city}
              href={`/?city=${encodeURIComponent(city)}`}
              className={`group relative overflow-hidden rounded-2xl border px-4 py-3 text-sm font-semibold transition ${
                isActive
                  ? "border-blue-300 bg-gradient-to-br from-blue-50 to-sky-100 text-blue-800 shadow-inner"
                  : "border-white/65 bg-white/60 text-zinc-700 hover:-translate-y-0.5 hover:border-blue-100 hover:shadow-lg"
              }`}
            >
              <span>{city}</span>
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-blue-100/40 opacity-0 transition group-hover:opacity-100" />
            </a>
          );
        })}
      </div>
    </section>
  );
}
