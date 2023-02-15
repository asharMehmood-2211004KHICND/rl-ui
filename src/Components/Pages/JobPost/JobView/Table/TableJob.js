import React from "react";
// import styled from "./jobview.module.css";
import styled from "./TableJob.module.css";

function TableJob({ head, body }) {
  return (
    <tr>
      <td>
        <h2 className="heading">{head}</h2>
      </td>
      <td className={styled.body}>
        {Array.isArray(body) ? (
          body.map((text,i) => (
            <tr key={i}>
              <td>{text}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td>{body}</td>
          </tr>
        )}
      </td>
    </tr>
  );
}

export default TableJob;
