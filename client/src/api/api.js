import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://52.78.145.37:8080', //기본 URL
  timeout: 5000,
});

export const getPosts = (page) => {
  return instance.get(`/post/free?page=${page}`);
};

export const postPosts = (type, title, body, open, img = null) => {
  const formData = new FormData();

  const jsonData = {
    type: type,
    title: title,
    body: body,
    open: open
  };

  formData.append('json', new Blob([JSON.stringify(jsonData)], { type: 'application/json' }));
  
  formData.append('image', img)
  formData.append('image', img)

  return instance.post(`/post/10`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  });
}

