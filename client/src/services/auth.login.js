// 백엔드에서 access token 만료 시간 및 http-only 정해주면(근데 http-only는 secure도 같이 설정해야 유의미한 보안 설정인 듯) 거기에 따라 설정,
    // 아니면 임의로 설정

import axios, { AxiosRequestConfig } from 'axios';
import Instance from '../../axiosConfig';
import Cookie from 'js-cookie';

const LogIn = async ( id, password ) => {

    try {
        const res = await Instance.post('/세부링크', {
            id: id,
            password: password
        });
        
        // 오는 데이터 확인. 
        // refreshToken 조회해보기
        const { accessToken, expiresAt } = res.data;
        // 잘 왔는지 확인 후 아래는 지우기
        console.log('accessToken', accessToken);
        // 로컬 스토리지에 저장
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('expiredTime', expiresAt); // 이름 확인 필요, 안 될 시 d
        // 로그인 후에 보내는 요청의 헤더에 공통적으로 accessToken을 추가함
        axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

        }

    catch (err) {
        console.log('err message: ', err)
    }
}

export const refresh = async (config) => {

    const refreshToken = Cookie.get('refreshToken');
    const expiresAt = localStorage.getItem('expiresAt');
    const currentTime = Math.floor(Date.now() / 1000);

    if (expiresAt > currentTime) {
        console.log("토큰 만료, 재발급 요청");
        const res = await Instance.post("/refresh", {
            headers: { Refresh: refreshToken, }
        });
        const { newAccessToken } = res.data;
        console.log("accessToken 재발급 성공: ", newAccessToken) // 확인하고 지우기
        localStorage.setItem('accessToken: ', newAccessToken);
        localStorage.setItem() // expiresAt 받아오기
        config.headers["Authorization"] = `Bearer ${newAccessToken}`; // 토근 교체
    }
    return config;     
}

export const refreshErrorHandle = ( err ) => {
    Cookie.remove('refreshToken')
}