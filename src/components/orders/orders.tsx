import React, { useState, useEffect } from "react";
import { Table } from "antd";
import qs from "qs";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import type { FilterValue, SorterResult } from "antd/es/table/interface";
import "./orders.css";

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
    title: "Name User",
    dataIndex: "usersName",
    width: "20%",
    sorter: true,
  },
  {
    title: "Date",
    dataIndex: "date",
    sorter: true,
    width: "20%",
  },
  {
    title: "Price",
    dataIndex: "price",
    width: "15%",
    sorter: true,
  },
  {
    title: "Status",
    dataIndex: "status",
    width: "10%",
    render: () => (
      <select className="selectStatus">
        <option value="">Confirmed</option>
        <option value="">Shipping...</option>
        <option value="">Finished</option>
      </select>
    ),
  },
  {
    title: "Action",
    dataIndex: "id",
    render: (id) => (
      <div>
        <button className="btnActionUsers">View</button>
      </div>
    ),
    width: "10%",
  },
];

const getRandomuserParams = (params: TableParams) => ({
  results: params.pagination?.pageSize,
  page: params.pagination?.current,
  ...params,
});

const Orders = (): JSX.Element => {
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
    <section className="orders">
      <div className="searchOrders">
        <input autoFocus placeholder="Search by date..." type="text" />
      </div>
      <Table
        columns={columns}
        dataSource={data}
        pagination={tableParams.pagination}
        loading={loading}
        onChange={handleTableChange}
      />
    </section>
  );
};

export default Orders;
