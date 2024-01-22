import axios from "axios";

export default async function fetchData() {
  // try {
  //   const result = axios.get("http://172.16.0.60:38080/api/open/module/list", {
  //     headers: {
  //       Authorization: "Bearer dGVzdG1hbmFnZXI=",
  //     },
  //   });
  //   return result.data.data;
  // } catch (error) {
  //   console.error(error);
  //   return [];
  // }

  return await axios.get("http://172.16.0.60:38080/api/open/module/list", {
    headers: {
      Authorization: "Bearer dGVzdG1hbmFnZXI=",
    },
  });
}
