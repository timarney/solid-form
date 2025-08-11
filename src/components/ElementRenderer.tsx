const getOptions = (id: string, properties: any) => {
  return properties.choices.map((option: any, index: number) => ({
    label: option.en,
    id: `${id}.${index}`,
    value: `${id}.${index}`,
  }));
};

export function ElementRenderer({ element }: { element: any }) {
  const { properties } = element;

  // Render the element based on its type
  switch (element.type) {
    case "richText":
      return <div>{properties.descriptionEn}</div>;
    case "textField":
      return (
        <gcds-input
          id="test"
          on:gcdsBlur={(e) => {
            console.log("Input field blurred", {
              id: e.target.id,
              val: e.target.value,
            });
          }}
          label={properties.titleEn}
          value={element.value}
        />
      );
    case "textArea":
      return (
        <gcds-textarea
          id="test-textarea"
          on:gcdsBlur={(e) => {
            console.log("Textarea blurred", {
              id: e.target.id,
              val: e.target.value,
            });
          }}
          textarea-id="textarea-props"
          name="textarea-name"
          hint="Hint / Example message."
          label={properties.titleEn}
        />
      );
    case "radio":
      return (
        <gcds-radios
          name="radio"
          legend={properties.titleEn}
          options={getOptions(element.id, properties)}
        />
      );
    default:
      return <div>Unsupported element type: {element.type}</div>;
  }
}
