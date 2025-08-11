import { createSignal } from "solid-js";

import { formRecord, groups, template } from "../store/store";
import { checkVisibilityRecursive } from "../lib/visibility";
import type { FormElement } from "@gcforms/types";

import { ElementRenderer } from "./ElementRenderer";

import { parseTemplate } from "../lib/parseTemplate";

export function Form() {
  const [values, setValues] = createSignal({
    2: "Tim Arney",
    10: "tim@line37.com",
    12: "Other ",
    currentGroup: "start",
    //currentGroup: "b0e74a96-fa9e-43f4-8573-4b4ba23d65e5",
  });

  const updateValue = (e: Event) => {
    const target = e.target as HTMLInputElement;
    const id = target.id;
    const value = target.value;
    setValues((prevValues) => ({
      ...prevValues,
      [id]: value,
    }));
  };

  const { elementMap } = parseTemplate(template);

  const group = groups[values().currentGroup];
  const elements = group ? group.elements : [];

  return elements.map((elementId: string) => {
    const element = elementMap[elementId];
    if (!element) return null;
    const visible = checkVisibilityRecursive(formRecord, element, values(), {});

    console.log(`Element ${elementId} visibility: ${visible}`);

    if (!visible) return null;

    return (
      <ElementRenderer
        value={values()[elementId]}
        handler={updateValue}
        element={element as FormElement}
      />
    );
  });
}
