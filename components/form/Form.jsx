import { Component } from "react";
import React from "react";
import './form.css';
import logo from '../../assets/logo.png'
import EmployeeService from '../../service/EmployeeService'

class Form extends Component
{
    constructor()
    {
        super()
        this.employeeService = new EmployeeService();
        this.employeePayrollObject = {}
        this.profileRef1 = React.createRef();
        this.profileRef2 = React.createRef();
        this.profileRef3 = React.createRef();
        this.profileRef4 = React.createRef();
        this.genderRefMale = React.createRef();
        this.genderRefFemale = React.createRef();
        this.departmentRef1 = React.createRef();
        this.departmentRef2 = React.createRef();
        this.departmentRef3 = React.createRef();
        this.departmentRef4 = React.createRef();
        this.departmentRef5 = React.createRef();
        this.state = {
            id: '',
            name: '',
            departmentValue: [],
            gender: '',
            salary: '',
            // day: '1',
            // month: 'Jan',
            // year: '2021',
            notes: '',
            profile: '',
            isUpdate: false,
            nameError: ''
        }
    }

    changeValue = (Event) => {
        this.setState({[Event.target.name]: Event.target.value})
        console.log([Event.target.name] + ":" + Event.target.value)
    }

    onNameChange = (Event) => {
        console.log("value is ", Event.target.value);
        this.setState({name: Event.target.value})
        const nameRegex = RegExp('^[A-Z][a-zA-Z\\s]{2,}$');
        if(nameRegex.test(Event.target.value) || Event.target.value==='') this.setState({nameError: ''})
        else this.setState({nameError: 'Invalid Name'})
    }

    getChecked = (e) => {
        if(this.state.departmentValue.includes(e.target.value))
        {
            let index = this.state.departmentValue.indexOf(e.target.value)
            this.state.departmentValue.splice(index, 1)
        }    
        else
            this.state.departmentValue.push(e.target.value);
        console.log("departments: ", this.state.departmentValue)
    }

    validData = (data) => {
        let isValid = true;
        if (data.nameError !== '') 
        {
            isValid = false;
        }
        return isValid;
    }

    save = async (Event) => {
        Event.preventDefault();

        if (!this.validData(this.state))
        {
            console.log("Error Present");
            return;
        }

        this.employeePayrollObject = {
            employeeId: this.state.id,
            name: this.state.name,
            gender: this.state.gender,
            departments: this.state.departmentValue,
            salary: this.state.salary,
            note: this.state.notes,
            profilePic: this.state.profile
        }

        if (this.isUpdate)
        {
            this.employeeService
            .updateEmployee(this.employeePayrollObject)
            .then((data) => console.log("Data Updated Successfully"))
            .catch((error) =>
                console.log("Error Encountered while Updating the Data!"))
        }
        else
        {
            this.employeeService
            .addEmployee(this.employeePayrollObject)
            .then((data) => console.log("Data Added Successfully"))
            .catch((error) =>
                console.log("Error Encountered while Adding the Data!"))
        }

        //this.reset();
        this.props.history.push('/Home');
    }

    componentDidMount() {
        this.checkIsUpdate();
    }
    
    checkIsUpdate = () => {
        let employeePayrollJson = localStorage.getItem("editEmp");
        this.isUpdate = employeePayrollJson ? true : false;
        if (!this.isUpdate) 
        {
            return;
        }
        this.employeePayrollObject = JSON.parse(employeePayrollJson);
        this.setForm();
    };

    setForm = () => {
        this.setGender(this.employeePayrollObject.gender);
        this.setProfileUrl(this.employeePayrollObject.profile);
        this.setDepartment(this.employeePayrollObject.departments);
        this.setState({
          id: this.employeePayrollObject.employeeId,
          name: this.employeePayrollObject.name,
          profile: this.employeePayrollObject.profilePic,
          gender: this.employeePayrollObject.gender,
          departmentValue: this.employeePayrollObject.departments,
          salary: this.employeePayrollObject.salary,
          notes: this.employeePayrollObject.note,
        });
        console.log(this.state.notes);
        this.departmentValue = this.employeePayrollObject.departments;
    };

