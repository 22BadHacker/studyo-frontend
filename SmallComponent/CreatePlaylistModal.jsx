'use client'
import { useState } from 'react';
import { Modal, Form, Input, Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useAppHook } from '@/context/AppProvider';

const CreatePlaylistModal = ({ visible, onCancel, onSuccess }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const { authToken } = useAppHook();

  const handleSubmit = async (values) => {
  setLoading(true);
  try {
    console.log('Form values:', values); // Debug log
    
    const formData = new FormData();
    formData.append('name', values.name);
    if (values.cover_image) {
      console.log('Cover image file:', values.cover_image[0].originFileObj); // Debug log
      formData.append('cover_image', values.cover_image[0].originFileObj);
    }

    // Log FormData contents
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }

    const response = await axios.post('http://localhost:8000/api/playlists', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${authToken}`,
      },
      withCredentials: true
    });
    
    console.log('API response:', response); // Debug log
    message.success('Playlist created successfully');
    onSuccess(response.data);
    form.resetFields();
  } catch (error) {
    console.error('Error creating playlist:', error); // Detailed error log
    console.error('Error response:', error.response); // API response error
    message.error(error.response?.data?.message || 'Failed to create playlist');
  } finally {
    setLoading(false);
  }
};



  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  return (
    <Modal
      title="Create New Playlist"
      visible={visible}
      onCancel={onCancel}
      footer={null}
    >
      <Form form={form} onFinish={handleSubmit} layout="vertical">
        <Form.Item
          name="name"
          label="Playlist Name"
          rules={[{ required: true, message: 'Please input playlist name!' }]}
        >
          <Input placeholder="My Awesome Playlist" />
        </Form.Item>
        
        <Form.Item
          name="cover_image"
          label="Cover Image"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload
            name="cover_image" // Add this
            listType="picture"
            beforeUpload={() => false}
            accept="image/*"
            maxCount={1}
            >
            <Button icon={<UploadOutlined />}>Upload Cover</Button>
          </Upload>
        </Form.Item>
        
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Create Playlist
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreatePlaylistModal;