import React, {MouseEvent, useState} from "react";
import SignUpPresenter from "./SignUpPresenter";
import { useInput } from "../../utils";
import {useMutation} from "@apollo/react-hooks";
import { SIGNUP } from "./SignUpQuerie";
import { toast } from 'react-toastify';

const SignUpContainer = () => {
    const email = useInput("");
    const userId = useInput("");
    const password = useInput("");
    const password_confirmation = useInput("");
    const [submitting, setSubmitting] = useState(false);

    const [registerAccountMutation, {loading}] = useMutation(SIGNUP);

    const clickFunc = async (e) => {
        setSubmitting(true);
        e.preventDefault();

        if(password !== password_confirmation){
            toast("Does not match password and password_confirmation")
            return false;
        }

        const {
            data: {
                registerAccount: registerAccountResponse
            }
        } = await registerAccountMutation({variables: {
                email:email.value,
                userId:userId.value,
                password:password.value
        }});

        if(!loading){
            if(registerAccountResponse===true){
                toast("Register Success!")
                setTimeout(function(){ window.location.href="/" }, 4000);
            } else {
                setSubmitting(false);
                toast("Error!")

            }
        }

    }

    return <SignUpPresenter
        email={email}
        userId={userId}
        password={password}
        password_confirmation={password_confirmation}
        clickFunc={clickFunc}></SignUpPresenter>
}

export default SignUpContainer;