import React from 'react'

import useAxios from '../../hooks/useAxios'
import { Link } from 'react-router-dom'
import { Button, Tooltip } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { deleteUser } from '../../actions/users'

import { Table, Spin } from 'antd'

const Users = () => {
  let url = `/users`
  const [{ data, loading }, setData] = useAxios('get', url, [])

  const handleDelete = async (uid) => {
    await deleteUser(uid)
    setData(data.filter((user) => user.uid !== uid))
  }

  return loading ? (
    <Spin />
  ) : (
    <div>
      <h2>List Users</h2>
      <Table
        columns={[
          {
            title: 'First Name',
            dataIndex: 'firstName',
            key: 'firstName',
          },
          {
            title: 'Last Name',
            dataIndex: 'lastName',
            key: 'lastName',
          },
          {
            title: 'Phone Number',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
          },
          {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
          },
          {
            title: 'Edit',
            key: 'edit',
            render: (text, record) => (
              <Tooltip title='View/Edit User'>
                <Link to={`/users/${record.uid}`}>
                  <Button>
                    <EditOutlined />
                  </Button>
                </Link>
              </Tooltip>
            ),
          },
          {
            title: 'Delete',
            key: 'delete',
            render: (text, record) => (
              <Tooltip title='Delete User'>
                <Button onClick={() => handleDelete(record.uid)} danger ghost>
                  <DeleteOutlined />
                </Button>
              </Tooltip>
            ),
          },
        ]}
        dataSource={data}
        rowKey='uid'
      />
    </div>
  )
}

export default Users
