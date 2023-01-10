import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import styles from "./TableStyles.module.scss";
import { UilTrashAlt } from "@iconscout/react-unicons";
const Table: React.FC<any> = ({
  header,
  rows,
  headerResponsive = true,
  actionDelete = false,
}) => {
  return (
    <div className={styles.containerTable}>
      <div className={styles.tableHead}>
        <table>
          <thead>
            <tr>
              {header.map((item) => (
                <th className={`${headerResponsive && "headerResponse"}`}>
                  {item.label}
                </th>
              ))}
              {actionDelete && (
                <th className={`${headerResponsive && "headerResponse"}`}>
                  Acoes
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {rows.map((item, key) => {
              console.log(item);
              return (
                <tr>
                  {item[header[0]?.id] && <td>{item[header[0]?.id]}</td>}
                  {item[header[1]?.id] && <td>{item[header[1]?.id]}</td>}
                  {item[header[2]?.id] && <td>{item[header[2]?.id]}</td>}
                  {item[header[3]?.id] && <td>{item[header[3]?.id]}</td>}
                  {item[header[4]?.id] && <td>{item[header[4]?.id]}</td>}
                  {actionDelete && (
                    <td>
                      <button
                        type="button"
                        className="delete"
                        onClick={() => actionDelete(item.id)}
                        style={{
                          backgroundColor: "transparent",
                          border: "none",
                        }}
                      >
                        <UilTrashAlt />
                      </button>
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
