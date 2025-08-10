import { parseTemplate } from "../lib/parseTemplate";

// import { createSignal } from "solid-js";

const { elementMap, groupOrder, grouped } = parseTemplate();


export const elements = elementMap;
export const groups = grouped;
export const groupsLayout = groupOrder;


// createSignal(0);