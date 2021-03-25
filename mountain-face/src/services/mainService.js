import axios from "axios";

const API_URL = "http://54.208.109.55:8080";
const API_POSITION_STACK = "http://api.positionstack.com/v1/forward?access_key=0cbef51ea0e7805960426db2adc3e757&query=";

class MainService {

    getRandom() {
        return axios
            .get(  API_URL + "/search/random")
            .then((response) => {
                if (response.data) {
                    return response.data;
                } else {
                    return null;
                }
            }).catch(err => {
                console.log('API failed:' + err)
                return null;
            });
    }

    getPosition(searchLoc) {
        return axios
            .get(  API_POSITION_STACK + searchLoc)
            .then((response) => {
                console.log(response);
                if (response.data) {
                    return response.data;
                } else {
                    return null;
                }
            }).catch(err => {
                console.log('API failed:' + err)
                return null;
            });
    }

    searchTerm(searchTerms) {
        return axios
            .get(  API_URL + "/search/term?searchTerms="+searchTerms)
            .then((response) => {
                if (response.data) {
                    return response.data;
                } else {
                    return null;
                }
            }).catch(err => {
                console.log('API failed:' + err)
                return null;
            });
    }

    searchLocation(lat, long, maxDistance) {
        return axios
            .get(  API_URL + "/search/location?lat=" + lat + "&long=" + long + "&maxDistance=" + maxDistance)
            .then((response) => {
                console.log(response);
                if (response.data) {
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

    addComment(id , username, text) {
        return axios
            .get(  API_URL + "/comment?id="+id + "&username=" + username + "&text=" + text)
            .then((response) => {
                if (response.data) {
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
