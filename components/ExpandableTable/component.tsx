import React, { useState } from "react";
import {
  DollarOutlined,
  DownOutlined,
  FilePdfOutlined,
  FlagOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import { TableColumnsType, Tooltip } from "antd";
import { Badge, Dropdown, Space, Table } from "antd";
import {
  DataType,
  ExpandedDataType,
  FurnitureCategory,
  FurnitureItem,
  FurnitureItemsByCategoryID,
} from "./types/types";
import { useSuperblocksContext } from "@superblocksteam/custom-components";
import { type Props, type EventTriggers } from "./types";
import { useDisclosure } from "@mantine/hooks";
import { Modal, Button, Group, MantineProvider, Textarea } from "@mantine/core";
import cloneDeep from "lodash/cloneDeep";
import "./main.css";

const actionTypes = {
  DOWNLOAD_PDF: "DOWNLOAD_PDF",
  FLAG_TO_MANAGEMENT: "FLAG_TO_MANAGEMENT",
  NOTES: "NOTES",
};

const clickTypes = {
  PRIMARY: "PRIMARY",
  DETAIL: "DETAIL",
};

function DollarDisplay({ value }: { value: number }) {
  return (
    <div className="flex items-center gap-x-1.5">
      <DollarOutlined style={{ color: "#237804" }} />
      <div>
        {Number(value)
          .toFixed(2)
          .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
      </div>
    </div>
  );
}

const PercentageDisplay = ({ decimal }) => {
  // Function to format decimal number to percentage
  const formatToPercentage = (number) => {
    if (number !== null && !isNaN(number)) {
      return Math.round(number * 100) + "%";
    }
    return "0.00%";
  };

  return (
    <div>
      <h2>{formatToPercentage(decimal)}</h2>
    </div>
  );
};

// NOTE: This component assumes you know the shape of the data up front
// The columns are hardcoded into the render function for each table

export default function component({
  furnitureCategoryData,
  furnitureItemsData,
  primaryCtaClickedType,
  primaryRowClicked_data,
  detailRowClicked_data,
  latestClickType,
}) {
  const {
    updateProperties,
    events: { onPrimaryCTAClick, onDetailRowCTAClick },
  } = useSuperblocksContext<Props, EventTriggers>();

  const updateRowClicked = (primary: boolean, record, rowIndex, objectKey?) => {
    if (primary) {
      updateProperties({
        primaryRowClicked_data: {
          index: rowIndex,
          data: record,
        },
        latestClickType: clickTypes.PRIMARY,
      });
    } else {
      updateProperties({
        detailRowClicked_data: {
          objectKey,
          index: rowIndex,
          data: record,
        },
        latestClickType: clickTypes.DETAIL,
      });
    }
  };

  const [opened, { open, close }] = useDisclosure(false);

  const openNotesModalPrimary = () => {
    updateProperties({ primaryCtaClickedType: actionTypes.NOTES });
    onPrimaryCTAClick();
    open();
  };

  const openNotesModalDetail = () => {
    updateProperties({ detailCtaClickedType: actionTypes.NOTES });
    onDetailRowCTAClick();
    open();
  };

  const handleModalClose = () => {
    const notes = value;
    console.log(notes);
    if (latestClickType === clickTypes.PRIMARY) {
      const { index, data } = primaryRowClicked_data;
      const newFurnitureCategoryData = cloneDeep(furnitureCategoryData);
      newFurnitureCategoryData[index].Notes = notes;
      updateProperties({ furnitureCategoryData: newFurnitureCategoryData });
    } else {
      const { objectKey, index, data } = detailRowClicked_data;
      const newFurnitureItemsData = cloneDeep(furnitureItemsData);
      newFurnitureItemsData[objectKey][index].Notes = notes;
      // console.log(newFurnitureItemsData);
      updateProperties({ furnitureItemsData: newFurnitureItemsData });
    }
    setValue("");
    close();
  };

  const handlePrimaryDownloadPDFClick = () => {
    updateProperties({ primaryCtaClickedType: actionTypes.DOWNLOAD_PDF });
    // TODO: also update the currentRow property to the clicked row
    onPrimaryCTAClick();
  };

  const handlePrimaryFlagClick = () => {
    updateProperties({ primaryCtaClickedType: actionTypes.FLAG_TO_MANAGEMENT });
    // TODO: also update the currentRow property to the clicked row
    onPrimaryCTAClick();
  };

  const handleDetailFlagClick = () => {
    updateProperties({ detailCtaClickedType: actionTypes.FLAG_TO_MANAGEMENT });
    onDetailRowCTAClick();
  };

  const expandedRowRender = (childrenColumnName) => {
    const columns: TableColumnsType<FurnitureItem> = [
      { title: "Product Name", dataIndex: "Name", key: "Name" },
      { title: "Launch Date", dataIndex: "LaunchDate", key: "LaunchDate" },
      {
        title: "Total Revenue",
        dataIndex: "TotalRevenue",
        key: "TotalRevenue",
        render: (_, { TotalRevenue }) => <DollarDisplay value={TotalRevenue} />,
      },
      {
        title: "Gross Margin",
        dataIndex: "GrossMargin",
        key: "GrossMargin",
        render: (_, { GrossMargin }) => (
          <PercentageDisplay decimal={GrossMargin} />
        ),
      },
      {
        title: "Action",
        key: "operation",
        render: () => (
          <div className="flex flex-row justify-start gap-x-1.5">
            <a>
              <Tooltip title="Flag to Management">
                <FlagOutlined onClick={handleDetailFlagClick} />
              </Tooltip>
            </a>
            {/* NOTE for Anton - We will add in the component below during the example video */}
            <a>
              <Tooltip title="View/Add Notes">
                <FileTextOutlined onClick={openNotesModalDetail} />
              </Tooltip>
            </a>
          </div>
        ),
      },
    ];

    const dataIndex = childrenColumnName["key"];

    const data = furnitureItemsData[dataIndex];

    return (
      <Table
        onRow={(record, rowIndex) => {
          return {
            onClick: (event) => {
              console.log("row clicked", record, rowIndex);
              updateRowClicked(false, record, rowIndex, dataIndex);
            }, // click row
          };
        }}
        columns={columns}
        dataSource={data}
        pagination={false}
      />
    );
  };

  const columns: TableColumnsType<FurnitureCategory> = [
    // { title: "ID", dataIndex: "ID", key: "ID" },
    { title: "Product Category", dataIndex: "Name", key: "Name" },
    {
      title: "Product Count",
      dataIndex: "NumberOfItems",
      key: "NumberOfItems",
    },
    {
      title: "Total Revenue",
      dataIndex: "TotalRevenue",
      key: "TotalRevenue",
      render: (_, { TotalRevenue }) => <DollarDisplay value={TotalRevenue} />,
    },
    {
      title: "Gross Margin",
      dataIndex: "GrossMargin",
      key: "GrossMargin",
      render: (_, { GrossMargin }) => (
        <PercentageDisplay decimal={GrossMargin} />
      ),
    },
    {
      title: "Average Price",
      dataIndex: "AveragePrice",
      key: "AveragePrice",
      render: (_, { AveragePrice }) => <DollarDisplay value={AveragePrice} />,
    },
    {
      title: "Top Selling Item",
      dataIndex: "TopSellingItem",
      key: "TopSellingItem",
    },
    {
      title: "Actions",
      key: "operation",
      render: () => (
        <div className="flex flex-row justify-start gap-x-2">
          <a>
            <Tooltip title="Download PDF">
              <FilePdfOutlined onClick={handlePrimaryDownloadPDFClick} />
            </Tooltip>
          </a>
          <a>
            <Tooltip title="Flag to Management">
              <FlagOutlined onClick={handlePrimaryFlagClick} />
            </Tooltip>
          </a>
          <a>
            <Tooltip title="View/Add Notes">
              <FileTextOutlined onClick={openNotesModalPrimary} />
            </Tooltip>
          </a>
        </div>
      ),
    },
  ];

  const data = furnitureCategoryData;
  const relevantNotes =
    latestClickType === clickTypes.PRIMARY
      ? primaryRowClicked_data?.data?.Notes ?? ""
      : detailRowClicked_data?.data?.Notes ?? "";

  console.log(relevantNotes);

  const [value, setValue] = useState(relevantNotes);

  // console.log(data);
  return (
    <>
      <MantineProvider>
        {/* NOTE for Anton - We will add in the component below during the example video */}
        <Modal
          opened={opened}
          onClose={handleModalClose}
          title="Notes"
          fullScreen
          transitionProps={{ transition: "fade", duration: 200 }}>
          <Textarea
            value={value}
            onChange={(event) => setValue(event.currentTarget.value)}
          />
        </Modal>
      </MantineProvider>
      <Table
        onRow={(record, rowIndex) => {
          return {
            onClick: (event) => {
              console.log("row clicked", record, rowIndex);
              updateRowClicked(true, record, rowIndex);
            }, // click row
          };
        }}
        columns={columns}
        expandable={{ expandedRowRender, defaultExpandedRowKeys: ["0"] }}
        dataSource={data}
      />
    </>
  );
}
