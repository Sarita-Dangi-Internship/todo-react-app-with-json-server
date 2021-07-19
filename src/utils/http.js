import axios from "axios";

import configs from "../config";

const http = axios.create({
  headers: { "Content-Type": "application/json" },
  baseURL: configs.baseURI,
});

export default http;
