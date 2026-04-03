import React from 'react';

const PageHeader = ({
  eyebrow,
  title,
  description,
  supportingText,
  aside,
  align = 'left',
  className = '',
}) => {
  const isCentered = align === 'center';

  return (
    <div className={`mb-6 grid gap-4 ${aside ? 'lg:grid-cols-[1fr_300px]' : ''} ${className}`}>
      <div className={`${isCentered ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}`}>
        {eyebrow ? <p className="eyebrow mb-3">{eyebrow}</p> : null}
        <h1 className="app-heading mb-3">{title}</h1>
        {description ? <p className="app-body">{description}</p> : null}
        {supportingText ? (
          <p className={`mt-3 text-sm leading-6 text-slate-500 ${isCentered ? 'mx-auto max-w-2xl' : 'max-w-2xl'}`}>
            {supportingText}
          </p>
        ) : null}
      </div>

      {aside ? <div>{aside}</div> : null}
    </div>
  );
};

export default PageHeader;
