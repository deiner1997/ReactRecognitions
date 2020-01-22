import axios from "axios";

export default (token, userid) => 
{ if (token && userid) { 
    axios.defaults.headers = { authorization: `bearer ${token}`, userid: userid}
} else {
    axios.defaults.headers = { authorization: "", userid: ""}
}
};