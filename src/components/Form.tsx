
import { ElementRenderer } from "./ElementRenderer";

import { groupsLayout, groups, elements} from "../model/model";

console.log("Groups:", groups);
console.log("Elements:", elements);

export const Form = () => {

  // console.log("Element Map:", elementMap);
  // console.log("Group Order:", groupOrder);
  // console.log("Element Order:", elementOrder);
  // console.log("Grouped:", grouped);

  return (
    <form>
      {groupsLayout.map((groupId) => {
        const group = groups[groupId];

        if (!group) return null;

        return (
          <fieldset key={groupId} class="gcds-fieldset">
            <legend>{group.group.titleEn}</legend>
            {group.elements.map((elementId) => {
              const element = elements[elementId];
              if (!element) return null;

              return (
                <div
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
