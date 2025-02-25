import type { PopconfirmProps } from 'antd';
import React from 'react';
import { Table, Button, Popconfirm ,message} from 'antd';

interface EmployeeTableProps {
  data: any[];
  onEdit: (record: any) => void;
  onDelete: (id: string) => void;
}

const EmployeeTable: React.FC<EmployeeTableProps> = ({ data, onEdit, onDelete }) => {
  const confirm: PopconfirmProps['onConfirm'] = (e) => {
    console.log(e);
    message.success('Click on Yes');
  };
  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Work Location', dataIndex: 'workLocation', key: 'workLocation' },
    {
      title: 'Action',
      key: 'action',
      render: (text: string, record: any) => (
        <>
          <Button onClick={() => onEdit(record)}>Edit</Button>
          <Popconfirm title="Are you sure?" onConfirm={ () => onDelete(record.id)} >
            <Button danger>Delete</Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return <Table dataSource={data} columns={columns} rowKey="id" />;
};

export default EmployeeTable;