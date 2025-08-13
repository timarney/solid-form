import { Router, Route } from "@solidjs/router";

/* @refresh reload */
import { render } from "solid-js/web";

import "./index.css";

import { Form } from "./pages/Form";
import { Confirm } from "./pages/Confirm";

const Layout = (props) => {
  return (
    <>
      <div>
        <gcds-header lang-href="#" skip-to-href="#main-content"></gcds-header>
        <gcds-container
          id="main-content"
          main-container
          size="xl"
          centered
          tag="main"
        >
          {props.children}
        </gcds-container>
      </div>
      <gcds-footer
        display="compact"
        contextual-heading="Canadian Digital Service"
        contextual-links='{ "Why GC Notify": "#","Features": "#", "Activity on GC Notify": "#"}'
      ></gcds-footer>
    </>
  );
};

render(
  () => (
    <Router root={Layout}>
      <Route path="/" component={Form} />
      <Route path="/confirm" component={Confirm} />
    </Router>
  ),
  document.getElementById("root")
);
