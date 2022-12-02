import { Accordion, AccordionSection } from "../components/USWDS/Accordion.tsx";

import { useState } from "preact/hooks";
import { IS_BROWSER } from "$fresh/runtime.ts";

interface AccordionProps {
  number_of_sections?: number;
}

export default function Accordions(props: AccordionProps) {
  const [sections, setSections] = useState(props.number_of_sections || 1);
  return (
    <div>
      <button onClick={() => setSections(sections - 1)} disabled={!IS_BROWSER}>
        -1
      </button>
      <button onClick={() => setSections(sections + 1)} disabled={!IS_BROWSER}>
        +1
      </button>
      <Accordion>
        {Array.from(Array(sections).keys()).map((i) => (
          <AccordionSection
            id={`a${i}`}
            heading={`Section ${i + 1}`}
            expanded={i == sections - 1}
          >
            <p>
              {`Content for section ${i+1}`}
            </p>
          </AccordionSection>
        ))}
      </Accordion>
    </div>
  );
}
