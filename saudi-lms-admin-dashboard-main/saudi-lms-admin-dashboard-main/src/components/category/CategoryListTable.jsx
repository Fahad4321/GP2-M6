import React, { useEffect, useState } from "react";
import { Select, Space, Table, Input } from "antd";
import {
  deleteCategoryRequest,
  getAllCategoriesRequest,
} from "../../APIRequest/categoryAPIRequest.js";
import { Link } from "react-router-dom";

const { Search } = Input;
const CategoryListTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [perPage, setPerPage] = useState(10);

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: perPage,
    total: 0,
    onChange: (page, pageSize) => {
      fetchData(page, pageSize);
    },
  });

  useEffect(() => {
    fetchData(pagination.current, pagination.pageSize);
  }, []);

  const handleChange = (value) => {
    setPerPage(() => value);

    fetchData(1, value);
  };

  const deleteHandler = async (id) => {
    if (confirm("Are you sure to delete?")) {
      let DeleteResult = await deleteCategoryRequest(id);

      if (DeleteResult) {
        fetchData(1, perPage);
      }
    }
  };

  const onSearch = async (value) => {
    if (!value) {
      fetchData(1, pagination.pageSize, "0");
    } else {
      fetchData(1, pagination.pageSize, value);
    }
  };

  const fetchData = async (page, pageSize, keyword) => {
    setLoading(true);
    const response = await getAllCategoriesRequest(page, pageSize, keyword);

    setLoading(false);
    setData(response.data[0].Rows);
    setPagination({
      ...pagination,
      current: page,
      pageSize: pageSize,
      total: response.data[0].Total[0].count,
    });
  };

  let counter = 0;
  const columnsConfig = [
    {
      title: "Serial",
      key: "index",
      render: () => <span>{++counter}</span>,
    },
    {
      title: "Category Name",
      dataIndex: "name",
      key: "name",
      defaultSortOrder: "descend",
    },

    {
      title: "Action",
      dataIndex: "_id",
      render: (value) => (
        <Space wrap key={value}>
          <Link
            to={`/admin/category/update?id=${value}`}
            className="bg-primary-color text-white p-1 rounded"
          >
            Update
          </Link>
          <span
            onClick={() => deleteHandler(value)}
            style={{ cursor: "pointer" }}
            className="bg-danger text-white p-1 rounded"
          >
            Delete
          </span>
        </Space>
      ),
    },
  ];

  return (
    <>
      <div className="d-flex justify-content-between my-4">
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
        columns={columnsConfig}
        dataSource={data}
        pagination={pagination}
        loading={loading}
        rowKey={(obj) => obj._id}
      />
    </>
  );
};

export default CategoryListTable;
