import React, { useState, useEffect } from "react";
import axios from "axios";
import FileDownload from "js-file-download";
export default function App() {
  const [data, setData] = useState([]);
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
      <button onClick={(e) => download(e)}>Download</button>
      {data.map((ele) => {
        return (
          <>
            <h1>{ele.ID}</h1>
          </>
        );
      })}
    </div>
  );
}
