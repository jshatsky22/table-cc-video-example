interface DataType {
  key: React.Key;
  name: string;
  platform: string;
  version: string;
  upgradeNum: number;
  creator: string;
  createdAt: string;
}

interface ExpandedDataType {
  key: React.Key;
  date: string;
  name: string;
  upgradeNum: string;
}

type FurnitureItem = {
  key: React.Key;
  Name: string;
  LaunchDate: string;
  TotalRevenue: number;
  GrossMargin: number;
  Price: number;
  NumberOfUnitsSold: number;
  UnitsInStock: number;
  Notes?: string;
};

type FurnitureItemsByCategoryID = {
  [categoryID: number]: FurnitureItem[];
};

type FurnitureCategory = {
  key: React.Key;
  Name: string;
  NumberOfItems: number;
  TotalRevenue: number;
  GrossMargin: number;
  AveragePrice: number;
  TopSellingItem: string;
  Notes?: string;
};

export {
  DataType,
  ExpandedDataType,
  FurnitureItem,
  FurnitureItemsByCategoryID,
  FurnitureCategory,
};
