import React, { useState, useEffect } from "react";
import { Table } from "antd";
import qs from "qs";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import type { FilterValue, SorterResult } from "antd/es/table/interface";
import "./products.css";

interface DataType {
  name: string;
  gender: string;
  email: string;
}

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Record<string, FilterValue>;
}

const columns: ColumnsType<DataType> = [
  {
    title: "Image",
    dataIndex: "image",
    width: "10%",
  },
  {
    title: "Name",
    dataIndex: "name",
    sorter: true,
    render: (name) => `${name.first} ${name.last}`,
    width: "20%",
  },
  {
    title: "Price",
    dataIndex: "price",
    width: "15%",
    sorter: true,
  },
  {
    title: "Rating",
    dataIndex: "rate",
    width: "10%",
    sorter: true,
  },
  {
    title: "Stock",
    dataIndex: "stock",
    width: "10%",
  },
  {
    title: "Action",
    dataIndex: "id",
    render: (id) => (
      <div>
        <button className="btnActionUsers">Edit</button>
        <button className="btnActionUsers">Delete</button>
        <button className="btnActionUsers">Return</button>
      </div>
    ),
    width: "20%",
  },
];

const getRandomuserParams = (params: TableParams) => ({
  results: params.pagination?.pageSize,
  page: params.pagination?.current,
  ...params,
});

const Products = (): JSX.Element => {
  const [data, setData] = useState<DataType[]>();
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  const fetchData = () => {
    setLoading(true);
    fetch(
      `https://randomuser.me/api?${qs.stringify(
        getRandomuserParams(tableParams)
      )}`
    )
      .then((res) => res.json())
      .then(({ results }) => {
        setData(results);
        setLoading(false);
        setTableParams({
          ...tableParams,
          pagination: {
            ...tableParams.pagination,
            total: 200,
            // 200 is mock data, you should read it from server
            // total: data.totalCount,
          },
        });
      });
  };

  useEffect(() => {
    fetchData();
  }, [JSON.stringify(tableParams)]);

  const handleTableChange: any = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue>,
    sorter: SorterResult<DataType>
  ) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });

    // `dataSource` is useless since `pageSize` changed
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setData([]);
    }
  };

  return (
    <section className="products">
      <div className="searchProducts">
        <input autoFocus placeholder="Search by Name..." type="text" />
      </div>
      <Table
        columns={columns}
        dataSource={data}
        pagination={tableParams.pagination}
        loading={loading}
        onChange={handleTableChange}
      />
      <div className="addProducts">
        <button className="btnActionUsers">Add+ New Product</button>
      </div>
    </section>
  );
};

export default Products;
