import { request } from 'umi';

export async function getStreams(options) {
  return request('http://192.168.31.140:8000/api/streams', {
    method: 'GET',
    ...(options || {}),
  });
}
