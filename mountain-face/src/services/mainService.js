import axios from "axios";
import jwt_decode from "jwt-decode";

const API_URL = "http://localhost:5000/";

class MainService {
    searchTerm(searchTerms) {
        return axios
            .post(  API_URL + "/search/term/", { searchTerms })
            .then((response) => {
                if (response.status) {
                    return response.data;
                } else {
                    return null;
                }
            }).catch(err => {
                console.log('API failed:' + err)
                return null;
            });
    }

    searchLocation(searchLoc) {
        return axios
            .post(  API_URL + "/search/location/", { searchLoc })
            .then((response) => {
                if (response.status) {
                    return response.data;
                } else {
                    return null;
                }
            }).catch(err => {
                console.log('API failed:' + err)
                return null;
            });
    }

    getDocumentByID(id) {
        return axios
            .post(  API_URL + "/document/", { id })
            .then((response) => {
                if (response.status) {
                    return response.data;
                } else {
                    return null;
                }
            }).catch(err => {
                console.log('API failed:' + err)
                return null;
            });
    }

    getImageByName(name) {
        return axios
            .post(  API_URL + "/image/", { name })
            .then((response) => {
                if (response.status) {
                    return response.data;
                } else {
                    return null;
                }
            }).catch(err => {
                console.log('API failed:' + err)
                return null;
            });
    }

    addComment(userID, heading, body) {
        return axios
            .post(  API_URL + "/comment/", { userID, heading, body})
            .then((response) => {
                if (response.status) {
                    return response.data;
                } else {
                    return null;
                }
            }).catch(err => {
                console.log('API failed:' + err)
                return null;
            });
    }
}

export default new MainService();
