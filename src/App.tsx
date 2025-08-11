import type { Component } from "solid-js";

import styles from "./App.module.css";

import { Form } from "./components/Form";

const App: Component = () => {
  return (
    <div class={styles.App}>
      <gcds-header lang-href="#" skip-to-href="#main-content"></gcds-header>

      <gcds-container
        id="main-content"
        main-container
        size="xl"
        centered
        tag="main"
      >
        <section>
          <gcds-heading tag="h1">Basic page</gcds-heading>
          <gcds-text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Turp is
            egestas maecenas pharetra convallis posuere morbi leo urna.
          </gcds-text>
          <Form />
        </section>
      </gcds-container>

      <gcds-footer
        display="compact"
        contextual-heading="Canadian Digital Service"
        contextual-links='{ "Why GC Notify": "#","Features": "#", "Activity on GC Notify": "#"}'
      ></gcds-footer>
    </div>
  );
};

export default App;
