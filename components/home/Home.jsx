import { Component } from "react";
import './Home.css';
import EmployeeService from '../../service/EmployeeService'
import add from '../../assets/add-24px.svg'
import Display from "./Display";

class Home extends Component
{
    constructor() {
        super();
        this.state = {
          employeeList: [],
          count: 0
        };
        this.employeeService = new EmployeeService();
    }
    
    getEmployeeList = () => {
        this.employeeService
          .getAllEmployee()
          .then((response) => {
            console.log("Data Added Successfully", response.data);
            this.setState({ employeeList: response.data.data, count: response.data.data.length });
           })
          .catch((error) => console.log("Error Encountered!"));
    };
    
    remove = (employeePayrollData) => {
        const index = this.state.employeeList.indexOf(employeePayrollData);
        let list = this.state.employeeList;
        list.splice(index, 1);
        this.setState({ employeeList: list, count: list.length });
    
        this.employeeService
          .removeEmployee(employeePayrollData.employeeId)
          .then((data) => console.log("Data Removed Successfully"))
          .catch((error) =>
            console.log("Error Encountered while Deleting the Data!")
        );
    };
    
    update = (employeePayrollData) => {
        localStorage.setItem("editEmp", JSON.stringify(employeePayrollData));
        this.props.history.push(`/`);
    };

    componentDidMount() {
        localStorage.removeItem("editEmp");
        this.getEmployeeList();
    }

    render()
    {
        return(
            <div>
                <header className="header-content header">
                    <div className="logo-content">
                        <img src="../assets/logo.png" alt="logo"/>
                        <div>
                            <span className="emp-text">EMPLOYEE</span><br/>
                            <span className="emp-text emp-payroll">PAYROLL</span>
                        </div>
                    </div>
                </header>
                <div className="main-content">
                    <div className="sub-header-content">
                        <div className="emp-detail-text">
                            Employee Details <div className="emp-count">{this.state.count}</div>
                        </div>
                        <a href="/" className="add-button">
                        <img src={add} alt="add"/>Add User</a>
                    </div>
                    <div>
                        <Display
                            updateEmployee={this.update}
                            deleteEmployee={this.remove}
                            employeeArray={this.state.employeeList}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;