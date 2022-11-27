import { useLocation } from "react-router-dom";

export function EmployeeDetails() {
  const location = useLocation();
  return (
    <div className="employee-card">
      <div className="card-context">
        <div>
          <img className="employee-img" src={location.state.avatar} />
        </div>
        <h3>
          {location.state.firstName} {location.state.lastName}
        </h3>
        <div>{location.state.role}</div>
        <div>
          <b>{location.state.company}</b>
        </div>
        <div>
          {location.state.address.address1} {location.state.address.address2 !== "" ? `, ${location.state.address.address2}` : ""}
        </div>
        <div>
          {location.state.address.city}, {location.state.address.state} {location.state.address.zipcode}
        </div>
        <div>{location.state.phone}</div>
      </div>
    </div>
  );
}
