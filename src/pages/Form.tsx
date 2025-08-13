import { createEffect, createSignal, For, Show } from "solid-js";
import { useNavigate } from "@solidjs/router";
import type { FormElement } from "@gcforms/types";

/* Helpers */
import { parseTemplate } from "../lib/parseTemplate";
import { checkVisibilityRecursive } from "../lib/visibility";

/* Data */
import { formRecord, grouped, template } from "../store/store";

/* Components */
import { ElementRenderer } from "../components/ElementRenderer";

/* Process data */
import { validate } from "../lib/process";

import {
  scrollToErrorSummary,
  getValueFromEvent,
} from "../lib/helpers/helpers";

/* Signals */
const [values, setValues] = createSignal({});
const [currentGroup, setCurrentGroup] = createSignal("start");
const [errors, setErrors] = createSignal<Record<string, unknown>>({});

export function Form() {
  const navigate = useNavigate();

  const updateValue = (val: { id: string; value: string }) => {
    setValues((prevValues) => ({
      ...prevValues,
      [val.id]: val.value,
    }));
  };

  const updateCurrentGroup = (newGroup: string) => {
    setCurrentGroup(newGroup);
  };

  const getNextAction = () => {
    let nextGroup = template.groups[currentGroup()].nextAction;

    if (nextGroup === "review" || nextGroup === "end") {
      nextGroup = "";
    }

    return { next: nextGroup, text: nextGroup ? "Next" : "Submit" };
  };

  const mappedErrors = () => {
    return Object.keys(errors()).reduce(
      (acc, key) => ({
        ...acc,
        [`#el-${key}`]: errors()[key],
      }),
      {}
    );
  };

  createEffect(() => {
    console.log("Form Values:", values());
  });

  const { elementMap } = parseTemplate(template);

  return (
    <form>
      <gcds-heading tag="h1">
        {grouped[currentGroup()]?.group?.titleEn || "Form Title"}
      </gcds-heading>
      <div>
        <Show when={errors() && Object.keys(errors()).length > 0}>
          <gcds-error-summary
            id="error-summary"
            error-links={mappedErrors()}
            listen={true}
          />
        </Show>
      </div>
      <For
        each={grouped[currentGroup()]?.elements.filter((id) => {
          const isVisible = checkVisibilityRecursive(
            formRecord,
            elementMap[id],
            values(),
            {}
          );
          return isVisible;
        })}
      >
        {(elementId: string) => {
          const element = elementMap[elementId];
          if (!element) return null;
          return (
            <div>
              <ElementRenderer
                value={values()[elementId] as string}
                handler={(e) => {
                  updateValue(getValueFromEvent(e));
                }}
                error={() => errors()[elementId] || null}
                element={element as FormElement}
              />
            </div>
          );
        }}
      </For>

      <gcds-button
        onClick={() => {
          const errors = validate({
            values: values(),
            currentGroup: currentGroup(),
            formRecord,
          });

          if (errors && Object.keys(errors).length > 0) {
            setErrors(errors);
            scrollToErrorSummary();
            return;
          }

          // reset errors
          setErrors({});

          const nextAction = getNextAction();
          if (nextAction.next) {
            updateCurrentGroup(nextAction.next);
          } else {
            // Navigate to submit page when no next action
            navigate("/confirm");
          }

          // Focus H1
          const heading = document.querySelector("gcds-heading");
          if (heading) {
            heading.scrollIntoView({ behavior: "smooth" });
            // focus H1
            heading.focus();
          }
        }}
      >
        {getNextAction().text}
      </gcds-button>
    </form>
  );
}
