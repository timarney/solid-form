import { isElementVisible } from "./visibility";

export const getFormRecord = (template) => {
  const formRecord = {
    id: "1234",
    securityAttribute: "Unclassified",
    isPublished: true,
    form: {
      layout: template.layout,
      titleEn: template.titleEn,
      titleFr: template.titleFr,
      elements: template.elements,
      name: template.name,
    },
  };

  return formRecord;
};

export const parseState = (values, template, formRecord) => {
  // Build a map of elements by id for quick lookup
  const elementMap = {};
  template.elements.forEach((el) => {
    el.isVisible = isElementVisible(
      values.currentGroup,
      template.groups,
      values,
      formRecord,
      el
    );
    el.value = values[el.id] || "";
    elementMap[String(el.id)] = el;
  });

  // Add the start group as the first group if it doesn't exist
  if (!template.groupsLayout.includes("start")) {
    template.groupsLayout.unshift("start");
  }

  // Order groups by groupsLayout, fallback to Object.keys if missing
  const groupOrder = template.groupsLayout;

  // Order elements by layout
  const elementOrder = Array.isArray(template.layout)
    ? template.layout.map(String)
    : [];

  const grouped = {};
  for (const groupId of groupOrder) {
    const group = template.groups[groupId];
    if (!group || !Array.isArray(group.elements)) continue;
    // Pick group elements in the order they appear in layout
    const sortedElementIds = elementOrder.filter((id) =>
      group.elements.includes(id)
    );

    grouped[groupId] = { group, elements: sortedElementIds };
  }

  return { elementMap, groupOrder, elementOrder, grouped };
};
