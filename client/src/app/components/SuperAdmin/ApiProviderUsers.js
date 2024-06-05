// ApiProvider.js

const apiUrl = process.env.NEXT_PUBLIC_BASE_URL;; 

const dataProvider = {
  getList: (resource, params) => {
    const url = `${apiUrl}/${resource}`;
    return fetch(url)
      .then((response) => response.json())
      .then((json) => ({
        data: json,
        total: json.length 
      }));
  },
  getOne: (resource, params) => {
    const url = `${apiUrl}/${resource}/${params.id}`;
    return fetch(url)
      .then((response) => response.json())
      .then((json) => ({
        data: json,
      }));
  },

  create: (resource, params) => {
    const url = `${apiUrl}/${resource}`;
    const options = {
      method: "POST",
      body: JSON.stringify(params.data),
      headers: {
        "Content-Type": "application/json",
      },
    };

    return fetch(url, options)
      .then((response) => response.json())
      .then((json) => ({
        data: { ...params.data, id: json.id }
      }));
  },
  update: (resource, params) => { 
    const url = `${apiUrl}/${resource}/${params.id}`;
    const options = {
      method: "PUT", 
      body: JSON.stringify(params.data),
      headers: {
        "Content-Type": "application/json",
      },
    };

    return fetch(url, options)
      .then((response) => response.json())
      .then((json) => ({
        data: json,
      }));
  },
  delete: (resource, params) => {
    const url = `${apiUrl}/${resource}/${params.id}`;
    const options = {
      method: "DELETE",
    };

    return fetch(url, options)
      .then((response) => response.json())
      .then((json) => ({
        data: json,
      }));
  },

  deleteMany: (resource, params) => {
    const url = `${apiUrl}/${resource}`;
    const options = {
      method: "DELETE",
      body: JSON.stringify(params.ids),
    };

    return fetch(url, options)
      .then((response) => response.json())
      .then((json) => ({
        data: json,
      }));
  },
};

export default dataProvider;