    setProfileUrl = (profileUrl) => {
        if (this.profileRef1.current.value === profileUrl) {
          this.profileRef1.current.checked = true;
        }
        if (this.profileRef2.current.value === profileUrl) {
          this.profileRef2.current.checked = true;
        }
        if (this.profileRef3.current.value === profileUrl) {
          this.profileRef3.current.checked = true;
        }
        if (this.profileRef4.current.value === profileUrl) {
          this.profileRef4.current.checked = true;
        }
    };
    
    setGender = (gender) => {
        if (this.genderRefMale.current.value === gender) {
          this.genderRefMale.current.checked = true;
        } else {
          this.genderRefFemale.current.checked = true;
        }
    };
    
    setDepartment = (departments) => {
        if (departments.includes(this.departmentRef1.current.value)) {
          this.departmentRef1.current.checked = true;
        }
        if (departments.includes(this.departmentRef2.current.value)) {
          this.departmentRef2.current.checked = true;
        }
        if (departments.includes(this.departmentRef3.current.value)) {
          this.departmentRef3.current.checked = true;
        }
        if (departments.includes(this.departmentRef4.current.value)) {
          this.departmentRef4.current.checked = true;
        }
        if (departments.includes(this.departmentRef5.current.value)) {
          this.departmentRef5.current.checked = true;
        }
    };

    reset = () => {
        this.setState({
            name: '',
            profile: '',
            gender: '',
            departmentValue: [],
            salary: '',
            notes: '',
            nameError: ''
        })
        this.resetDepartments();
        this.resetGender();
        this.resetProfileUrl();
    }

    resetProfileUrl = () => {
        this.profileRef1.current.checked = false;
        this.profileRef2.current.checked = false;
        this.profileRef3.current.checked = false;
        this.profileRef4.current.checked = false;
    };
    
    resetGender = () => {
        this.genderRefMale.current.checked = false;
        this.genderRefFemale.current.checked = false;
    };

    resetDepartments = () => {
        this.departmentRef1.current.checked = false;
        this.departmentRef2.current.checked = false;
        this.departmentRef3.current.checked = false;
        this.departmentRef4.current.checked = false;
        this.departmentRef5.current.checked = false;
    };

