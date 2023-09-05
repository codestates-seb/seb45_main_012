// HTTP 요청에 Axios를 사용하고 사용자 정보에 LocalStorage를 사용한다.
// login() : ID, 비밀번호 POST 및 User Profile 로컬 저장소에 저장
// logout() : POST 로그아웃 요청, User PRofile 로컬 저장소에서 제거
// getCurrentUser() : 저장된 사용자 정보 가져오기

import axios from 'axios';
import Instance from '../../axiosConfig';
import { useNavigate } from 'react-router-dom'
// import AxiosInstance from '../auth/Instance';

// access token 만료 기한: 6시간, 밀리미터초
const exp_Time = 6 * 3600 * 1000;

const LogIn = async ( id, password ) => {
    try {
        const res = await Instance.post('/세부링크', {
            id: id,
            password: password
        });
        
        // 백에서 주시는 명세서 확인하기. bearer 형식이면 앞 글자 떼야 함
        const accessToekn = res.headers['authorization'];
        // 잘 왔는지 확인 후 지우기
        console.log('accessToken: ', accessToekn);
        // 로컬 스토리지에 저장
        localStorage.setItem('accessToken', accessToekn);

        // 보안을 위해서 refreshToken은 localStorage가 아닌 cookie에 저장
        const refreshToken = res.headers['refresh'];

    }
    catch (err) {
        console.log('err message: ', err)
    }
}

const SilentRefresh = () => {

}

