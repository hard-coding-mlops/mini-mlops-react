import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

function KakaoOauth() {
    const navigate = useNavigate();
    const location = useLocation();
    const [accessToken, setAccessToken] = useState('');

    useEffect(() => {
        async function getAccessToken() {
            try {
                const params = new URL(window.location.href).searchParams;
                const code = params.get('code');

                const response = await axios.post(`${process.env.REACT_APP_UBUNTU_SERVER_URL}/user/kakao/login`, {
                    code,
                });
                console.log(response.data);
                localStorage.setItem('token', response.data.accessToken);
                localStorage.setItem('user', response.data.name);
                localStorage.setItem('profileImage', response.data.profileImage);
                toast.success('LOGIN SUCCESS');

                // 이전 페이지 경로 가져오기
                const previousPath = localStorage.getItem('previousPath');
                localStorage.removeItem('previousPath'); // 가져온 후 삭제
                if (previousPath) {
                    navigate(previousPath);
                } else {
                    navigate('/dashboard');
                }
            } catch (e) {
                console.log(e);
            }
        }
        getAccessToken();
    }, []);

    return <></>;
}

export default KakaoOauth;
// https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=&redirect_uri=&code=wR2Lm4EuNVf3o_QvfUdU62R2D46hnHZCqW7MvjeYM77Ex9r1Tk1tuOQ9Z24KPXObAAABjGepMpit1856Xp2T3g
