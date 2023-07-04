export const getDataLocStor = (key) => {
  try {
    const data = localStorage.getItem(key);
    return data === null ? undefined : JSON.parse(data);
  } catch (error) {
    console.error(error);
  }
};

export const setDataLocStor = (key, data) => {
  try {
    const dataJson = JSON.stringify(data);
    localStorage.setItem(key, dataJson);
  } catch (error) {
    console.error(error);
  }
};
