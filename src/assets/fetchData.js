import axios from "axios";

export default async function fetchData() {
  return await axios.get("http://172.16.0.60:38080/api/open/module/list", {
    headers: {
      Authorization: "Bearer dGVzdG1hbmFnZXI=",
    },
  });
}
