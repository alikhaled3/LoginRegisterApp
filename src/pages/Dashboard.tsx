import React, { useState } from 'react';
import { Button, Modal } from 'antd';


import useModal from '../hooks/useModal';
import EmployeeForm from './../component/EmployeeForm';
import EmployeeTable from './../component/EmployeeTable';
import { useAuth } from '../context/AuthContext';

const Dashboard: React.FC = () => {
  const { logout } = useAuth();
  const [employees, setEmployees] = useState<any[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);
  const { isVisible, showModal, hideModal } = useModal();

  const handleAdd = () => {
    setSelectedEmployee(null);
    showModal();
  };

  const handleEdit = (record: any) => {
    setSelectedEmployee(record);
    showModal();
  };

  const handleDelete = (id: string) => {
    setEmployees((prev) => prev.filter((emp) => emp.id !== id));
  };

  const handleSubmit = (data: any) => {
    if (selectedEmployee) {
      setEmployees((prev) =>
        prev.map((emp) => (emp.id === selectedEmployee.id ? { ...emp, ...data } : emp))
      );
    } else {
      setEmployees((prev) => [...prev, { ...data, id: Date.now().toString() }]);
    }
    hideModal();
  };

  return (
    <div>
            <Button onClick={logout} style={{ float: 'right', margin: '10px' }}>
        Logout
      </Button>
      <Button type="primary" onClick={handleAdd}>
        Add Employee
      </Button>
      <div className="">
        
      </div>
      <EmployeeTable data={employees} onEdit={handleEdit} onDelete={handleDelete} />
      <Modal title="Employee Form" visible={isVisible} onCancel={hideModal} footer={null}>
        <EmployeeForm onSubmit={handleSubmit} defaultValues={selectedEmployee} />
      </Modal>
    </div>
  );
};

export default Dashboard;