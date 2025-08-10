import { parseTemplate } from "../lib/parseTemplate";
import { ElementRenderer } from "./ElementRenderer";

export const Form = () => {
  const { elementMap, groupOrder, elementOrder, grouped } = parseTemplate();

  // console.log("Element Map:", elementMap);
  // console.log("Group Order:", groupOrder);
  // console.log("Element Order:", elementOrder);
  // console.log("Grouped:", grouped);

  return (
    <form>
      {groupOrder.map((groupId) => {
        const group = grouped[groupId];

        if (!group) return null;

        return (
          <fieldset key={groupId} class="gcds-fieldset">
            <legend>{group.group.titleEn}</legend>
            {group.elements.map((elementId) => {
              const element = elementMap[elementId];
              if (!element) return null;

              return (
                <div
                  key={elementId}
                  class={element.isVisible ? "visible" : "hidden"}
                >
                  <ElementRenderer element={element} />
                </div>
              );
            })}
          </fieldset>
        );
      })}
    </form>
  );
};
