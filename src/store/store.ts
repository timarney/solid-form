import { parseState } from "../lib/parseState";
import { template } from "../lib/parseState";
import { createSignal } from "solid-js";

import { getFormRecord } from "../lib/parseState";

const formRecord = getFormRecord(template);

export const [values, setValues] = createSignal({
  2: "Tim Arney",
  10: "tim@line37.com",
  12: "Other ",
  //currentGroup: "start",
  currentGroup: "b0e74a96-fa9e-43f4-8573-4b4ba23d65e5",
});

const { elementMap, groupOrder, grouped } = parseState(
  values(),
  template,
  formRecord
);


console.log(grouped, elementMap)

export const elements = elementMap;
export const groupsLayout = groupOrder;

// Create signals for elements and groups
export const [groups, setGroups] = createSignal(grouped);