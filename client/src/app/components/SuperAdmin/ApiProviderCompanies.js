
const companyApiUrl = process.env.NEXT_PUBLIC_BASE_URL;;



const companyDataProvider = {
  getList: (resource, params) => {
    const url = `${companyApiUrl}/companies/${resource}`;
    return fetch(url)
      .then((response) => response.json())
      .then((json) => ({
        data: json,
      }));
  },
  getOne: (resource, params) => {
    const url = `${companyApiUrl}companies/${resource}/${params.id}`;
    return fetch(url)
      .then((response) => response.json())
      .then((json) => ({
        data: json,
      }));
  },
 
};

export default companyDataProvider;