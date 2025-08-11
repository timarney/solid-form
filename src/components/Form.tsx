import { createMemo } from "solid-js";
import { ElementRenderer } from "./ElementRenderer";
import { parseState } from "../lib/parseTemplate";

import { groupsLayout, template } from "../store/store";
import { values } from "../store/store";

import type { FormElement } from "@gcforms/types";

export const Form = ({ groupData }: { groupData: Record<string, any> }) => {
  const { elementMap } = parseState(template);

  return (
    <div>
      <form id="my-form">
        {groupsLayout.map((groupId: string) => {
          const group = groupData[groupId];
          if (!group) return null;
          if (groupId !== values().currentGroup) return null;
          return (
            <fieldset class="gcds-fieldset">
              <legend>{group.group.titleEn}</legend>
              {group.elements.map((elementId: string) => {
                const element = elementMap[elementId];
                if (!element) return null;
                return <ElementRenderer element={element as FormElement} />;
              })}
            </fieldset>
          );
        })}
      </form>
    </div>
  );
};
