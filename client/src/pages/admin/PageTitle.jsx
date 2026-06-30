/* eslint-disable react/prop-types */

const PageTitle = ({ title, description, children }) => {
  return (
    <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div className="max-w-3xl">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.28em] text-sky-600">
          Dashboard section
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
          {title}
        </h1>

        {description && (
          <p className="mt-3 text-sm leading-6 text-slate-500 sm:text-base">
            {description}
          </p>
        )}
      </div>

      {children}
    </div>
  );
};

export default PageTitle;