    render()
    {
        return(
            <div>
                <header className="header-content header">
                    <div className="logo-content">
                        <img src={logo} alt="logo"/>
                        <div>
                            <span className="emp-text">EMPLOYEE</span><br/>
                            <span className="emp-text emp-payroll">PAYROLL</span>
                        </div>
                    </div>
                </header>
                <div className="form-content">
                    <form className="form" action="#" onReset={this.reset} onSubmit={this.save}>
                        <div className="form-head">Employee Payroll Form</div>
                        <div className="row-content">
                            <label className="label text" for="name">Name</label>
                            <input className="input" type="text" id="name" name="name" value={this.state.name} onChange={this.onNameChange} placeholder="Your name.." required/>
                            <error-output className="text-error" for="text">{this.state.nameError}</error-output>
                        </div>
                        <div className="row-content">
                            <label className="label text" for="profile">Profile image</label>
                            <div className="profile-radio-content">
                                <label>
                                    <input type="radio" id="profile1" name="profile" onChange={this.changeValue}
                                            ref={this.profileRef1} value="..\assets\Ellipse -3.png" required/>
                                    <img className="profile" id="image1" src="../assets/Ellipse -3.png" alt="image1"/>
                                </label>
                                <label>
                                    <input type="radio" id="profile2" name="profile" onChange={this.changeValue}
                                            ref={this.profileRef2} value="..\assets\Ellipse 1.png" required/>
                                    <img className="profile" id="image2" src="../assets/Ellipse 1.png" alt="image2"/>
                                </label>
                                <label>
                                    <input type="radio" id="profile3" name="profile" onChange={this.changeValue}
                                            ref={this.profileRef3} value="..\assets\Ellipse -8.png" required/>
                                    <img className="profile" id="image3" src="../assets/Ellipse -8.png" alt="image3"/>
                                </label>
                                <label>
                                    <input type="radio" id="profile4" name="profile" onChange={this.changeValue}
                                            ref={this.profileRef4} value="..\assets\Ellipse -7.png" required/>
                                    <img className="profile" id="image4" src="../assets/Ellipse -7.png" alt="image4"/>
                                </label>
                            </div>       
                        </div>
                        <div className="row-content">
                            <label className="label text" for="gender">Gender</label>
                            <div>
                                <input type="radio" id="male" name="gender" value="male" ref={this.genderRefMale} onChange={this.changeValue}/>
                                <label className="text" for="male">Male</label>
                                <input type="radio" id="female" name="gender" value="female" ref={this.genderRefFemale} onChange={this.changeValue}/>
                                <label className="text" for="female">Female</label>
                            </div>
                        </div>
                        <div className="row-content">
                            <label className="label text" for="department">Department</label>
                            <div>
                                <input type="checkbox" id="hr" name="department" value="HR" ref={this.departmentRef1} onChange={this.getChecked}/>
                                <label className="text" for="hr">HR</label>
                                <input type="checkbox" id="sales" name="department" value="Sales" ref={this.departmentRef2} onChange={this.getChecked}/>
                                <label className="text" for="sales">Sales</label>
                                <input type="checkbox" id="finance" name="department" value="Finance" ref={this.departmentRef3} onChange={this.getChecked}/>
                                <label className="text" for="finance">Finance</label>
                                <input type="checkbox" id="engineer" name="department" value="Engineer" ref={this.departmentRef4} onChange={this.getChecked}/>
                                <label className="text" for="engineer">Engineer</label>
                                <input type="checkbox" id="others" name="department" value="Others" ref={this.departmentRef5} onChange={this.getChecked}/>
                                <label className="text" for="others">Others</label>
                            </div>
                        </div>
                        <div className="row-content">
                            <label className="label text" for="salary">Salary: </label>
                            <input className="input" type="text" name="salary" id="salary" value={this.state.salary} onChange={this.changeValue}/>
                        </div>
                        {/* <div className="row-content">
                            <label className="label text" for="startDate">Start Date</label>
                            <div id="date">
                                <select name="Day" id="day" onChange={this.changeValue}>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                    <option value="9">9</option>
                                    <option value="10">10</option>
                                    <option value="11">11</option>
                                    <option value="12">12</option>
                                    <option value="13">13</option>
                                    <option value="14">14</option>
                                    <option value="15">15</option>
                                    <option value="16">16</option>
                                    <option value="17">17</option>
                                    <option value="18">18</option>
                                    <option value="19">19</option>
                                    <option value="20">20</option>
                                    <option value="21">21</option>
                                    <option value="22">22</option>
                                    <option value="23">23</option>
                                    <option value="24">24</option>
                                    <option value="25">25</option>
                                    <option value="26">26</option>
                                    <option value="27">27</option>
                                    <option value="28">28</option>
                                    <option value="29">29</option>
                                    <option value="30">30</option>
                                    <option value="31">31</option>                                            
                                </select>
                                <select name="Month" id="month" onChange={this.changeValue}>
                                    <option value="Jan">January</option>
                                    <option value="Feb">Febuary</option>
                                    <option value="Mar">March</option>
                                    <option value="Apr">April</option>
                                    <option value="May">May</option>
                                    <option value="Jun">June</option>
                                    <option value="Jul">July</option>
                                    <option value="Aug">August</option>
                                    <option value="Sep">September</option>
                                    <option value="Oct">October</option>
                                    <option value="Nov">November</option>
                                    <option value="Dec">December</option>
                                </select>
                                <select name="Year" id="year" onChange={this.changeValue}>
                                    <option value="2021">2021</option>
                                    <option value="2020">2020</option>
                                    <option value="2019">2019</option>
                                    <option value="2018">2018</option>
                                    <option value="2017">2017</option>
                                    <option value="2016">2016</option>
                                </select>
                            </div>
                            <error-output className="date-error" for="startDate"></error-output>
                        </div> */}
                        <div className="row-content">
                            <label className="label text" for="notes">Notes</label>
                            <textarea name="notes" id="notes" className="input" value={this.state.notes} onChange={this.changeValue} placeholder="" style={{height: 100}}></textarea>
                        </div>
                        <div className="button-content">
                            <a href="/Home" className="resetButton button cancelButton">Cancel</a>
                            <div className="submit-reset">
                                <button type="submit" className="button submitButton" id="submitButton">{this.state.isUpdate ? 'Update':'Submit'}</button>
                                <button type="reset" className="resetButton button">Reset</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default Form;