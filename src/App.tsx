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
          <gcds-heading tag="h1">Support Form</gcds-heading>
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
