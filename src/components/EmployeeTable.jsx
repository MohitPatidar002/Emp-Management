

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EmployeeTable = () => {
  const [employee, setEmployee] = useState([]);
  const [departmentData, setDepartmentData] = useState([]);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
  const [showDepartments, setShowDepartments] = useState(false);
  const [searchName, setSearchName] = useState('');
  const [searchLocation, setSearchLocation] = useState('');

  const getAllUser = async () => {
    try {
      const res = await axios.get('http://localhost:4000/api/profile/getAllUser');
      const data = res.data?.getAllUserData;
      const filteredData = data.filter((user) => user.role === 'employee');
      console.log("filteredDAta", filteredData)
      setEmployee(filteredData);
    } catch (error) {
      console.log("Error in getting employee details: ", error);
    }
  };

  const getAllDepartment = async () => {
    try {
      const res = await axios.get('http://localhost:4000/api/department/getAllDepartment');
      setDepartmentData(res.data?.getAllDepartment);
    } catch (error) {
      console.log("Error while getting department data:", error);
    }
  };

  const assignDepartment = async (userId, id) => {
    try {
      console.log("user id", userId)
      console.log("depa id", id)
      const res = await axios.post('http://localhost:4000/api/department/assingDepartment', 
      { userId, id });
      setDepartmentData(res.data?.getAllDepartment);
    } catch (error) {
      console.log("Error while assigning department to the employee:", error);
    }
  };

  useEffect(() => {
    getAllUser();
    getAllDepartment();
  }, [assignDepartment]);

  const toggleDepartments = (employeeId) => {
    setShowDepartments(selectedEmployeeId === employeeId ? !showDepartments : true);
    setSelectedEmployeeId(employeeId);
  };

  // Filter employees by name and location
  const filteredEmployees = employee.filter(emp =>
    emp.name.toLowerCase().includes(searchName.toLowerCase()) &&
    emp.city.toLowerCase().includes(searchLocation.toLowerCase())
  );

  return (
    <div className="">
      <div className="flex justify-between mb-4">
        <div>
          <input
            type="text"
            placeholder="Search by name"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            className="border px-2 py-1"
          />
          <input
            type="text"
            placeholder="Search by location"
            value={searchLocation}
            onChange={(e) => setSearchLocation(e.target.value)}
            className="border px-2 py-1 ml-2"
          />
        </div>
      </div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="border">
          <tr>
            <th scope="col" className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th scope="col" className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
            <th scope="col" className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
            <th scope="col" className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
            <th scope="col" className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
            <th scope="col" className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {filteredEmployees.map((employee, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap">{employee.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{employee.contact}</td>
              <td className="px-6 py-4 whitespace-nowrap">{employee.email}</td>
              <td className="px-6 py-4 whitespace-nowrap">{employee.city}</td>
              <td className="px-6 py-4 whitespace-nowrap">{employee.role}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {employee.department ?
                  employee.department.department_Name :
                  <div>
                    <button
                      onClick={() => toggleDepartments(employee._id)}
                      className="group border px-3 py-1 bg-blue-600 text-white rounded-sm shadow-md"
                    >
                      Assign
                    </button>
                    {showDepartments && selectedEmployeeId === employee._id && departmentData && (
                      <div className='group-hover:flex'>
                        {departmentData.map((element, index) => (
                          <div key={index} onClick={() => assignDepartment(selectedEmployeeId, element._id)}
                          className='hover:bg-slate-200 cursor-pointer'>
                            {element.department_Name}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                }
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;
