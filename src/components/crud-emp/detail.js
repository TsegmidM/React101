import {
  Button,
  Select,
  Form,
  Input,
  InputNumber,
  Row,
  Col,
  Divider,
  Modal,
  notification,
} from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";

import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { APIKEY } from "./enum";
import { act } from "react-dom/test-utils";
const { Option } = Select;
const { confirm } = Modal;

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

export default function EmpDetail() {
  const [isActive, setisActive] = useState(true);
  const [form] = Form.useForm();
  const { employeeId } = useParams();
  const [action, setAction] = useState();
  const navigate = useNavigate();

  const [api, contextHolder] = notification.useNotification();
  const openNotification = (placement, message) => {
    api.info({
      message: message,
      placement,
    });
  };

  const showPromiseConfirm = (type) => {
    confirm({
      title: "Confirmation",
      icon: <ExclamationCircleFilled />,
      content: "Are you sure to proceed?",
      onOk() {
        return new Promise((resolve, reject) => {
          if (type === "activate") onFinish("activate");
          else onFinish("deactivate");
          setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
        })
          .catch(() => console.log("Oops errors!"))
          .then(() => {
            if (type === "activate")
              openNotification("topRight", "Succesfully activated the account");
            else if (type === "deactivate")
              openNotification(
                "topRight",
                "Succesfully deactivated the account"
              );
          });
      },
      onCancel() {},
    });
  };
  const onFinish = (values) => {
    if (values === "deactivate" || values === "activate") {
      axios
        .create({
          baseURL: "https://bark-backend.azurewebsites.net",
          headers: {
            Authorization: APIKEY.bearer,
          },
        })
        .put(
          `/api/employee/${employeeId}/isactive?isActive=${
            values === "activate" ? "true" : "false"
          }`
        )
        .then((res) => {
          setisActive(!isActive);
          console.log(res);
        });
    } else if (action === "create") {
      console.log(values.locationId);
      axios
        .create({
          baseURL: "https://bark-backend.azurewebsites.net",
          headers: {
            Authorization: APIKEY.bearer,
          },
        })
        .post(`/api/employee`, {
          firstName: values.firstName,
          lastName: values.lastName,
          address1: values.address1,
          address2: values?.address2,
          city: values.city,
          state: values.state,
          zip: values.zip,
          countryId: values.countryId === "Mongolia" ? 8 : 2,
          phone: values.phone,
          email: values.email,
          role: values.role,
          note: values.note,
          locationId: 68,
          password: values.password,
        })
        .then((res) => {
          openNotification("topRight", "Succesfully created the account!");
          console.log(res);
        });
    } else {
      console.log("hi22");
      axios
        .create({
          baseURL: "https://bark-backend.azurewebsites.net",
          headers: {
            Authorization: APIKEY.bearer,
          },
        })
        .put(`/api/employee/${employeeId}`, {
          firstName: values.firstName,
          lastName: values.lastName,
          address1: values.address1,
          address2: values?.address2,
          city: values.city,
          state: values.state,
          zip: values.zip,
          countryId: values.countryId === "Mongolia" ? 8 : 2,
          phone: values.phone,
          email: values.email,
          role: values.role,
          note: values.note,
          locationId: values.locationId,
        })
        .then((res) => {
          console.log(res);

          openNotification(
            "topRight",
            "Succesfully updated the employee details!"
          );
        });
    }
  };

  useEffect(() => {
    if (employeeId !== "add") {
      axios
        .create({
          baseURL: "https://bark-backend.azurewebsites.net",
          headers: {
            Authorization: APIKEY.bearer,
          },
        })
        .get(`/api/employee/${employeeId}`)
        .then((res) => {
          if (res.status === 200) {
            form.setFieldsValue({
              firstName: res.data.firstName,
              lastName: res.data.lastName,
              email: res.data.email,
              phone: res.data.phone,
              role: res.data.role,
              locationId: res.data.locationId,
              countryId:
                res.data.countryId === 8 ? "Mongolia" : "United States",
              address1: res.data.address1,
              address2: res.data.address2,
              city: res.data.city,
              state: res.data.state,
              zip: res.data.zip,
              note: res.data.note,
            });
          }
        });
    }
  }, []);
  return (
    <div>
      {contextHolder}
      <Row>
        <Col style={{ padding: "20px 20px" }}>
          <Button
            type="primary"
            onClick={() => {
              navigate("../");
            }}
          >
            {"<  "}Back
          </Button>
        </Col>
      </Row>
      <Form
        disabled={!isActive}
        form={form}
        name="nest-messages"
        layout="vertical"
        onFinish={onFinish}
        validateMessages={validateMessages}
        // initialValues={employeeData}
      >
        <Row>
          <Col style={{ padding: "0 20px" }} span={12}>
            <Divider>Account Info</Divider>
            <Row>
              <Col span={12}>
                <Form.Item
                  name="firstName"
                  label="First Name"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="lastName"
                  label="Last Name"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <Form.Item
                  name="email"
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
              </Col>
              <Col span={12}>
                <Form.Item
                  name="phone"
                  label="Phone Number"
                  labelCol={1}
                  rules={[
                    {
                      type: "number",
                    },
                  ]}
                >
                  <InputNumber />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <Form.Item
                  name="role"
                  label="Staff Role"
                  rules={[{ required: true }]}
                >
                  <Select placeholder="Select role">
                    <Option value="Manager">Manager</Option>
                    <Option value="Staff">Staff</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="locationId"
                  label="Location"
                  rules={[{ required: true }]}
                >
                  <Select placeholder="Select location">
                    <Option value="68">iCodice Bootcamp</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            {employeeId === "add" && (
              <Row>
                <Col span={12}>
                  <Form.Item
                    name="password"
                    label="Password"
                    rules={[
                      {
                        required: true,
                        message: "Please input your password!",
                      },
                      {
                        validator(_, value) {
                          const lowercaseRegex = /^(?=.*[a-z]).*$/;
                          const uppercaseRegex = /^(?=.*[A-Z]).*$/;
                          const numericRegex = /^(?=.*[0-9]).*$/;
                          const lengthRegex = /^.{6,}$/;
                          let errorMessage = "";
                          if (!lowercaseRegex.test(value)) {
                            errorMessage +=
                              "Must contain at least one lowercase character (a-z)!\n";
                          }
                          if (!uppercaseRegex.test(value)) {
                            errorMessage +=
                              "Must contain at least one uppercase character (A-Z)!\n";
                          }
                          if (!numericRegex.test(value)) {
                            errorMessage +=
                              "Must contain at least one numeric character (0-9)!\n";
                          }
                          if (!lengthRegex.test(value)) {
                            errorMessage +=
                              "Must be at least 6 characters long!\n";
                          }

                          if (errorMessage) {
                            return Promise.reject(new Error(errorMessage));
                          } else {
                            return Promise.resolve();
                          }
                        },
                      },
                    ]}
                    hasFeedback
                  >
                    <Input.Password />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="confirm"
                    label="Confirm Password"
                    dependencies={["password"]}
                    hasFeedback
                    rules={[
                      {
                        required: true,
                        message: "Please confirm your password!",
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue("password") === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject(
                            new Error(
                              "The two passwords that you entered do not match!"
                            )
                          );
                        },
                      }),
                    ]}
                  >
                    <Input.Password />
                  </Form.Item>
                </Col>
              </Row>
            )}
          </Col>
          <Col style={{ padding: "0 20px" }} span={12}>
            <Divider>Address</Divider>
            <Row>
              <Col span={8}>
                <Form.Item
                  name="countryId"
                  label="Country"
                  rules={[{ required: true }]}
                >
                  <Select placeholder="Select country">
                    <Option value="0">United States</Option>
                    <Option value="1">Mongolia</Option>
                  </Select>
                </Form.Item>
              </Col>

              <Col span={8}>
                <Form.Item
                  name="address1"
                  label="Street"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="address2"
                  label="Apt, ste"
                  rules={[
                    {
                      required: false,
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={8}>
                <Form.Item
                  name="city"
                  label="City"
                  rules={[
                    {
                      required: false,
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="state"
                  label="State"
                  rules={[
                    {
                      required: false,
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="zip"
                  label="Zip Code"
                  rules={[
                    {
                      required: false,
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Form.Item name="note" label="Notes">
                  <Input.TextArea placeholder="Notes" />
                </Form.Item>
              </Col>
            </Row>
            {employeeId !== "add" ? (
              isActive ? (
                <Row>
                  <Col offset={8} span={7}>
                    <Form.Item>
                      <Button
                        name="button"
                        value="deactivatebtn"
                        danger
                        block
                        type="primary"
                        onClick={() => {
                          showPromiseConfirm("deactivate");
                          setAction("deactivate");
                        }}
                      >
                        Deactivate
                      </Button>
                    </Form.Item>
                  </Col>
                  <Col offset={2} span={7}>
                    <Form.Item>
                      <Button block type="primary" htmlType="submit">
                        Save changes
                      </Button>
                    </Form.Item>
                  </Col>
                </Row>
              ) : (
                <Row>
                  <Col offset={12} span={12}>
                    <Form.Item>
                      <Button
                        disabled={false}
                        block
                        type="primary"
                        onClick={() => {
                          setAction("activate");
                          // onFinish();
                          showPromiseConfirm("activate");
                          // onFinish("activate");
                        }}
                      >
                        Activate
                      </Button>
                    </Form.Item>
                  </Col>
                </Row>
              )
            ) : (
              <Row>
                <Col offset={12} span={12}>
                  <Form.Item>
                    <Button
                      block
                      htmlType="submit"
                      type="primary"
                      onClick={() => {
                        setAction("create");
                        // onFinish();
                      }}
                    >
                      Create
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
            )}
          </Col>
        </Row>

        {/* <pre>{JSON.stringify(employeeData, null, 2)}</pre> */}
      </Form>
    </div>
  );
}
