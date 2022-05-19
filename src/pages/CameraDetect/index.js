import React, { useEffect, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Switch } from 'antd';
import { VideoCameraAddOutlined, DesktopOutlined } from '@ant-design/icons';
import mpegts from 'mpegts.js';

import './index.less';
import { getStreams } from '@/services/stream';
import { closeCamera, closeFD, openCamera, startFDOnCamera } from '@/services/detect';

const CameraDetect = () => {
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [isFDRun, setIsFDRun] = useState(false);
  const [isCameraStream, setIsCameraStream] = useState(true);

  const videoBox = React.createRef();

  useEffect(async () => {
    // 查询摄像头推流是否开启，程序是否在运行
    let res = await getStreams();
    let { live } = res;
    // console.log(live.hasOwnProperty('FD-Camera'));
    if (live && live.hasOwnProperty('FD-Camera')) {
      setIsCameraOpen(true);
    }
    if (live && live.hasOwnProperty('FD')) {
      setIsFDRun(true);
    }
  }, []);

  const playFlv = (source) => {
    if (mpegts.getFeatureList().mseLivePlayback) {
      let player = mpegts.createPlayer({
        type: 'flv',
        isLive: true,
        url: source,
      });
      player.attachMediaElement(videoBox.current);
      player.load();
      player.play();
    }
  };

  useEffect(() => {
    if (isCameraOpen && isCameraStream) {
      playFlv('/live/FD-Camera.flv');
    } else if (isCameraOpen && isFDRun && !isCameraStream) {
      playFlv('/live/FD.flv');
    }
  }, [isCameraOpen, isCameraStream]);

  const onCameraSwitchChange = async (checked) => {
    if (checked) {
      await openCamera();
      setIsCameraOpen(true);
    } else {
      await closeCamera();
      setIsCameraOpen(false);
    }
  };

  const onFDSwitchChange = async (checked) => {
    if (checked) {
      await startFDOnCamera();
      setIsFDRun(true);
    } else {
      await closeFD();
      setIsFDRun(false);
      setIsCameraStream(true);
    }
  };

  const onSourceSwitchChange = async (checked) => {
    if (checked) {
      setIsCameraStream(true);
    } else {
      setIsCameraStream(false);
    }
  };

  return (
    <PageContainer>
      <div className="card">
        <div className="page-container">
          <div className="switch">
            <div className="switch-row">
              <span>摄像头</span>
              <Switch checked={isCameraOpen} onChange={onCameraSwitchChange} />
            </div>
            <div className="switch-row">
              <span>跌倒检测</span>
              <Switch checked={isFDRun} onChange={onFDSwitchChange} />
            </div>
            {isFDRun && (
              <div className="switch-row">
                <span>视频源</span>
                <Switch
                  checkedChildren={<VideoCameraAddOutlined />}
                  unCheckedChildren={<DesktopOutlined />}
                  checked={isCameraStream}
                  onChange={onSourceSwitchChange}
                />
              </div>
            )}
          </div>
          {<video className="video" controls src="" ref={videoBox}></video>}
        </div>
      </div>
    </PageContainer>
  );
};

export default CameraDetect;
