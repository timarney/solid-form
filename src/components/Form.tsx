import { createMemo } from "solid-js";
import { ElementRenderer } from "./ElementRenderer";
import { parseState } from "../lib/parseState";

import { groupsLayout, formRecord, template } from "../store/store";
import { values } from "../store/store";

export const Form = ({ groupData }: { groupData: any }) => {
  const elements = createMemo(() => {
    const { elementMap } = parseState(values(), template, formRecord);
    return elementMap;
  });

  return (
    <div>
      <form id="my-form">
        {groupsLayout.map((groupId) => {
          const group = groupData[groupId];

          if (!group) return null;

          if (groupId !== values().currentGroup) return null;

          return (
            <fieldset key={groupId} class="gcds-fieldset">
              <legend>{group.group.titleEn}</legend>
              {group.elements.map((elementId) => {
                const element = elements()[elementId];
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
    </div>
  );
};
