import React, { useState, useEffect } from "react";
import { Table } from "antd";
import qs from "qs";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import type { FilterValue, SorterResult } from "antd/es/table/interface";
import "./orders.css";
import OrderService from "../../services/orders.service";
import { IOrder } from "../../types/interface";
import { formatPrice } from "../../common/formatPrice";



interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Record<string, FilterValue>;
}


const Orders = (): JSX.Element => {
  const [onOrderDetails, setOnOrderDetails] = useState<boolean>(false)
  const columns: ColumnsType<IOrder> = [
    {
      title: "Name User",
      dataIndex: "userName",
      width: "20%",
    },
    {
      title: "Date",
      dataIndex: "date",
      width: "20%",
    },
    {
      title: "Price",
      dataIndex: "totalPrice",
      render: (dataIndex) => (<span>{formatPrice(dataIndex)}</span>),
      width: "15%",
      sorter: (a:any, b:any) =>(Number(a.totalPrice) - Number(b.totalPrice))
    },
    {
      title: "Status",
      dataIndex: "status",
      width: "10%",
      render: () => (
        <select className="selectStatus">
          <option value="">Pending...</option>
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
          <button onClick={() => setOnOrderDetails(true)} className="btnActionUsers">View</button>
        </div>
      ),
      width: "10%",
    },
  ];
  const offOrderDetails = () => {
    setOnOrderDetails(false);
  }
  const getRandomuserParams = (params: TableParams) => ({
    results: params.pagination?.pageSize,
    page: params.pagination?.current,
    ...params,
  });
  const orderService = new OrderService()
  const [data, setData] = useState<IOrder[]>([]);
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  const fetchData = async () => {
    setLoading(true);
    const data:any = await orderService.getAllOrders()
   
        setData(data.reverse());
        setLoading(false);
        setTableParams({
          ...tableParams,
          pagination: {
            ...tableParams.pagination,
            total: data.length,
            // 200 is mock data, you should read it from server
            // total: data.totalCount,
          },
        });

  };

  useEffect(() => {
    fetchData();
  }, [JSON.stringify(tableParams)]);

  const handleTableChange: any = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue>,
    sorter: SorterResult<IOrder>
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
