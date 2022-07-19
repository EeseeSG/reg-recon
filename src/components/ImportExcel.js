import * as React from 'react';
import * as XLSX from "xlsx";
import {
    Button,
} from '@mui/material';

export default function ImportExcel({ onChange }) {

    function convertToArrayOfObjects(data) {
        var keys = data.shift(),
            i = 0, k = 0,
            obj = null,
            output = [];

        for (i = 0; i < data.length; i++) {
            obj = {};
    
            for (k = 0; k < keys.length; k++) {
                obj[keys[k]] = data[i][k];
            }
            output.push(obj);
        }
    
        return output;
    }

    const importFile = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = (evt) => {
          const bstr = evt.target.result;
          const wb = XLSX.read(bstr, { type: "binary" });
          const wsname = wb.SheetNames[0];
          const ws = wb.Sheets[wsname];
          const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });
          const data_chunks = data.split('\n');
          const data_array = data_chunks.map((i) => i.split(','));
          const data_objects = convertToArrayOfObjects(data_array);
          onChange(data_objects);
        };
        reader.readAsBinaryString(file);

        // const promise = new Promise((resolve, reject)=>{
        //     const fileReader = new FileReader();
        //     fileReader.readAsArrayBuffer(file);
        //     fileReader.onload=(e)=>{
        //         const bufferArray = e.target.result;
        //         const wb = {SheetNames:[], Sheets:{}};
        //         const ws1 = XLSX.read(bufferArray, {type:"buffer"}).Sheets.Sheet1;
        //         const ws2 = XLSX.read(bufferArray, {type:"buffer"}).Sheets.Sheet2;
                
        //         wb.SheetNames.push("Sheet1"); wb.Sheets["Sheet1"] = ws1;
        //         wb.SheetNames.push("Sheet2"); wb.Sheets["Sheet2"] = ws2;
            
        //         const data1 = XLSX.utils.sheet_to_json(ws1);
        //         const data2 = XLSX.utils.sheet_to_json(ws2);
        
        //         resolve([data1, data2]);
        //     };
        //     fileReader.onerror=(error) => {
        //         reject(error);
        //     };
        // });
        // promise.then((excelData) => {
        //     items.push(excelData);
        //     console.log(excelData);
        // });
    }

    return (
        <Button color="primary" variant="contained" sx={{ m: 2 }} component="label" onChange={importFile}>
            <input hidden type="file" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"/>
            Import
        </Button>
    );
};