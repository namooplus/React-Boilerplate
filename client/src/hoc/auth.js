import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '../_actions/user_action';

export default function (SpecificComponent, option, adminRoute = null) {

    // option : null -> 아무나 출입 가능
    // option : true -> 로그인한 유저만 출입 가능
    // option : false -> 로그인안한 유저만 출입 가능

    function AuthenticationCheck(props) {
        const dispatch = useDispatch();

        useEffect(() => {
            dispatch(auth()).then(response => {
                console.log(response);

                // 로그인 하지 않은 상태
                if (!response.payload.isAuth) {
                    if (option) {
                        props.history.push('/login');
                    }
                }
                // 로그인 한 상태
                else {
                    if (adminRoute == true && !response.payload.isAdmin) {
                        props.history.push('/');
                    }
                    else {
                        if (option === false) {
                            props.history.push('/');
                        }
                    }
                }
            });
        }, []);

        return <SpecificComponent/>;
    }

    return AuthenticationCheck;
}