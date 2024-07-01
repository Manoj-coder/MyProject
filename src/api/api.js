import axios from 'axios';
import { API_BASE_URL } from '../constants/constants';

const API_URL = API_BASE_URL;  // Update the endpoint to match your MockAPI setup

export const getItems = async () => await axios.get(API_URL);
export const getItem = async (id) => await axios.get(`${API_URL}/${id}`);
export const createItem = async (item) => await axios.post(API_URL, item);
export const updateItem = async (id, item) => await axios.put(`${API_URL}/${id}`, item);
export const deleteItem = async (id) => await axios.delete(`${API_URL}/${id}`);
