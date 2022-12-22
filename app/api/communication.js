import { create } from "apisauce";

import cache from "../utility/cache";
import authStorage from "../auth/storage";

// const ip_address = "192.168.208.225";
const ip_address = "192.168.208.130";
const port = 80;

const apiClient = create({
  baseURL: "http://" + ip_address + ":" + port,
});

apiClient.addAsyncRequestTransform(async (request) => {
  const authToken = await authStorage.getToken();
  if (!authToken) return;
  request.headers["x-auth-token"] = authToken;
});

const get = apiClient.get;
apiClient.get = async (url, params, axiosConfig) => {
  //Before
  const response = await get(url, params, axiosConfig);
  if (response.ok) {
    cache.store(url, response.data);
    return response;
  }
  const data = await cache.get(url);
  return data ? { ok: true, data } : response;
};

////////////////////////////////////////////////////////////////////////////
//                            API CLIENT 2                                //
////////////////////////////////////////////////////////////////////////////

export const sendMoveDetail = (move = "a4a9") =>
  apiClient.get("/sendMove?move=" + move);
