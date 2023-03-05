import React, { useState } from "react";
import WorkshopForm from "./components/WorkshopForm";
import CostList from "./components/CostList";
import { formatter } from "./util/currencyFormatter";

function App() {
  const [costs, setCosts] = useState([]);
  const [totalCost, setTotalCost] = useState(null);

  const computeWorkshopsCost = ({ workshop, location }) => {
    const workshopCost = workshop.cost; // 995;
    const locationCost = location.cost * workshop.days; // 100 * 3
    const totalWorkshopCost = workshopCost + locationCost;
    return totalWorkshopCost;
  };

  const handleAddWorkshop = ({ workshop, location }) => {
    const duplicate = costs.find(
      ({ workshop: w, location: l }) => w.name === workshop.name && l.name === location.name
    );
    if (duplicate) return;

    const workshopCost = computeWorkshopsCost({ workshop, location });

    const cost = {
      workshop,
      location,
      cost: workshopCost,
    };
    setCosts((oldCosts) => [...oldCosts, cost]);
  };

  const handleCalculateTotal = () => {
    const total = costs.reduce((acc, { cost }) => acc + cost, 0);
    setTotalCost(total);
  };

  const handleReset = () => {
    setCosts([]);
    setTotalCost(null);
  };
  return (
    <div className="container pt-4">
      <h1>Workshop Location Calculator</h1>
      <WorkshopForm onAddWorkshop={handleAddWorkshop} />
      <div className="mt-4">
        <h2>Cost List</h2>
        <CostList costs={costs} />
      </div>
      {!isNaN(totalCost) && (<div className="mt-4">
        <h2>Total Cost: {formatter.format(totalCost)}</h2>
      </div>)}
      <div className="row">
        <div className="col-auto">
          <div className="mt-3">
            <button className="btn btn-primary" onClick={handleCalculateTotal}>
              Calculate Total
            </button>
          </div>
        </div>
        <div className="col-auto">
          <div className="mt-3">
            <button className="btn btn-danger" onClick={handleReset}>
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
