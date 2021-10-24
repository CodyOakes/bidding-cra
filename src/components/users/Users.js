import React from 'react'

import useAxios from '../../hooks/useAxios'
import { Link } from 'react-router-dom'
import { Tag, Button, Tooltip } from 'antd'
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
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
          },
          {
            title: 'Display Name',
            dataIndex: 'displayName',
            key: 'displayName',
          },
          {
            title: 'Phone Number',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
          },
          {
            title: 'Disabled',
            dataIndex: 'disabled',
            key: 'disabled',
            render: (disabled) => <>{disabled ? 'True' : 'False'}</>,
          },
          {
            title: 'Access Levels',
            dataIndex: 'accessLvls',
            key: 'accessLvls',
            render: (accessLvls) => (
              <>
                {accessLvls.map((accessLvl) => (
                  <Tag color={'geekblue'} key={accessLvl}>
                    {accessLvl}
                  </Tag>
                ))}
              </>
            ),
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
