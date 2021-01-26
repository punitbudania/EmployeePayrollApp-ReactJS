const axios = require('axios').default

class AxiosService {
    postService(url='', payload=null) 
    {
        return axios.post(url, payload, {headers:{contentType: 'application/json'}});
    }

    getAllEmployeeService(url='') 
    {
        return axios.get(url);
    }
    
    updateEmployeeService(url='', payload=null) 
    {
        return axios.put(url, payload, {headers:{contentType: 'application/json'}});
    }
    
    removeEmployeeService(url='') 
    {
        return axios.delete(url);
    }
}

module.exports = new AxiosService()