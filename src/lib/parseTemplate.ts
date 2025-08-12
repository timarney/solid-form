import type { FormElement } from "@gcforms/types";

export function getFormRecord(template: any) {
  const formRecord: any = {
    id: "1234",
    securityAttribute: "Unclassified",
    isPublished: true,
    form: {
      ...template,
    },
  };
  return formRecord;
}

export const parseTemplate = (template: any) => {
  // Build a map of elements by id for quick lookup
  const elementMap: Record<string, FormElement> = {};
  (template.elements as FormElement[]).forEach((el) => {
    // Only set static properties; do not set isVisible or value here
    elementMap[String(el.id)] = el;
  });

  // Add the start group as the first group if it doesn't exist
  if (!template.groupsLayout.includes("start")) {
    template.groupsLayout.unshift("start");
  }

  // Order groups by groupsLayout, fallback to Object.keys if missing
  const groupOrder: string[] = template.groupsLayout;

  // Order elements by layout
  const elementOrder: string[] = Array.isArray(template.layout)
    ? template.layout.map(String)
    : [];

  const grouped: Record<string, { group: any; elements: string[] }> = {};
  for (const groupId of groupOrder) {
    const group = template.groups[groupId];
    if (!group || !Array.isArray(group.elements)) continue;
    // Pick group elements in the order they appear in layout
    const sortedElementIds = elementOrder.filter((id: string) =>
      group.elements.includes(id)
    );
    grouped[groupId] = { group, elements: sortedElementIds };
  }

  return { elementMap, groupOrder, elementOrder, grouped };
};
