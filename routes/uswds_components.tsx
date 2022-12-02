import { asset } from "$fresh/runtime.ts";
import { Head } from "$fresh/runtime.ts";

import Alerts from "../islands/Alerts.tsx";
import Accordions from "../islands/Accordions.tsx";

export default () => {
  return (
    <>
      <Head>
        <meta name="description" content="Components" />
        <link rel="stylesheet" href={asset("/uswds/css/uswds.css")} />
        <link rel="icon" href={asset("/logo.svg")} />
        {/* <script src={asset("/uswds/js/uswds-init.min.js")}></script> */}
      </Head>

      <Alerts></Alerts>
      <Accordions></Accordions>
      {/* <script src={asset("/uswds/js/uswds.min.js")}></script> */}
    </>
  );
};
