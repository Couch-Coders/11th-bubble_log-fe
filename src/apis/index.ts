import axiosInstance from 'axios'

export const axiosTest = axiosInstance.create({
  baseURL: 'https://api.sampleapis.com'
})

export const axios = axiosInstance.create({
  baseURL: 'url'
})
