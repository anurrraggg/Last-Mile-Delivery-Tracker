/* eslint-disable react/prop-types */

const PageTitle = ({ title, description, children }) => {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-3xl">
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl">
          {title}
        </h1>

        {description && (
          <p className="mt-1.5 text-sm leading-relaxed text-zinc-500">
            {description}
          </p>
        )}
      </div>

      {children}
    </div>
  );
};

export default PageTitle;
