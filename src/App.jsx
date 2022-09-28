import React from "react";
import { useState } from "react";



// function CSVfileReader() {
//   const [file, setFile] = useState();
//   const [array, setArray] = useState([]);

//   const fileReader = new FileReader();

//   const handleOnChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const handleOnSubmit = (e) => {
//     e.preventDefault();

//     if (file) {
//       fileReader.onload = function (event) {
//         const csvOutput = event.target.result;
//         console.log(csvOutput);
//         csvFileToArray(csvOutput);
//       };

//       fileReader.readAsText(file);
//     }
//   };

//   const csvFileToArray = (string) => {
//     const csvHeader = string.slice(0, string.indexOf("\n")).split(",");
//     const csvRows = string.slice(string.indexOf("\n") + 1).split("\n");

//     const array = csvRows.map((i) => {
//       const values = i.split(",");
//       const obj = csvHeader.reduce((object, header, index) => {
//         object[header] = values[index];
//         return object;
//       }, {});
//       return obj;
//     });

//     setArray(array);
//   };

//   const headerKeys = Object.keys(Object.assign({}, ...array));

//   return (
//     <div className="pt-5" style={{ textAlign: "center" }}>
//       <form>
//         <div className="d-flex justify-content-center py-4">
//           <input
//             className="form-control w-75"
//             type={"file"}
//             id={"csvFileInput"}
//             accept={".csv"}
//             onChange={handleOnChange}
//           />
//           <button
//             type="button"
//             className="btn btn-secondary"
//             onClick={(e) => {
//               handleOnSubmit(e);
//             }}
//           >
//             IMPORT CSV
//           </button>
//         </div>
//       </form>

//       <table className="table table-bordered border-primary">
//         <thead>
//           <tr key={"header"}>
//             {headerKeys.map((key) => (
//               <th>{key}</th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           {array.map((item) => (
//             <tr key={item.id}>
//               {Object.values(item).map((val) => (
//                 <td>{val}</td>
//               ))}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }



function App() {

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState([]);
  const [resultHeader, setHeaderResult] = useState([]);
  const [file, setFile] = useState();

  const freader = new FileReader();

  const GetCSV = (ev) => {
    setFile(ev.target.files[0]);
  };

  const handleOnSubmit = (e) => {
    if (file) {
      freader.onload = (event) => {
        let data = event.target.result;
        let rows = data.split("\n");
        let index = 0;
        for (const line of rows) {
          let columns = String(line).split(",");

          if (columns.length != 4) {
            // console.log("Line" + (line + 1) + "is not formated properly");
            break;
          }

          if (index == 0) {
            resultHeader.push(columns);
            setHeaderResult([...resultHeader]);
          } else {
            result.push(columns);
            setResult([...result]);
          }
          index++;
        }
      };

      freader.readAsText(file);
    }
  };

  return (
    <div className="pt-5">
      <div className="d-flex justify-content-center py-4">
        <input
          className="form-control w-75"
          type={"file"}
          id={"csvFileInput"}
          accept={".csv"}
          onChange={GetCSV}
        />
        <button
          type="button"
          className="btn btn-secondary"
          onClick={(e) => {
            handleOnSubmit(e);
          }}
        >
          IMPORT CSV
        </button>
      </div>
      

      <div className="pt-4">
        <table className="table table-bordered border-primary">
          <thead>
            {resultHeader.map((item, index) => (
              <tr key={index}>
                <th>{item[0]}</th>
                <th>{item[1]}</th>
                <th>{item[2]}</th>
                <th>{item[3]}</th>
              </tr>
            ))}
          </thead>
          <tbody>
            {result.map((item, index) => (
              <tr key={index}>
                <td>{item[0]}</td>
                <td>{item[1]}</td>
                <td>{item[2]}</td>
                <td>{item[3]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
