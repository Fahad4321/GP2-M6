import React, { useEffect, useState } from "react";
import { Button, Select, Space, Table, Input, Tag } from "antd";
const { Search } = Input;
import {
  deleteRoleRequest,
  getRolesRequest,
} from "../../APIRequest/rolePermissionApiRequest.js";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const RoleList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
    onChange: (page, pageSize) => {
      fetchData(page, pageSize);
    },
  });

  const fetchData = async (page, pageSize, keyword) => {
    setLoading(true);
    const data = await getRolesRequest(keyword, page, pageSize);
    setLoading(false);
    setData(data.roles);
    setPagination({
      ...pagination,
      current: page,
      pageSize: pageSize,
      total: data.total,
    });
  };

  useEffect(() => {
    fetchData(pagination.current, pagination.pageSize);
  }, []);

  const deleteHandler = async (roleId, name) => {
    const isConfirm = window.confirm(
      "Are you sure delete - " + name + "- role"
    );
    if (isConfirm) {
      const result = await deleteRoleRequest(roleId);
      if (result) {
        await fetchData(1, 10);
      }
    }
  };

  const handleChange = (value) => {
    fetchData(1, value);
  };
  const onSearch = async (value) => {
    if (!value) {
      fetchData(1, pagination.pageSize, "0");
    } else {
      fetchData(1, pagination.pageSize, value);
    }
  };

  const columns = [
    {
      title: "Role Name",
      dataIndex: "name",
      key: "name",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.name.length - b.name.length,
      render: (value) => (
        <h6 className="fw-bold text-primary-color text-uppercase">{value}</h6>
      ),
    },
    {
      title: "Total Permission",
      dataIndex: "totalPermission",
      key: "email",
      defaultSortOrder: "descend",
      render: (value, data) => (
        <Tag color="blue" className="fw-bold text-secondary-color">
          {data.name === "superadmin" ? "ALL" : value}
        </Tag>
      ),
    },

    {
      title: "Action",
      dataIndex: "_id",
      render: (value, data) => {
        if (data.name !== "superadmin") {
          return (
            <Space wrap key={value}>
              <Link
                to={`/admin/assign-permission/${data.name}`}
                state={{ roleId: value }}
                className="bg-primary-color text-white rounded px-3 py-2"
              >
                Update Permission
              </Link>
              <Button
                type="default"
                className="bg-secondary-color text-white"
                onClick={() => deleteHandler(value, data.name)}
              >
                Delete
              </Button>
            </Space>
          );
        }
      },
    },
  ];

  return (
    <>
      <div className="d-flex justify-content-between my-4">
        <div></div>
        <div className="d-flex justify-content-between align-items-center gap-3">
          <Select
            defaultValue="10 Per Page"
            style={{
              width: 120,
            }}
            onChange={handleChange}
            options={[
              {
                value: 10,
                label: "10 Per Page",
                key: 10,
              },
              {
                value: 20,
                label: "20 Per Page",
                key: 20,
              },
              {
                value: 50,
                label: "50 Per Page",
                key: 50,
              },
              {
                value: 100,
                label: "100 Per Page",
                key: 100,
              },
              {
                value: 200,
                label: "200 Per Page",
                key: 200,
              },
            ]}
          />
          <Search
            placeholder="search"
            rootClassName=""
            onSearch={onSearch}
            enterButton
          />
        </div>
      </div>
      <Table
        dataSource={data}
        pagination={pagination}
        columns={columns}
        loading={loading}
      />
    </>
  );
};

export default RoleList;
