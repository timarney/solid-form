import templateJson from "../templates/get-support-2025-08-10.json";

import { parseTemplate, getFormRecord } from "../lib/helpers";

export const template = templateJson;

export const formRecord = getFormRecord(template);

export const { groupOrder, grouped } = parseTemplate(template);
