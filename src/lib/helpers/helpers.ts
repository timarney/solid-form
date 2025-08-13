export const scrollToErrorSummary = () => {
  const errorSummary = document.getElementById("error-summary");
  if (errorSummary) {
    const rect = errorSummary.getBoundingClientRect();
    const scrollTop = window.pageYOffset + rect.top - 20;
    window.scrollTo({ top: scrollTop, behavior: "smooth" });
  }
};

export const getValueFromEvent = (e: Event) => {
  const target = e.target as HTMLInputElement;
  const id = target.id;
  const cleanId = id.replace("el-", "");

  const value = target.value;

  return { id: cleanId, value };
};

