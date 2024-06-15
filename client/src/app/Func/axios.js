import axios from "axios";

export async function axiosPostMessage(body) {
  try {
    const { data } = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/messages`, body);
    console.log("post-message:", data);
  } catch (error) {
    console.log("Error en axiosPostMessage por:", error);
  }
}

export async function axiosGetAllMessages(setAllMessages) {
  try {
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/messages`);
    // console.log("get-message:", data);
    setAllMessages(data)
  } catch (error) {
    console.log("Error en axiosGetAllMessages por:", error);
  }
}

export async function axiosGetAllUsers(setAllUsers) {
  try {
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/users`);
    // console.log("get-users:", data);
    setAllUsers(data)
  } catch (error) {
    console.log("Error en axiosGetAllUsers por:", error);
  }
}
export async function axiosGetDetailCompany(id, setCompany) {
  try {
    if (id) {
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/companies/${id}`);
      // console.log("get-companies-id:", data);
      setCompany(data)
    }
  } catch (error) {
    console.log("Error en axiosGetDetailCompany por:", error);
  }
}

//Traer todas las imagenes de Productos/Servicios de una compañia
export async function axiosGetGalleryCompanyById(companyid, setGallery) {
 
  try {
    if(companyid) {
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/gallery/${companyid}`);
      setGallery(data)
    }
  } catch (error) {
    console.log("Error en axiosGetGalleryCompanyById por: ", error);
  }
}

//ELIMINAR UNA IMAGEN DE UN PRODUCTO/SERVICIO DE UNA COMPAÑIA

export async function axiosDeleteCompanyGalleryById (id, setGallery) {
try {
  if(id) {
    await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/gallery/${id}`);
     // Actualiza la galería localmente eliminando la imagen con el publicId
     setGallery(prevGallery => prevGallery.filter(image => image.id !== id));
  }
} catch (error) {
  console.log("Error en axiosDeleteCompanyGalleryById por: ", error);
}
}

//EDITAR DESCRIPCION DE UNA IMAGEN PARA PRODUCTOS/SERVICIOS DE UNA COMPAÑIA

export async function axiosEditCompanyGalleryById (id, newDescription) {
  try {
    if(id) {
      const response = await axios.put(`${process.env.NEXT_PUBLIC_BASE_URL}/gallery/${id}`, { description: newDescription });
    return response.data;
    }
  } catch (error) {
    console.log("Error en axiosEditCompanyGalleryById por: ", error);
  }
}

//AGREGAR IMAGEN A PRODUCTOS/SERIVCIOS DE UNA COMPAÑIA


export async function axiosPostCompanyGallery(description, companyId, files) {
  try {
    
    const formData = new FormData();

    // Agregar archivos a FormData
    if (files && files.length > 0) {
      files.forEach((file, index) => {
        formData.append('files', file); 
      });
    } else {
      throw new Error("No files provided");
    }

    // Agregar otros datos a FormData
    formData.append('description', description);
    formData.append('companyId', companyId);
    
    const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/gallery/files`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    });

    return response.data;
  } catch (error) {
    console.log("Error en axiosPostCompanyGallery por: ", error);
    throw error; 
  }
}

// OBTENER EL NUMERO DE IMAGENES EN LA GALERIA DE UNA COMPAÑIA

export async function axiosGetImageCount(companyId) {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/gallery/count/${companyId}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener el número de imágenes: ", error);
    throw error; 
  }
}