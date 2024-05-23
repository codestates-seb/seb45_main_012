import axios from "axios";
import jwtDecode from "jwt-decode";
import Cookies from 'js-cookie';
// import { useDispatch } from 'react-redux';
// import { setAccessToken, setRefreshToken } from "store/authSlice.ts";

axios.defaults.withCredentials = true;

export const instance = axios.create({
  baseURL: 'http://ec2-52-78-145-37.ap-northeast-2.compute.amazonaws.com:8080',
  timeout: 5000,
});

export const getAllPosts = () => {
  return instance.get(`/post/all`);
};

export const getAlltypePosts = (type_name) => {
  return instance.get(`/post/type/${type_name}`);
};

export const getPost = (postId) => {
  return instance.get(`/post/${postId}`);
};
export const deletePost = (userId, postId) => {
  return instance.delete(`/post/${userId}/${postId}`);
};

export const getAuthPosts = () => {
  return instance.get(`/post/type/auth`);
}

export const getEnvPosts = () => {
  return instance.get(`/post/type/env`);
}

export const getUser = (userId) => {
  return instance.get(`/user/${userId}`);
};

export const deleteUser = (userId) => {
  return instance.delete(`/user/${userId}`);
}

export const postVote = (postId) => {
  return instance.post(`/vote/${postId}`);
}

export const getVote = (postId, voteId) => {
  return instance.get(`/vote/${postId}/${voteId}`);
};

export const patchVote = (postId, userId, voteId) => {
  return instance.patch(`/vote/${postId}/${userId}/${voteId}`);
}

export const getComment = (postId) => {
  return instance.get(`/comment/${postId}`);
};

export const postComment = (postId, userId, commentText) => {
  return instance.post(`/comment/${postId}/${userId}`, { body: commentText });
};

export const postPosts = (type, title, body, open, img, userId) => {
  const formData = new FormData();

  const jsonData = {
    type: type,
    title: title,
    body: body,
    open: open,
  };

  formData.append(
    "json",
    new Blob([JSON.stringify(jsonData)], { type: "application/json" })
  );
  formData.append("image", img);

  return instance.post(`/post/${userId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const postSignUp = (
  username,
  userId,
  password,
  password_question,
  password_answer
) => {
  const formData = new FormData();

  formData.append("image", null);

  const jsonData = {
    userUseId: userId,
    userName: username,
    password: password,
    passwordQuestion: password_question,
    passwordAnswer: password_answer,
  };

  formData.append(
    "json",
    new Blob([JSON.stringify(jsonData)], { type: "application/json" })
  );

  return instance.post("/user", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getCustomerPost = (userId) => {
  return instance.get(`/post/customer/${userId}`);
}

export const patchPost = (userId, postId, title, body, img) => {
  const formData = new FormData();

  const jsonData = {
    title: title,
    body: body,
  };

  formData.append(
    "json",
    new Blob([JSON.stringify(jsonData)], { type: "application/json" })
  );

  formData.append("image", img);

  return instance.patch(`/post/${userId}/${postId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

export const patchUserInform = (userId, userName, password, passwordQuestion, passwordAnswer) => {

}

export const postLogin = async ( id, password ) => {
  try {
    if ( !id && !password ) {
      return 'ID를 입력하세요.';
    } else if (!password) {
      return '비밀번호를 입력하세요.';
    }
    
    const data = {
      userUseId: id,
      password: password
    }

    const res = await axios.post('http://52.78.145.37:8080/auth/login', data, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const auth = res.headers['authorization'];
    const accessToken = auth.substring(6);
    localStorage.setItem('accessToken', accessToken);

    const refresh = res.headers['refresh'];
    Cookies.set('refreshToken', refresh);

    return true;

  } catch (error) {
    if ( error.response.status === 401) {
      return 'ID 또는 비밀번호를 잘못 입력했습니다. 입력하신 내용을 다시 확인해주세요.';
    }
    return '오류가 발생했습니다.';
  } 
}

const isValid = (token) => {
  const decodedToken = jwtDecode(token);
  const tokenExpTime = new Date(decodedToken.exp * 1000);
  const currentTime = new Date();
  return currentTime < tokenExpTime;
}

async function setHeaders(config) {
  const accessToken = localStorage.getItem('accessToken');

  if (accessToken) {
    const refreshToken = Cookies.get('refreshToken');    
    
    config.headers['Authorization'] = `Bearer ${accessToken}`;
    config.headers['Refresh'] = `${refreshToken}`;
  }

  return config;
}

instance.interceptors.request.use(
  async function (config) {
    if (config.method === 'get' ) return config;
    else {
      return await setHeaders(config);
  }
});
