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

    setValues((prevValues) => ({
      ...prevValues,
      [id]: value,
    }));
  };

  if(!element.isVisible){
    return null; // If the element is not visible, return null
  }

  // Render the element based on its type
  switch (element.type) {
    case "richText":
      return <div>{properties.descriptionEn}</div>;
    case "textField":
      return (
        <gcds-input
          id={element.id}
          label={properties.titleEn}
          value={element.value}
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
          value={element.value}
          on:gcdsChange={updateValue}
        />
      );
    case "radio":
      return (
        <gcds-radios
          value={values()[element.id]}
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
