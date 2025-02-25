import React, { useState } from 'react';
import { Form, Input, Button, Select, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons'; // Import an icon for the upload button
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const { Option } = Select;

const FormComponent = ({ onSubmit, fields, defaultValues = {} }) => {
  const [imagePreview, setImagePreview] = useState(null); // State to store the image preview URL
console.log(imagePreview);

  // Create a Yup validation schema dynamically based on the fields
  const schema = yup.object().shape(
    fields.reduce((acc, field) => {
      if (field.type === 'file') {
  
      } else {
        acc[field.name] = yup.string().required(`${field.label} is required`);
      }
      return acc;
    }, {})
  );

  // Initialize react-hook-form
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({ resolver: yupResolver(schema), defaultValues });

  const onError = (errors) => {
    // Display validation errors using Ant Design's message
    Object.keys(errors).forEach((field) => {
      message.error(errors[field].message);
    });
  };

  // Handle file upload
  const beforeUpload = (file) => {
    const isImage = file.type.startsWith('image/');
    if (!isImage) {
      message.error('You can only upload image files!');
    }
    return isImage; // Return false to prevent upload if not an image
  };

  const handleFileChange = (fieldName) => (info) => {
    if (info.file.status === 'done') {
      // Set the file value in react-hook-form
      setValue(fieldName, info.file.originFileObj);

      // Create a preview URL for the uploaded image
      const imageUrl = URL.createObjectURL(info.file.originFileObj);
      setImagePreview(imageUrl);
      console.log(imageUrl);
      
      
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  return (
    <Form onFinish={handleSubmit(onSubmit, onError)} layout="vertical">
      {fields.map((field) => (
        <Form.Item
          key={field.name}
          label={field.label}
          validateStatus={errors[field.name] ? 'error' : ''}
          help={errors[field.name]?.message}
        >
          {field.type === 'select' ? (
            <Controller
              name={field.name}
              control={control}
              render={({ field: { onChange, value } }) => (
                <Select onChange={onChange} value={value}>
                  <Option value="Home">Home</Option>
                  <Option value="Office">Office</Option>
                </Select>
              )}
            />
          ) : field.type === 'file' ? (
            <>
              <Controller
                name={field.name}
                control={control}
                render={({ field: { value, onChange } }) => (
                  <Upload
                    name={field.name}
                    beforeUpload={beforeUpload}
                    onChange={handleFileChange(field.name)}
                    showUploadList={false}
                  >
                    <Button icon={<UploadOutlined />}>Click to Upload</Button>
                  </Upload>
                )}
              />
              {imagePreview && (
                <div style={{ marginTop: 16 }}>
                  <img
                    src={imagePreview}
                    alt="Preview"
                    style={{ maxWidth: '100%', maxHeight: '100px', borderRadius: '5px' }}
                  />
                </div>
              )}
            </>
          ) : (
            <Controller
              name={field.name}
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input onChange={onChange} value={value} type={field.type} />
              )}
            />
          )}
        </Form.Item>
      ))}
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form>
  );
};

export default FormComponent;