import {
  WarningAlert,
  InformativeAlert,
  ErrorAlert,
  SuccessAlert,
} from "../components/USWDS/StandardAlert.tsx";

import { useState } from "preact/hooks";
import { IS_BROWSER } from "$fresh/runtime.ts";

interface CounterProps {
  start: number;
}
interface AlertProps {
  number_of_exclamations?: number;
}

export default function Alerts(props: AlertProps) {
  const [exclamations, setExclamations] = useState(
    props.number_of_exclamations || 0
  );
  return (
    <div>
      <button
        onClick={() => setExclamations(exclamations - 1)}
        disabled={!IS_BROWSER}
      >
        -1
      </button>
      <button
        onClick={() => setExclamations(exclamations + 1)}
        disabled={!IS_BROWSER}
      >
        +1
      </button>
      <InformativeAlert
        heading={`Custom info header${"!".repeat(exclamations)}`}
      >
        Info text
      </InformativeAlert>
      <WarningAlert
        heading={`Custom warning header${"!".repeat(exclamations)}`}
      >
        Warning text
      </WarningAlert>
      <SuccessAlert
        heading={`Custom success header${"!".repeat(exclamations)}`}
      >
        Success text
      </SuccessAlert>
      <ErrorAlert heading={`Custom error header${"!".repeat(exclamations)}`}>
        Error text
      </ErrorAlert>
    </div>
  );
}
