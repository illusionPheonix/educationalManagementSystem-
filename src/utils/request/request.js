import { resolve } from 'path';
import { rejects } from 'assert';

// 封装axios
// 引入axios
const axios = require('axios');
const qs = require('qs');


// 配置基本地址
axios.defaults.baseURL = "http://127.0.0.1:666";

export default{
    get( url,params={} ){
        return new Promise((resolve,rejects)=>{
            axios.get(url,{params})
                 .then( response =>{
                    resolve(response.data);
                 })
                 .catch(err=>{
                     rejects(err);
                 })
        })
    },
    post( url,params={} ){
        return new Promise((resolve,rejects)=>{
            axios.post(url,qs.stringify(params))
                 .then( response =>{
                    resolve(response.data);
                 })
                 .catch(err=>{
                     rejects(err);
                 })
        })
    }
}