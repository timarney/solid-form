import templateJson from "../templates/get-support-2025-08-10.json";

import { parseTemplate } from "../lib/parseTemplate";

export const template = templateJson;

import { getFormRecord } from "../lib/parseTemplate";

export const formRecord = getFormRecord(template);

const { groupOrder, grouped } = parseTemplate(template);
export const groupsLayout = groupOrder;
export const groups = grouped;
