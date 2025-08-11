import { values, setValues } from "../store/store";

const getOptions = (id: string, properties: any) => {
  return properties.choices.map((option: any, index: number) => ({
    label: option.en,
    id: `${id}.${index}`,
    value: option.en,
  }));
};

export function ElementRenderer({ element }: { element: any }) {
  const { properties } = element;

  const updateValue = (e) => {


    const id = e.target.id;
    const value = e.target.value;

    console.log("Updating value for", id, "to", value);

    setValues((prevValues) => ({
      ...prevValues,
      [id]: value,
    }));
  };

  console.log(values());

  // Render the element based on its type
  switch (element.type) {
    case "richText":
      return <div>{properties.descriptionEn}</div>;
    case "textField":
      return (
        <gcds-input
          id="test"
          label={properties.titleEn}
          value={element.value}
        />
      );
    case "textArea":
      return (
        <gcds-textarea
          id="test-textarea"
          textarea-id="textarea-props"
          name="textarea-name"
          hint="Hint / Example message."
          label={properties.titleEn}
        />
      );
    case "radio":
      return (
        <gcds-radios
          id={element.id}
          name="radio"
          on:gcdsChange={updateValue}
          legend={properties.titleEn}
          options={getOptions(element.id, properties)}
        />
      );
    default:
      return <div>Unsupported element type: {element.type}</div>;
  }
}
