import { Head } from "$fresh/runtime.ts";
import { asset } from "$fresh/runtime.ts";
import USWDSKitchenSinkNav from "../components/USWDSKitchenSinkNav.jsx";
import USWDSKitchenSink from "../components/USWDSKitchenSink.jsx";
import IconBrandGithub from "https://deno.land/x/tabler_icons_tsx@0.0.1/tsx/brand-github.tsx";
export default () => {
  return (
    <>
      <Head>
        <meta name="description" content="Component Kitchen Sink" />
        <link rel="stylesheet" href={asset("/uswds/css/uswds.css")} />
        <link rel="stylesheet" href={asset("/style.css")} />
        <link rel="icon" href={asset("/logo.svg")} />
        <script src={asset("/uswds/js/uswds-init.min.js")}></script>
      </Head>

      <div class="wrapper">
        <header>
          <h1>Component Kitchen Sink - USWDS</h1>
          <a href="https://designsystem.digital.gov/components/overview/">
            <IconBrandGithub></IconBrandGithub>
          </a>
        </header>
        <aside>
          <USWDSKitchenSinkNav />
        </aside>
        <main>
          <div class="usa-alert usa-alert--info usa-alert--slim">
            <div class="usa-alert__body">
              <p class="usa-alert__text">
                Samples from{" "}
                <a href="https://designsystem.digital.gov/components/overview/">
                  https://designsystem.digital.gov/components/overview/
                </a>
              </p>
            </div>
          </div>
          <USWDSKitchenSink />
        </main>
        <footer></footer>
      </div>
      <script src={asset("/uswds/js/uswds.min.js")}></script>
    </>
  );
};
