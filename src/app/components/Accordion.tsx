interface AccordionItemProps {
  readonly title: string;
  readonly children: React.ReactNode;
}

interface AccordionProps {
  readonly items: ReadonlyArray<{
    readonly title: string;
    readonly content: React.ReactNode;
  }>;
}

function AccordionItem({ title, children }: AccordionItemProps) {
  return (
    <details className="group">
      <summary className="flex text-green-500 text-base	 cursor-pointer list-none items-center justify-between py-4 font-base text-secondary-900 group-open:text-primary-500">
        {title}
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="block h-5 w-5 group-open:hidden"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="hidden h-5 w-5 group-open:block"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 12h-15"
            />
          </svg>
        </div>
      </summary>
      <div className="pb-4 text-gray-400 font-mono">{children}</div>
    </details>
  );
}

function Accordion({ items }: AccordionProps) {
  return (
    <div className="w-full max-w-5xl mx-auto mt-14">
      <div className="divide-y divide-gray-100">
        {items.map((item) => (
          <AccordionItem key={item.title} title={item.title}>
            {item.content}
          </AccordionItem>
        ))}
      </div>
    </div>
  );
}

export default Accordion;
