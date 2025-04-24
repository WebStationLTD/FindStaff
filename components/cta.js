export default function CTA() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-10/10 py-0 sm:px-6 sm:py-0 lg:px-0">
        <div className="relative isolate overflow-hidden bg-gray-900 px-6 py-24 text-center shadow-2xl sm:px-16">
          <h2 className="text-4xl font-semibold tracking-tight text-balance text-white sm:text-5xl">
            Готови ли сте да разширите хоризонтите на вашия екип?
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg/8 text-pretty text-gray-300">
            Свържете се с нас днес, за да обсъдим как можем да помогнем на вашия
            бизнес да привлече висококвалифицирани специалисти от международния
            пазар. Нашите индивидуални решения за подбор на персонал ще ви
            осигурят достъп до таланти, които ще издигнат вашия бизнес на
            следващото ниво.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              href="/services"
              className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-xs hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Всички услуги
            </a>
            <a href="/contact" className="text-sm/6 font-semibold text-white">
              Контакти <span aria-hidden="true">→</span>
            </a>
          </div>
          <svg
            viewBox="0 0 1024 1024"
            aria-hidden="true"
            className="absolute top-0 left-1/2 -z-10 size-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]"
          >
            <circle
              r={512}
              cx={512}
              cy={512}
              fill="url(#827591b1-ce8c-4110-b064-7cb85a0b1217)"
              fillOpacity="0.7"
            />
            <defs>
              <radialGradient id="827591b1-ce8c-4110-b064-7cb85a0b1217">
                <stop stopColor="#005e9e" />
                <stop offset={1} stopColor="#005e9e" />
              </radialGradient>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  );
}
