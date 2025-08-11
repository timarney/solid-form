import { values, setValues, formRecord } from "../store/store";
import { createMemo } from "solid-js";
import { checkVisibilityRecursive } from "../lib/visibility";
import type { FormElement } from "@gcforms/types";

const getOptions = (id: string, properties: any) => {
  return properties.choices.map((option: any, index: number) => ({
    label: option.en,
    id: `${id}.${index}`,
    value: option.en,
  }));
};

export function ElementRenderer({ element }: { element: FormElement }) {
  const { properties } = element;

  // Compute visibility reactively for this element only
  const isVisible = createMemo(() =>
    checkVisibilityRecursive(formRecord, element, values())
  );

  const updateValue = (e: Event) => {
    const target = e.target as HTMLInputElement;
    const id = target.id;
    const value = target.value;
    setValues((prevValues) => ({
      ...prevValues,
      [id]: value,
    }));
  };

  if (!isVisible()) {
    return null;
  }

  const v = values() as Record<string, string>;

  switch (element.type) {
    case "richText":
      return <div>{properties.descriptionEn}</div>;
    case "textField":
      return (
        <gcds-input
          id={element.id}
          label={properties.titleEn}
          value={v[element.id] || ""}
          on:gcdsChange={updateValue}
        />
      );
    case "textArea":
      return (
        <gcds-textarea
          id={element.id}
          textarea-id={element.id}
          name={element.id}
          hint="Hint / Example message."
          label={properties.titleEn}
          value={v[element.id] || ""}
          on:gcdsChange={updateValue}
        />
      );
    case "radio":
      return (
        <gcds-radios
          value={v[element.id] || ""}
          id={element.id}
          name="radio"
          on:gcdsChange={updateValue}
          legend={properties.titleEn}
          options={getOptions(String(element.id), properties)}
        />
      );
    default:
      return <div>Unsupported element type: {element.type}</div>;
  }
}
