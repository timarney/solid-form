import type { FormElement } from "@gcforms/types";

/* Helpers  */
const getOptions = (id: string, properties: any) => {
  return properties.choices.map((option: any, index: number) => ({
    label: option.en,
    id: `${id}.${index}`,
    value: option.en,
  }));
};

export function ElementRenderer({
  element,
  handler,
  value,
  error,
}: {
  value?: string;
  element: FormElement;
  handler: (e: Event) => void;
}) {
  const { properties } = element;

  switch (element.type) {
    case "richText":
      return <div>{properties.descriptionEn}</div>;
    case "textField":
      return (
        <gcds-input
          error-message={error}
          id={element.id}
          input-id={element.id}
          label={properties.titleEn}
          value={value || ""}
          on:gcdsChange={handler}
        />
      );
    case "textArea":
      return (
        <gcds-textarea
          error-message={error}
          input-id={element.id}
          textarea-id={element.id}
          name={element.id}
          hint="Hint / Example message."
          label={properties.titleEn}
          value={value || ""}
          on:gcdsChange={handler}
        />
      );
    case "radio":
      return (
        <gcds-radios
          error-message={error}
          value={value || ""}
          input-id={element.id}
          name="radio"
          on:gcdsChange={handler}
          legend={properties.titleEn}
          options={getOptions(String(element.id), properties)}
        />
      );
    default:
      return <div>Unsupported element type: {element.type}</div>;
  }
}
