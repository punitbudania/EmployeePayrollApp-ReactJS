import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import profile1 from "../../assets/Ellipse -1.png";
import profile2 from "../../assets/Ellipse -2.png";
import profile3 from "../../assets/Ellipse -3.png";
import profile4 from "../../assets/Ellipse -8.png";
import deleteIcon from "../../assets/delete-black-18dp.svg";
import editIcon from "../../assets/create-black-18dp.svg";
import EmployeeService from "../../service/EmployeeService";
import "./Home.css";

class Display extends React.Component {
  constructor(props) {
    super(props);
    this.employeeService = new EmployeeService();
}

getProfilePic = (profile) => {
    let index = profile.split("-")[2].split(".")[0];
    switch (index) {
      case "1":
        return profile1;
      case "2":
        return profile2;
      case "3":
        return profile3;
      case "4":
        return profile4;
    }
};

remove = (employeeObject) => {
    this.props.deleteEmployee(employeeObject);
};

update = (employeeObject) => {
    this.props.updateEmployee(employeeObject);
};

componentDidMount() {
    this.render();
}

render() {
    return (
      <table id="table-display" className="table">
        <tbody>
          <tr key={-1}>
            {/* <th></th> */}
            <th>Name</th>
            <th>Gender</th>
            <th>Department</th>
            <th>Salary</th>
            <th>Actions</th>
          </tr>
          {this.props.employeeArray &&
            this.props.employeeArray.map((element) => (
              <tr key={element.employeeId}>
                {/* <td><img className="profile" alt="" src={this.getProfilePic(element.profile)}/></td> */}
                <td>{element.name}</td>
                <td>{element.gender}</td>
                <td>
                  {element.departments &&
                    element.departments.map((department) => (
                      <div className="dept-label">{department}</div>
                    ))}
                </td>
                <td>{element.salary}</td>
                <td><img onClick={() => this.remove(element)} alt="delete" src={deleteIcon}/>
                <img onClick={() => this.update(element)} alt="edit" src={editIcon}/></td>
              </tr>
            ))}
        </tbody>
      </table>
    );
  }
}

export default Display;