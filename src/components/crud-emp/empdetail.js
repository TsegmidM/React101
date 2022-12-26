import { Button, Select, Form, Input, InputNumber } from "antd";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
const { Option } = Select;
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};
/* eslint-enable no-template-curly-in-string */

export default function CRUDEmpDetail() {
  const [employeeData, setEmployeeData] = useState({});

  const { employeeId } = useParams();
  const onFinish = (values) => {
    setEmployeeData({ firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      phone: values.phone,
      role: values.role,
      locationId: values.locationId,
      countryId: values.countryId,
      address1: values.address1,
      address2: values.address2,
      city: values.city,
      state: values.state,
      zip: values.zip,
      note: values.note,})

    console.log(values);
    // axios.create({
    //   baseURL: "https://bark-backend.azurewebsites.net",
    //   headers: {
    //     Authorization: "Bearer FREYKOPAYEZxnNZVuH-LSItQeQXRMFSfS7uy6OOoYZs",
    //   },
    // }).put(`/api/employee/${employeeId}`,{ firstName: "TESTTT",
    //   lastName: "TESTTT",
    //   email:"TESTTT@yhoo.com",
    //   phone: 1231231,
    //   role: "Staff",
    //   locationId: 68,
    //   countryId: 2,
    //   address1: "Abv",
    //   address2: '',
    //   city: "Chicago",
    //   state: "Abv",
    //   zip: 60231,
    //   note: null,})
    // .then((res)=>{
    //   console.log(res)
    // })

  };
  useEffect(() => {
    axios
      .create({
        baseURL: "https://bark-backend.azurewebsites.net",
        headers: {
          Authorization: "Bearer FREYKOPAYEZxnNZVuH-LSItQeQXRMFSfS7uy6OOoYZs",
        },
      })
      .get(`/api/employee/${employeeId}`)
      .then((res) => {
        if (res.status === 200) {
          setEmployeeData({
            firstName: res.data.firstName,
            lastName: res.data.lastName,
            email: res.data.email,
            phone: res.data.phone,
            role: res.data.role,
            locationId: res.data.locationId,
            countryId: res.data.countryId,
            address1: res.data.address1,
            address2: res.data.address2,
            city: res.data.city,
            state: res.data.state,
            zip: res.data.zip,
            note: res.data.note,
          });
          console.log(res.data);
        }
      });
  }, []);
  return (
    <Form
      // {...layout}
      name="nest-messages"
      layout="vertical"
      labelCol={{ span: 16 }}
      wrapperCol={{ span: 32 }}
      onFinish={onFinish}
      validateMessages={validateMessages}
      initialValues={employeeData}
    >
      <pre>{JSON.stringify(employeeData, null, 2)}</pre>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <div>
          <h3>Account Info</h3>
          <Form.Item
            initialValue={employeeData.firstName}
            name={[employeeData.firstName, "firstName"]}
            label="First Name"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input style={{ width: 200 }} />
          </Form.Item>
          <Form.Item
            initialValue={employeeData.lastName}
            name={[employeeData.lastName, "lastName"]}
            
            label="Last Name"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input/>
          </Form.Item>
          <Form.Item
            initialValue={employeeData.email}
            name={[employeeData.email, "email"]}
            label="Email"
            rules={[
              {
                type: "email",
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            initialValue={employeeData.phone}
            name={[employeeData.phone, "phone"]}
            label="Phone Number"
            labelCol={1}
            rules={[
              {
                type: "number",
              },
            ]}
          >
            <InputNumber style={{ width: 200 }} />
          </Form.Item>
          <Form.Item
            initialValue={employeeData.role}
            name={[employeeData.role, "role"]}
            label="Staff Role"
            rules={[{ required: true }]}
          >
            <Select placeholder="Select role">
              <Option value="Manager">Manager</Option>
              <Option value="Staff">Staff</Option>
            </Select>
          </Form.Item>
          <Form.Item
            initialValue={employeeData.locationId}
            name={[employeeData.locationId, "location"]}
            label="Location"
            rules={[{ required: true }]}
          >
            <Select placeholder="Select location">
              <Option value="0">iCodice Bootcamp</Option>
            </Select>
          </Form.Item>
        </div>
        <div>
          <h3>Address</h3>
          <Form.Item
            initialValue={employeeData.countryId}
            name={[employeeData.countryId, "country"]}
            label="Country"
            rules={[{ required: true }]}
          >
            <Select placeholder="Select country">
              <Option value="0">United States</Option>
              <Option value="1">Mongolia</Option>
            </Select>
          </Form.Item>
          <Form.Item
            initialValue={employeeData.address1}
            name={[employeeData.address1, "address1"]}
            label="Street"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            initialValue={employeeData.address2}
            name={[employeeData.address2, "address2"]}
            label="Apt, ste"
            rules={[
              {
                required: false,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            initialValue={employeeData.city}
            name='city'
            label="City"
            rules={[
              {
                required: false,
              },
            ]}
          >
            <Input value={employeeData.city}
            />
          </Form.Item>
          <Form.Item
            initialValue={employeeData.status}
            name={[employeeData.state, "state"]}
            label="State"
            rules={[
              {
                required: false,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            initialValue={employeeData.zip}
            name={[employeeData.zip, "zip"]}
            label="Zip Code"
            rules={[
              {
                required: false,
              },
            ]}
          >
            <Input />
          </Form.Item>
          
          <Form.Item 
          initialValue={employeeData.note}
          name={[employeeData.note, "notes"]} label="Notes">
            <Input.TextArea placeholder="Notes" />
          </Form.Item>
        </div>
      </div>
      <Form.Item
        wrapperCol={{
          ...layout.wrapperCol,
          offset: 8,
        }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}
