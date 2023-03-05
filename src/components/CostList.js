import React from "react";
import { formatter } from "../util/currencyFormatter";

function CostList(props) {
  return (
    <div>
      <ul className="list-group">
        {props.costs.map((cost, index) => (
          <li key={index} className="list-group-item">
            {cost.workshop.name} @ {cost.location.name}: {formatter.format(cost.cost)}
          </li>
        ))}
      </ul>
      {props.costs.length === 0 && (
        <div className="alert alert-info mt-3">No workshops selected</div>
      )}
    </div>
  );
}

export default CostList;
