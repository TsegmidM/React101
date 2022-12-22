import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import moment from "moment/moment";
import { useNavigate, useParams } from "react-router-dom";
import { Table, Button } from "antd";
export default function CrudEmpUsingApi() {
  const [employeeList, setEmployeeList] = useState([]);
  const navigate = useNavigate();
  const { employeeId } = useParams();

  useEffect(() => {
    fetchEmployeesList();
  }, []);
  const fetchEmployeesList = () => {
    axios
      .create({
        baseURL: "https://bark-backend.azurewebsites.net",
        headers: {
          Authorization: "Bearer k9DmN1IlWuW1ZL7-hPLm1vvtWNA34BgY_a2-KZz6YVk",
        },
      })
      .post("/api/employee/list", {
        pagination: { current: 1, pageSize: 10 },
        sorter: { field: "firstName", order: "descend" },
        search: "",
        isActive: true,
      })
      .then((res) => {
        if (res.status === 200) {
          setEmployeeList(res.data.data);
          console.log(res.data.data);
        }
      })
      .catch((err) => {
        if (err.status === 404) {
          console.error("Either your endpoint is wrong or no data found!");
        }
      })
      .finally((finallyP) => {
        console.log("request is completed!", finallyP);
      });
  };
  return (
    <div>
      <pre>{JSON.stringify(employeeList, null, 2)}</pre>
      <button>+ New Employee</button>
      <Table
        dataSource={employeeList}
        columns={[
          {
            title: "Name",
            dataIndex: "firstName",
            render: (firstName, emplInfo) => {
              return (
                <span style={{ fontSize: 10 }}>
                  {firstName} {emplInfo.lastName}
                </span>
              );
            },
          },
          {
            title: "Email",
            dataIndex: "email",
          },
          {
            title: "Phone",
            dataIndex: "phone",
          },
          {
            title: "Role",
            dataIndex: "role",
          },
          {
            title: "Created Date",
            dataIndex: "createdDate",
            render: (createdDate) => {
              return (
                <span>{moment(createdDate).format("MM/DD/YYYY HH:mm")}</span>
              );
            },
          },
          {
            title: "Status",
            dataIndex: "deactivatedDate",
            render: (deactivatedDate) => {
              return <span>{deactivatedDate ? "Active" : "Inactive"}</span>;
            },
          },
          {
            render: (emplInfo) => {
              return (
                <Button
                  type="primary"
                  onClick={() => {
                    navigate(`${emplInfo.Id}`);
                    console.log(emplInfo.Id)
                  }}
                >
                  Edit
                </Button>
              );
            },
          },
        ]}
      ></Table>
      {/* <table>
        <thead>
          <tr>
            <th colSpan="2">Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Role</th>
            <th>Created Date</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {employeeList.map((employee, idx) => {
            return (
              <tr key={idx}>
                <td>{employee.firstName}</td>
                <td>{employee.lastName}</td>
                <td>{employee.email}</td>
                <td>{employee?.phone ? employee?.phone : "-"}</td>
                <td>{employee.role}</td>
                <td>
                  {moment(employee.createdDate).format("MM/DD/YYYY h:m A")}
                </td>
                <td>{employee?.deactivatedDate ? "Active" : "Inactive"}</td>
                <td>
                  <button
                    onClick={() => {
                      navigate(`${employee.id}`);
                    }}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table> */}
    </div>
  );
}
