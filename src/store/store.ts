
import templateJson from "../templates/get-support-2025-08-10.json";

export const template = templateJson;

import { parseState } from "../lib/parseState";
import { createSignal } from "solid-js";

import { getFormRecord } from "../lib/parseState";

export const formRecord = getFormRecord(template);

export const [values, setValues] = createSignal({
  2: "Tim Arney",
  10: "tim@line37.com",
  12: "Other ",
  currentGroup: "start",
  //currentGroup: "b0e74a96-fa9e-43f4-8573-4b4ba23d65e5",
});

const { groupOrder, grouped } = parseState(values(), template, formRecord);

// elements should be reactive to values

export const groupsLayout = groupOrder;
export const groups = grouped;
