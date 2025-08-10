const getOptions = (id, properties) => {
  return properties.choices.map((option, index) => ({
    label: option.en,
    id: `${id}.${index}`,
    value: `${id}.${index}`,
  }));
};

export function ElementRenderer({ element }) {
  const { properties } = element;

  // Render the element based on its type
  switch (element.type) {
    case "richText":
      return <div>{properties.descriptionEn}</div>;
    case "textField":
      return <gcds-input label={properties.titleEn} value={element.value} />;
    case "textArea":
      return (
        <gcds-textarea
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
