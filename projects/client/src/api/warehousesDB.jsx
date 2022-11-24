import axios from "axios"

const axiosInstances = axios.create({
  baseURL: "http://localhost:8000",
})

// Auth token check nanti disini tapi masih bingung

export { axiosInstances }
