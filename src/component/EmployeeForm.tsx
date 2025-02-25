import React from 'react';
import FormComponent from './Form';

interface EmployeeFormProps {
  onSubmit: (data: any) => void;
  defaultValues?: any;
}

const EmployeeForm: React.FC<EmployeeFormProps> = ({ onSubmit, defaultValues }) => {
  const fields = [
    { name: 'name', label: 'Name', type: 'text' },
    { name: 'workLocation', label: 'Work Location', type: 'select' },
  ];

  return <FormComponent onSubmit={onSubmit} fields={fields} defaultValues={defaultValues} />;
};

export default EmployeeForm;