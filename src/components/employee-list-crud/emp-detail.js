import { useLocation, useParams } from "react-router-dom";

export function EmployeeDetails() {
  const { state } = useLocation();
  const { employeeId } = useParams();
  const employee = state?.find((emp) => emp.id === parseInt(employeeId));

  return (
    state ?
      <div className="employee-card">
        <div className="card-context">
          <div>
            <img className="employee-img" src={employee?.avatar} alt="avatar img" />
          </div>
          <h3>
            {employee?.firstName} {employee?.lastName}
          </h3>
          <div>{employee?.role}</div>
          <div>
            <b>{employee?.company}</b>
          </div>
          <div>
            {employee?.address.address1} {employee?.address.address2 !== "" ? `, ${employee?.address.address2}` : ""}
          </div>
          <div>
            {employee?.address.city}, {employee?.address.state} {employee?.address.zipcode}
          </div>
          <div>{employee?.phone}</div>
        </div>
      </div>
      :
      <div> 404. That's an error...</div>
  )
}
