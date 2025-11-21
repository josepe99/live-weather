type CityInputProps = {
  defaultValue?: string;
};

export default function CityInput({ defaultValue = "" }: CityInputProps) {
  return (
    <form
      action="/"
      method="get"
      className="w-full rounded-3xl bg-white/60 p-1 shadow-xl ring-1 ring-white/50 backdrop-blur"
    >
      <label htmlFor="city" className="sr-only">
        Search for a city
      </label>
      <div className="flex items-center gap-3 rounded-[26px] bg-white/80 px-4 py-2.5 shadow-inner ring-1 ring-zinc-200">
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
          className="flex-1 bg-transparent text-lg font-medium text-zinc-900 placeholder:text-zinc-400 focus:outline-none"
        />
        <button
          type="submit"
          className="rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:from-sky-600 hover:to-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
        >
          Get weather
        </button>
      </div>
    </form>
  );
}
