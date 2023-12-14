import { DEFAULT_SECTION_STYLE } from "../constants";

// TODO somewhere I need to check if existing style properties get overriden

export async function handleSelectedElementStyle(selectedElement: AnyElement) {
  if (!selectedElement.styles) {
    console.error("Selected element can not handle styles");
    return;
  }
  console.log("handleSelectedElementStyle");
  // get styles on selected element
  const styles = await selectedElement.getStyles();
  console.log({ styles });
  if (styles.length === 0) {
    // CONDITION: no styles exist on selected element
    const existingStyle = await webflow.getStyleByName(
      DEFAULT_SECTION_STYLE.name
    );
    if (existingStyle) {
      // CONDITION: style with default name already exists
      webflow.notify({
        type: "Info",
        message: `Using existing style ${DEFAULT_SECTION_STYLE.name}`,
      });
      selectedElement.setStyles([existingStyle]);
      console.log(`set style ${existingStyle.getName()} on selected element`);
      return;
    } else {
      // CONDITION: style with default name does not exist
      webflow.notify({
        type: "Info",
        message: `Created new style ${DEFAULT_SECTION_STYLE.name}`,
      });
      const stylePositionRelative = webflow.createStyle(
        DEFAULT_SECTION_STYLE.name
      );
      stylePositionRelative.setProperties(DEFAULT_SECTION_STYLE.properties);
      selectedElement.setStyles([stylePositionRelative]);
      console.log(
        `set new style ${stylePositionRelative.getName()} on selected element`
      );
    }
  } else {
    // CONDITION: styles exist on selected element
    const style = styles[0];

    // check if style has position not static
    const position = style.getProperty("position");
    console.log({ position });
    if (!position || position === "static") {
      // set position to relative
      style.setProperties(DEFAULT_SECTION_STYLE.properties);
      console.log("set position to relative");
      await style.save();
      console.log(`saved style ${style.getName()}`);
    }
  }
}
