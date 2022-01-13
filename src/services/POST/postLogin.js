import { axios } from "axios";

const postLogin = async (values) => {
    // POST request using fetch with async/await
    //console.log(values);
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
    };
    const response = await fetch('https://testing--environment.herokuapp.com/API/authentication/login_user', requestOptions);
    const data = await response.json();
    console.log(data);
}

export default postLogin;