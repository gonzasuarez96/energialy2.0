
const tendersApiUrl = process.env.NEXT_PUBLIC_BASE_URL;;



const tenderDataProvider = {
  getList: (resource, params) => {
    const url = `${tendersApiUrl}/tenders/${resource}`;
    return fetch(url)
      .then((response) => response.json())
      .then((json) => ({
        data: json,
      }));
  },
  getOne: (resource, params) => {
    const url = `${tendersApiUrl}/tenders/${resource}/${params.id}`;
    return fetch(url)
      .then((response) => response.json())
      .then((json) => ({
        data: json,
      }));
  },

};

export default tenderDataProvider;