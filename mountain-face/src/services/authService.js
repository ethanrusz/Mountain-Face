import axios from "axios";
import jwt_decode from "jwt-decode";

const API_URL = "http://localhost:5000/";

class AuthService {
    login(username, password) {
        return axios
            .post(  API_URL + "login", { username, password })
            .then((response) => {
                if (response.data.accessToken) {
                    localStorage.setItem("mfAccessToken", JSON.stringify(response.data.accessToken));
                    return response.data;
                } else {
                    return null;
                }
            }).catch(err => {
                console.log('API failed:' + err)
                return null;
            });
    }

    logout() {
        localStorage.removeItem("mfAccessToken");
    }

    getTokenData() {
        if (this.hasLocalToken()){
            return jwt_decode(this.getLocalToken());
        } else {
            return null;
        }
    }

    getLocalToken() {
        if (localStorage.getItem('mfAccessToken') === '' || localStorage.getItem('mfAccessToken') !== null){
            return JSON.parse(localStorage.getItem('mfAccessToken'));
        } else {
            return null;
        }
    }

    hasLocalToken() {
        return localStorage.getItem('mfAccessToken') === '' || localStorage.getItem('mfAccessToken') !== null;
    }
}

export default new AuthService();
