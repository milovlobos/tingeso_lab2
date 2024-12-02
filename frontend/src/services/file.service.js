import http from "../http-common";

const uploadFile = (id, type, file) => {
  const formData = new FormData();
  formData.append("file", file);

  return http.post(`/api/file/upload/${id}/${type}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const downloadFile = (id, type) => {
  return http.get(`/api/file/download/${id}/${type}`, {
    responseType: "blob", // Esto asegura que el archivo se reciba en formato binario
  });
};

const deleteFiles = (id) => {
  return http.delete(`/api/file/delete/${id}`);
};

const getFilesByCreditId = (creditId) => {
  return http.get(`/api/file/list/${creditId}`);
};

export default {
  uploadFile,
  downloadFile,
  deleteFiles,
  getFilesByCreditId,
};
