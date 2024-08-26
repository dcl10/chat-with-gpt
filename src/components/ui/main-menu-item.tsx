function MainMenuItem({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div className="text-center content-center">
      <button className="group rounded-lg px-5 py-4 transition-colors content-center hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 border border-transparent wx-64">
        <h2 className="mb-3 text-2xl font-semibold">
          {`${title} `}
          <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
            -&gt;
          </span>
        </h2>
        <p className="m-0 text-sm opacity-50">{subtitle}</p>
      </button>
    </div>
  );
}

export default MainMenuItem;
