import axios from "axios";

const fetchData = async () => {
    try {
      const result = await axios.get('http://172.16.0.60:38080/api/open/module/list', {
        headers: {
          Authorization: 'Bearer dGVzdG1hbmFnZXI=',
        },
      });
      return result.data.data;
    } catch (error) {
      console.error(error);
    }
  };
  
  export default fetchData;
  