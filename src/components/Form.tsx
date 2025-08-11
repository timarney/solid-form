import { ElementRenderer } from "./ElementRenderer";

import { groupsLayout, elements } from "../store/store";

export const Form = ({ groupData }: { groupData: any }) => {
  return (
    <div>
      <form id="my-form">
        {groupsLayout.map((groupId) => {
          const group = groupData[groupId];

          if (!group) return null;

          return (
            <fieldset key={groupId} class="gcds-fieldset">
              <legend>{group.group.titleEn}</legend>
              {group.elements.map((elementId) => {
                const element = elements[elementId];
                if (!element) return null;

                return (
                  <div class={element.isVisible ? "visible" : "hidden"}>
                    <ElementRenderer element={element} />
                  </div>
                );
              })}
            </fieldset>
          );
        })}
      </form>

      <pre>{JSON.stringify(groupData, null, 2)}</pre>
    </div>
  );
};
