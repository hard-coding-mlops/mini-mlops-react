import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function KakaoOauth() {
    const navigate = useNavigate();
    const [accessToken, setAccessToken] = useState('');

    useEffect(() => {
        async function getAccessToken() {
            try {
                const params = new URL(window.location.href).searchParams;
                const code = params.get('code');

                const response = await axios.post(`${process.env.REACT_APP_TEST_SERVER_URL}/user/kakao/login`, {
                    code,
                });

                console.log(response.data);

                localStorage.setItem('token', response.data.accessToken);
                localStorage.setItem('user', response.data.user);
                navigate('/');
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
