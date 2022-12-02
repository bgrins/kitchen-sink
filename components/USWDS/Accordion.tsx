import { ReactNode } from "preact";
import { useState } from "preact/hooks";
import { IS_BROWSER } from "$fresh/runtime.ts";

interface AccordionSectionProps {
  heading: string;
  children?: ReactNode;
  expanded: boolean;
  id: string;
}
export function AccordionSection(props: AccordionSectionProps) {
  const [expanded, setExpanded] = useState(props.expanded || false);
  console.log(
    "AccordionSection",
    props.id,
    props.heading,
    props.expanded,
    expanded
  );
  return (
    <div className="usa-accordion__content">
      <h3 className="usa-accordion__heading">
        <button
          onClick={() => setExpanded(!expanded)}
          className="usa-accordion__button"
          aria-expanded={expanded}
          aria-controls={props.id}
        >
          {props.heading}
        </button>
      </h3>
      <div className="usa-accordion__content" id={props.id} hidden={!expanded}>
        {props.children}
      </div>
    </div>
  );
}
interface AccordionProps {
  multiselect: boolean;
  children?: ReactNode;
}
export function Accordion(props: AccordionProps) {
  return (
    <div className="usa-accordion" data-allow-multiple={props.multiselect}>
      {props.children}
    </div>
  );
}
