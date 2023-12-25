import React, { useState, useEffect } from "react";
import "./users.css";

import { Tabs } from "antd";
import qs from "qs";
import { Table } from "antd";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import type { FilterValue, SorterResult } from "antd/es/table/interface";

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
    title: "Name",
    dataIndex: "name",
    sorter: true,
    render: (name) => `${name.first} ${name.last}`,
    width: "20%",
  },
  {
    title: "Gender",
    dataIndex: "gender",
    width: "20%",
  },
  {
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "Phone",
    dataIndex: "phone",
  },
  {
    title: "Status",
    dataIndex: "status",
  },
  {
    title: "Action",
    dataIndex: "id",
    render: () => (
      <div>
        <button className="btnActionUsers">Block</button>
        <button className="btnActionUsers">Unblock</button>
      </div>
    )
  },
];

const getRandomuserParams = (params: TableParams) => ({
  results: params.pagination?.pageSize,
  page: params.pagination?.current,
  ...params,
});

const Users = (): JSX.Element => {
  const onChange = (key: string) => {
    console.log(key);
  };

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

  const handleTableChange:any = (
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
    <section className="usersAdmins">
      <Tabs className="users"
        onChange={onChange}
        type="card"
        items={new Array(2).fill(null).map((_, i) => {
          const id = String(i + 1);
          if (id === "1") {
            return {
              label: `Users`,
              key: id,
              children: (
                <section className="usersGroup">
                  <div className="searchUsers">
                    <input autoFocus placeholder="Search by Name..." type="text" />
                  </div>
                  <Table
                    columns={columns}
                    dataSource={data}
                    pagination={tableParams.pagination}
                    loading={loading}
                    onChange={handleTableChange}
                  />
                </section>
              ),
            };
          } else {
            return {
              label: `Admin`,
              key: id,
              children: (
                <section className="admins">
                  <table>
                    <thead>
                      <th>#</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Gender</th>
                      <th>Position</th>
                      <th>Action</th>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1</td>
                        <td>Lam Nhat Tien</td>
                        <td>nhattienla98@gmail.com</td>
                        <td>Male</td>
                        <td>President</td>
                        <td className="adminsActions">
                          <button>Edit</button>
                          <button>Delete</button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </section>
              ),
            };
          }
        })}
      />
    </section>
  );
};

export default Users;
