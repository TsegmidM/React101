import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment/moment";
import { useNavigate, useParams} from "react-router-dom";
import { Table, Button,Row, Col, Tabs } from "antd";
import { APIKEY } from "./enum";
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
          Authorization: APIKEY.bearer,
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
        else if(err.status === 401){
          window.alert("401: Unauthorized")
        }
      })
      .finally((finallyP) => {
        console.log("request is completed!", finallyP);
      });
  };
  return (
    <div>
      {/* <pre>{JSON.stringify(employeeList, null, 2)}</pre> */}
      <Tabs
       defaultActiveKey="1"
      //  onChange={onChange}
       items={[
         {
           label: "Home",
           key: '1',
         },
        ]}>

      </Tabs>
      <Row >
        <Col offset={21} >
      <Button  type="primary" 
      onClick={()=>{
        navigate('add')
      }} >+ New Employee</Button>
      </Col>
      </Row>
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
              return <span>{deactivatedDate ? "Inactive" : "Active"}</span>;
            },
          },
          {
            render: (emplInfo) => {
              return (
                <Button
                  type="primary"
                  onClick={() => {
                    navigate(`${emplInfo?.id}`);
                  }}
                >
                  Edit
                </Button>
              );
            },
          },
        ]}
      ></Table>
    </div>
  );
}
