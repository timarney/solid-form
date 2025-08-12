import { createSignal, For, Show } from "solid-js";
import type { FormElement } from "@gcforms/types";

/* Helpers */
import { parseTemplate } from "../lib/parseTemplate";
import { checkVisibilityRecursive } from "../lib/visibility";

/* Data */
import { formRecord, grouped, template } from "../store/store";

/* Components */
import { ElementRenderer } from "./ElementRenderer";

/* Process data */
import { validate } from "../lib/process";

/* Signals */
const [values, setValues] = createSignal({});
const [currentGroup, setCurrentGroup] = createSignal("start");
const [errors, setErrors] = createSignal<Record<string, unknown>>({});

export function Form() {
  const updateValue = (e: Event) => {
    const target = e.target as HTMLInputElement;
    const id = target.id;
    const value = target.value;
    setValues((prevValues) => ({
      ...prevValues,
      [id]: value,
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

  const { elementMap } = parseTemplate(template);

  return (
    <form>
      <h1>{grouped[currentGroup()]?.group?.titleEn || "Form Title"}</h1>
      <div>
        <Show when={errors() && Object.keys(errors()).length > 0}>
          <gcds-error-summary error-links={errors()} />
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
                handler={updateValue}
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
            return;
          }

          updateCurrentGroup(getNextAction().next);
        }}
      >
        {getNextAction().text}
      </gcds-button>
    </form>
  );
}
