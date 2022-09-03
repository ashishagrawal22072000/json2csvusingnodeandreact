import React, { useState, useEffect } from "react";
import axios from "axios";
import FileDownload from "js-file-download";
import "bootstrap/dist/css/bootstrap.css";
export default function App() {
  const [data, setData] = useState([]);
  const [label, setLabel] = useState([]);
  useEffect(() => {
    const res = async () => {
      await axios
        .get("/data")
        .then((res) => {
          console.log(res.data);
          setData(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    res();
  }, []);

  useEffect(() => {
    const keys = data.map((ele) => {
      return Object.keys(ele);
    });
    setLabel(keys[0]);
  }, [data]);
  console.log(label);

  const download = (e) => {
    e.preventDefault();
    axios
      .get("/download")
      .then((res) => {
        console.log(res);
        FileDownload(res.data, "employee.csv");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  console.log(data);

  return (
    <div>
      <div className="container d-flex flex-row-reverse p-3">
        <button className="btn btn-success" onClick={(e) => download(e)}>
          Download
        </button>
      </div>
      <div className="container">
        <table class="table">
          <thead>
            <tr>
              {label?.map((ele) => {
                return (
                  <>
                    <th className="border">{ele}</th>
                  </>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {data?.map((ele) => {
              return (
                <>
                  <tr className="border">
                    <td>{ele.ID}</td>
                    <td className="border">{ele.JobTitle}</td>
                    <td className="border">{ele.EmailAddress}</td>
                    <td>{ele.FirstNameLastName}</td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
