export const getParent = async (el: AnyElement) => {
  const allElements = await webflow.getAllElements();

  if (!allElements) return;

  for (const curr of allElements)
    if (curr.children && curr.getChildren().some((child) => child === el))
      return curr;
  return;
};
