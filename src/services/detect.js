import { request } from 'umi';

export async function detectVideo(options) {
  return request('/api/FD/video', {
    method: 'GET',
    ...(options || {}),
  });
}

export async function openCamera(options) {
  return request('/api/camera/open', {
    method: 'GET',
    ...(options || {}),
  });
}

export async function closeCamera(options) {
  return request('/api/camera/close', {
    method: 'GET',
    ...(options || {}),
  });
}

export async function startFDOnCamera(options) {
  return request('/api/FD/camera', {
    method: 'GET',
    ...(options || {}),
  });
}

export async function closeFD(options) {
  return request('/api/FD/close', {
    method: 'GET',
    ...(options || {}),
  });
}
