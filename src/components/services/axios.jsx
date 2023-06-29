import axios from "axios";

axios.defaults.baseURL = "https://myfakeapi.com/api/";

export const getAllCars = async () => {
  try {
    const allCars = await axios.get("cars");
    return allCars.data.cars;
  } catch (err) {
    console.error(err);
  }
};

export const getCarById = async (id) => {
  try {
    const currentCar = await axios.get(`cars/${id}`);
    // console.log(currentCar.data.Car);
    return currentCar.data.Car;
  } catch (err) {
    console.error(err);
  }
};
