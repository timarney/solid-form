import { createSignal, For } from "solid-js";
import type { FormElement } from "@gcforms/types";

/* Helpers */
import { parseTemplate } from "../lib/parseTemplate";
import { checkVisibilityRecursive } from "../lib/visibility";

/* Data */
import { formRecord, grouped, template } from "../store/store";

/* Components */
import { ElementRenderer } from "./ElementRenderer";

const [values, setValues] = createSignal({
  2: "Tim Arney",
  10: "tim@line37.com",
});

const [currentGroup, setCurrentGroup] = createSignal("start");

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
            <ElementRenderer
              value={values()[elementId]}
              handler={updateValue}
              element={element as FormElement}
            />
          );
        }}
      </For>

      <gcds-button
        onClick={() => {
          updateCurrentGroup(getNextAction().next);
        }}
      >
        {getNextAction().text}
      </gcds-button>
    </form>
  );
}
