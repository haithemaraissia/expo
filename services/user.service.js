import React, { useState, useEffect } from "react";
import axios from "axios";
import authHeader from "./auth-header";
import authHeaderWithType from "./auth-headerwithtype";
import useToken from './useToken';
import AuthService from './auth.service';
import * as SecureStore from 'expo-secure-store';


const API_URL = "https://respoapi.azurewebsites.net/api/";




const GetPatientProfile = (email, user) => {
return axios.get(API_URL + "PatientProfile/GetPatientProfile?email=" + email,{ headers: authHeader(user) });
}




//RTM
const getRtmCategories = (pid, user) => {
  return axios.get(API_URL + "RTMPatientRecord/GetallCategories?pid=" + pid, { headers: authHeader(user) });
};

const getRtmRecords = (pci, user) => {
  return axios.get(API_URL + "RTMPatientRecord/GetallRecordsByCategoryId?pci=" + pci, { headers: authHeader(user) });
};







//RPM
const getRpmCategories = (pid, user) => {
  return axios.get(API_URL + "RPMPatientRecord/GetallCategories?pid=" + pid, { headers: authHeader(user) });
};

const getRpmRecords = (pci, user) => {
  return axios.get(API_URL + "RPMPatientRecord/GetallRecordsByCategoryId?pci=" + pci, { headers: authHeader(user) });
};

const getRpmSingleRecord = (id, user) => {
  return axios.get(API_URL + "RPMPatientRecord/GetRecordById?id=" + id,  { headers: authHeader(user) });
};

const createRmpRecord = (pci, pid, data, user) => {
  return axios( {
    method: 'post',
    url: `${API_URL}RPMPatientRecord/AddRecord?pci=${pci}&pid=${pid}`, 
    data: data ,
    headers: authHeaderWithType(user)});
};

const deleteRpmRecord = (id, pci, pid, user) => {
  return axios( {
    method: 'delete',
    url: `${API_URL}RPMPatientRecord/DeleteRecord?id=${id}&pci=${pci}&pid=${pid}`, 
    headers: authHeader(user)});
};

const editRmpRecord = (data, user) => {
  return axios( {
    method: 'put',
    url: `${API_URL}RPMPatientRecord/UpdateRecord`, 
    data: data ,
    headers: authHeaderWithType(user)});
};



const UserService = {
  GetPatientProfile,
  getRtmCategories,
  getRtmRecords,


  getRpmCategories,
  getRpmRecords,
  getRpmSingleRecord,
  createRmpRecord,
  deleteRpmRecord,
  editRmpRecord
};

export default UserService;
