import React, { useState, useEffect } from "react";
import { Table } from "antd";
import qs from "qs";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import type { FilterValue, SorterResult } from "antd/es/table/interface";
import "./products.css";
import ProductService from "../../services/products.service";
import { formatPrice } from "../../common/formatPrice";
import { IProduct } from "../../types/interface";



interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Record<string, FilterValue>;
}

const Products = (): JSX.Element => {
  const columns: ColumnsType<IProduct> = [
    {
      title: "Image",
      dataIndex: "image",
      render: (dataIndex) => (
        <img style={{height:'100%',width:"100%", objectFit:'cover'}} src={dataIndex} alt=""/>
      ),
      width: "10%",
    },
    {
      title: "Name",
      dataIndex: "name",
      width: "20%",
    },
    {
      title: "Price",
      dataIndex: "price",
      render: (dataIndex) => (<span>{formatPrice(dataIndex)}</span>),
      width: "15%",
      sorter: (a:any, b:any) =>(Number(a.price) - Number(b.price))
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
      sorter: (a:any, b:any) =>(Number(a.stock) - Number(b.stock))

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
  const productService = new ProductService();
  const [data, setData] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  const fetchData = async () => {
    setLoading(true);
    const data:any = await productService.getAllProducts();

    setData(data);
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
    sorter: SorterResult<IProduct>
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
