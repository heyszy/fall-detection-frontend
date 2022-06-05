import React, { useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Upload, message, Card, Button } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { detectVideo } from '@/services/detect';

const { Dragger } = Upload;
import '../CameraDetect/index.less';
import './index.less';

const VideoDetect = () => {
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const [videoSource, setVideoSource] = useState('');
  const draggerProps = {
    name: 'file',
    multiple: false,
    action: '/api/upload',
    // beforeUpload,
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

  const detect = async () => {
    if (isFileUploaded) {
      //  调用后端图片检测接口
      let res = await detectVideo();
      console.log(res);
      if (res.code === 0) {
        message.success(`检测完成`);
        setVideoSource('/api/result/video');
      }
    } else {
      message.error('请先上传视频');
    }
  };

  return (
    <PageContainer>
      <div className="card">
        <div className="page-container">
          <div className="uploader">
            <Dragger {...draggerProps} className="dragger">
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">点击或拖拽视频至此区域以上传</p>
              {/*<p className="ant-upload-hint">仅支持 JPG 或 PNG 格式的文件</p>*/}
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
          {videoSource.length > 0 && <video className="video" controls src={videoSource}></video>}
        </div>
      </div>
    </PageContainer>
  );
};

export default VideoDetect;
