import axios from "axios";
import jwt_decode from "jwt-decode";

const API_URL = "http://54.208.109.55:8080/";

class AuthService {

    logout() {
        localStorage.removeItem("mfUsername");
    }

    getTokenData() {
        if (this.hasLocalToken()){
            return this.getLocalToken();
        } else {
            return null;
        }
    }

    getLocalToken() {
        console.log(localStorage.getItem('mfUsername'))
        if (localStorage.getItem('mfUsername') !== '' || localStorage.getItem('mfUsername') !== null){
            return localStorage.getItem('mfUsername');
        } else {
            return 'John Snow';
        }
    }

    hasLocalToken() {
        return localStorage.getItem('mfUsername') === '' || localStorage.getItem('mfUsername') !== null;
    }
}

export default new AuthService();
