import React, { useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Upload, message, Card, Button } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

const { Dragger } = Upload;

import './index.less';

const ImgDetect = () => {
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('仅支持 JPG 或 PNG 格式的文件!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('图片大小需小于 2MB!');
    }
    return isJpgOrPng && isLt2M;
  };

  const draggerProps = {
    name: 'file',
    multiple: true,
    action: '/api/upload',
    beforeUpload,
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        setIsFileUploaded(true);
        message.success(`${info.file.name} 文件上传成功`);
      } else if (status === 'error') {
        message.error(`${info.file.name} 文件上传失败`);
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
  };

  const detect = () => {
    if (isFileUploaded) {
      //  调用后端图片检测接口
    } else {
      message.error('请先上传图片');
    }
  };

  return (
    <PageContainer>
      <Card>
        <div className="uploader">
          <Dragger {...draggerProps} className="dragger">
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">点击或拖拽图片至此区域以上传</p>
            <p className="ant-upload-hint">仅支持 JPG 或 PNG 格式的文件</p>
          </Dragger>
          <Button
            type="primary"
            shape="round"
            size="large"
            className="uploader-detect-btn"
            onClick={detect}
          >
            开始检测
          </Button>
        </div>
      </Card>
    </PageContainer>
  );
};

export default ImgDetect;
