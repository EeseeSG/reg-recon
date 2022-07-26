import * as React from 'react';
import * as XLSX from "xlsx";
import {
    Button,
    ButtonGroup,
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';

export default function ExportToExcel({ dataset, fileName="export" }) {
    const fileExtension = ".xlsx";

    const download = () => {
        const wb = XLSX.utils.book_new();

        // add overview
        const parsed_data = dataset.map((data) => {
            const hasData = data.data !== undefined
            return [data.id, data.type, data.name, data.url, data.source, hasData]
        })
        const overview_data = [
            ['ID', 'Type', 'Name', 'URL', 'Source Type', 'Completed'],
            ...parsed_data
        ]
        var overview_ws = XLSX.utils.aoa_to_sheet(overview_data);
        XLSX.utils.book_append_sheet(wb, overview_ws, 'overview');

        // check each
        for(const obj_set of dataset) {
            const data = obj_set.data ? obj_set.data : [['No data captured'], ['']];
            var ws = XLSX.utils.aoa_to_sheet(data);
            const sheet_name = `(${obj_set.id})`;
            XLSX.utils.book_append_sheet(wb, ws, sheet_name);
        }

        // summary
        const headers = ['Regulation', 'Section Name', 'Section', 'Full Description', 'Section Number', 'Description'];
        const sheet_name_all = `(ALL)`;
        const dataset_without_mas = dataset.filter((obj) => obj.source !== 'mas');
        const all_array = dataset_without_mas.map((obj_set) => {
            if(obj_set.data) {
                return obj_set.data.filter((_, index) => index !== 0)
            }
            return obj_set.data
        });
        const flattened_array = all_array.flat(1);
        const ws_all = XLSX.utils.aoa_to_sheet([headers, ...flattened_array]);
        XLSX.utils.book_append_sheet(wb, ws_all, sheet_name_all);


        XLSX.writeFile(wb, `${fileName}${fileExtension}`);
    }

    const downloadOverview = () => {
        const wb = XLSX.utils.book_new();
        // add overview
        const parsed_data = dataset.map((data) => [data.id, data.type, data.name, data.url, data.source])
        const overview_data = [
            ['id', 'type', 'name', 'url', 'source'],
            ...parsed_data
        ]
        var overview_ws = XLSX.utils.aoa_to_sheet(overview_data);
        XLSX.utils.book_append_sheet(wb, overview_ws, 'overview');
        XLSX.writeFile(wb, `${fileName}${fileExtension}`);
    }

    return (
        <ButtonGroup variant="contained">
            <Button color="primary" variant="contained" sx={{ m: 2 }} onClick={downloadOverview} id="second-step" startIcon={<DownloadIcon />}>Download Overview Only</Button>
            <Button color="success" variant="contained" sx={{ m: 2 }} onClick={download} id="last-step" startIcon={<DownloadIcon />}>Download Now</Button>
        </ButtonGroup>
    );
};