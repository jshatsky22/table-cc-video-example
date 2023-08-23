import { type ComponentConfig } from "@superblocksteam/custom-components";

export default {
  // DO NOT CHANGE THE ID ONCE THE COMPONENT HAS BEEN REGISTERED!
  id: "0a9b2cbd-ac2e-48a6-b5ed-0ba5e128d1e2",
  name: "ExpandableTable",
  displayName: "Expandable Table",
  componentPath: "components/ExpandableTable/component.tsx",
  properties: [
    {
      path: "furnitureCategoryData",
      dataType: "any",
      propertiesPanelDisplay: {
        label: "Default Furniture Category Data",
        controlType: "js-expr",
      },
      isExternallyReadable: true,
      isExternallySettable: true,
    },
    {
      path: "furnitureItemsData",
      dataType: "any",
      propertiesPanelDisplay: {
        label: "Default Furniture Items Data",
        controlType: "js-expr",
      },
      isExternallyReadable: true,
      isExternallySettable: true,
    },
    {
      path: "primaryRowClicked_data",
      dataType: "any",
      propertiesPanelDisplay: undefined,
      isExternallyReadable: true,
      isExternallySettable: true,
    },
    {
      path: "detailRowClicked_data",
      dataType: "any",
      propertiesPanelDisplay: undefined,
      isExternallyReadable: true,
      isExternallySettable: true,
    },
    {
      path: "primaryCtaClickedType",
      dataType: "string",
      propertiesPanelDisplay: undefined,
      isExternallyReadable: true,
      isExternallySettable: true,
    },
    {
      path: "detailCtaClickedType",
      dataType: "string",
      propertiesPanelDisplay: undefined,
      isExternallyReadable: true,
      isExternallySettable: true,
    },
    {
      path: "latestClickType",
      dataType: "string",
      propertiesPanelDisplay: undefined,
      isExternallyReadable: true,
      isExternallySettable: true,
    },
  ],
  events: [
    {
      label: "On Primary Row CTA Click",
      path: "onPrimaryCTAClick",
    },
    {
      label: "On Detail Row CTA Click",
      path: "onDetailRowCTAClick",
    },
  ],
} satisfies ComponentConfig;
