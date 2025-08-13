import { createEffect, createSignal, For, Show } from "solid-js";
import { useNavigate } from "@solidjs/router";
import type { FormElement } from "@gcforms/types";
import { checkVisibilityRecursive } from "@gcforms/core/visibility";

/* Data */
import { formRecord, grouped, template } from "../store/store";

/* Components */
import { ElementRenderer } from "../components/ElementRenderer";

/* Helpers */
import {
  scrollToErrorSummary,
  getValueFromEvent,
  parseTemplate,
  validate,
} from "../lib/helpers";

/* Signals */
const [values, setValues] = createSignal<Record<string, string>>({});
const [currentGroup, setCurrentGroup] = createSignal<string>("start");
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

  const getNextAction = (): { next: string; text: string } => {
    // Ensure type safety for group lookup

    const groupKey = currentGroup() as keyof typeof template.groups;
    const group = template.groups[
      groupKey
    ] as (typeof template.groups)[typeof groupKey];

    // @ts-ignore
    return { next: group?.nextAction, text: "Next" };
  };

  const mappedErrors = (): Record<string, unknown> => {
    return Object.keys(errors()).reduce<Record<string, unknown>>(
      (acc, key) => ({
        ...acc,
        [`#el-${key}`]: errors()[key],
      }),
      {}
    );
  };

  createEffect(() => {
    console.log("Form Values:", values());
    console.log("Current Group:", currentGroup());
    console.log("Errors:", errors());
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
        each={grouped[currentGroup()]?.elements.filter((id: string) => {
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
                handler={(e: Event | CustomEvent) => {
                  updateValue(getValueFromEvent(e));
                }}
                // @ts-ignore
                error={() => errors()[elementId] || null}
                element={element as FormElement}
              />
            </div>
          );
        }}
      </For>

      <gcds-button
        onClick={(e: MouseEvent) => {
          e.preventDefault();
          const errorsObj = validate({
            values: values(),
            currentGroup: currentGroup(),
            formRecord,
          });

          if (errorsObj && Object.keys(errorsObj).length > 0) {
            setErrors(errorsObj);
            scrollToErrorSummary();
            return;
          }

          // reset errors
          setErrors({});

          const nextAction = getNextAction();

          console.log("Next Action:", nextAction);

          if (nextAction.next === "review" || nextAction.next === "end") {
            // Navigate to submit page when no next action
            navigate("/confirm");
          } else {
            updateCurrentGroup(nextAction.next);
          }

          // Focus H1
          const heading = document.querySelector(
            "gcds-heading"
          ) as HTMLElement | null;
          if (heading) {
            heading.scrollIntoView({ behavior: "smooth" });
            heading.focus();
          }
        }}
      >
        {getNextAction().text}
      </gcds-button>
    </form>
  );
}
