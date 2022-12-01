import { DOMParser } from "https://deno.land/x/deno_dom/deno-dom-wasm.ts";
import prettier from "npm:prettier";

// Gather up code samples from https://designsystem.digital.gov/components/overview/
// and write them into a single kitchen sink page

let code_examples = {};
let SCRAPE = false;
if (SCRAPE) {
  let dom = new DOMParser().parseFromString(
    await (
      await fetch("https://designsystem.digital.gov/components/overview/")
    ).text(),
    "text/html"
  );

  // console.log(dom.body.outerHTML);
  let components = [
    ...dom.querySelectorAll("#page-side-navigation > ul > li > a"),
  ]
    .slice(1)
    .map((c) => c.textContent.trim().replace(/\s+/g, "-").toLowerCase());

  for (let component of components) {
    let url = `https://designsystem.digital.gov/components/${component}/`;
    console.log(url);
    let componentDocument = new DOMParser().parseFromString(
      await (await fetch(url)).text(),
      "text/html"
    );

    // console.log(componentDocument.body.outerHTML);
    code_examples[component] = [
      ...componentDocument.querySelectorAll(
        "code.language-text, code.language-html"
      ),
    ].map((c) => c.textContent.trim());
  }

  Deno.writeTextFileSync(
    "./scripts/uswds_examples.json",
    JSON.stringify(code_examples, null, 2)
  );
} else {
  code_examples = JSON.parse(Deno.readTextFileSync("code_examples.json"));
}

console.log(code_examples);
let nav = [];
let output = [];
for (let sample in code_examples) {
  let samples = code_examples[sample];
  if (samples.length == 0) {
    continue;
  }
  nav.push(
    `<li class="usa-sidenav__item"><a href="#${sample}">${sample}</a></li>`
  );
  output.push(`<h2 id="${sample}" class="kitchen-sink-heading">${sample}</h2>`);
  for (let code of samples) {
    // Some basic cleanups to make it good enough for JSX. Only for demo purposes.
    code = code.replace(/class="/g, 'className="');
    code = code.replaceAll('"/assets/img/', '"/uswds/img/');
    code = code.replace(/class="/g, 'className="');
    code = code.replace(/disabled="disabled"/g, "disabled");
    code = code.replace(/xlink:href/g, "xlinkHref");
    code = code.replace(/xml:lang/g, "xml-lang");
    code = code.replaceAll("*/", "* /");
    code = code.replace(/\<style/g, "{/*<style");
    code = code.replace(/\<\/style\>/g, "</style>*/}");
    code = code.replace(/\<script/g, "{/*<script");
    code = code.replace(/\<\/script\>/g, "</script>*/}");

    output.push(code);
  }
}

Deno.writeTextFileSync(
  "./components/USWDSKitchenSinkNav.jsx",
  prettier.format(
    `
    export default function KitchenSinkNav() {
      return (
        <nav aria-label="Side navigation,">
          <ul className="usa-sidenav">
            ${nav.join("")}
          </ul> 
        </nav>
      )
    }
  `,
    {
      parser: "babel",
    }
  )
);

// Todo write as JSX for the sink and also a nav bar in a separate file
Deno.writeTextFileSync(
  "./components/USWDSKitchenSink.jsx",
  prettier.format(
    `export default function KitchenSink() {
      return (
        <div>
          ${output.join("\n")}
        </div>
        );
      }`,
    { parser: "babel" }
  )
);
