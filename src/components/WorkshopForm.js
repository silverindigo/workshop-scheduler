import React, { useState } from "react";
import { workshops, locations } from "../data";

function WorkshopList(props) {
  const [selectedWorkshop, setSelectedWorkshop] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");

  const handleWorkshopChange = (event) => {
    setSelectedWorkshop(event.target.value);
  };

  const handleLocationChange = (event) => {
    setSelectedLocation(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const workshop = workshops.find((w) => w.name === selectedWorkshop);
    const location = locations.find((l) => l.name === selectedLocation);

    props.onAddWorkshop({workshop, location});
  }

  return (
    <form onSubmit={handleSubmit} className="mt-3">
      <div className="row">
        <div className="col-sm-6">
          <h2>Workshops</h2>
          <select
            className={`form-control ${selectedWorkshop === "" ? "is-invalid" : ""}`}
            value={selectedWorkshop}
            onChange={handleWorkshopChange}
            required
          >
            <option value="">Select a workshop</option>
            {workshops.map((workshop) => (
              <option key={workshop.name} value={workshop.name}>
                {workshop.name}
              </option>
            ))}
          </select>
          {selectedWorkshop === "" && (
            <div className="invalid-feedback">Please select a workshop</div>
          )}
        </div>
        <div className="col-sm-6">
          <h2>Locations</h2>
          <select
            className={`form-control ${selectedLocation === "" ? "is-invalid" : ""}`}
            value={selectedLocation}
            onChange={handleLocationChange}
            required
          >
            <option value={""}>Select a location</option>
            {locations.map((location) => (
              <option key={location.name} value={location.name}>
                {location.name}
              </option>
            ))}
          </select>
          {selectedLocation === "" && (
            <div className="invalid-feedback">Please select a location</div>
          )}
        </div>
      </div>
      <div className="mt-3">
        <button
          className="btn btn-primary"
          disabled={!selectedWorkshop || !selectedLocation}
          type='submit'
        >
          Add Workshop
        </button>
      </div>
    </form>
  );
}

export default WorkshopList;
