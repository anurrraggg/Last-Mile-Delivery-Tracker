/* eslint-disable react/prop-types */

const PageHeader = ({ title, subtitle }) => {
  return (
    <div className="mb-8 rounded-3xl border border-white/70 bg-white/70 p-6 shadow-[0_24px_70px_-36px_rgba(15,23,42,0.28)] backdrop-blur">

      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.28em] text-sky-600">
        Overview
      </p>

      <h1 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
        {title}
      </h1>

      <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-500 sm:text-base">
        {subtitle}
      </p>

    </div>
  );
};

export default PageHeader;