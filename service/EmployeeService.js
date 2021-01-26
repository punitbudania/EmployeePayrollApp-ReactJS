import config from '../config/Config'
import AxiosService from './AxiosService'

class EmployeeService
{
    baseUrl = config.baseUrl

    addEmployee(data) {
        return AxiosService.postService(`${this.baseUrl}create`, data)
    }

    getAllEmployee() {
        return AxiosService.getAllEmployeeService( `${this.baseUrl}`)
    } 

    updateEmployee(data) {
        return AxiosService.updateEmployeeService(`${this.baseUrl}update/${data.employeeId}`, data)
    }

    removeEmployee(id) {
        return AxiosService.removeEmployeeService(`${this.baseUrl}delete/${id}`)
    }
}

export default EmployeeService;