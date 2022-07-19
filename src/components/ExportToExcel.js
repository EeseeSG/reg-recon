import * as React from 'react';
import * as XLSX from "xlsx";
import {
    Button,
    ButtonGroup,
} from '@mui/material';

export default function ExportToExcel({ dataset, fileName="export" }) {
    const fileExtension = ".xlsx";

    const download = () => {
        const wb = XLSX.utils.book_new();

        // add overview
        const parsed_data = dataset.map((data) => [data.id, data.type, data.name, data.url, data.source])
        const overview_data = [
            ['ID', 'Type', 'Name', 'URL', 'Source Type'],
            ...parsed_data
        ]
        var overview_ws = XLSX.utils.aoa_to_sheet(overview_data);
        XLSX.utils.book_append_sheet(wb, overview_ws, 'overview');

        // check each
        for(const obj_set of dataset) {
            const data = obj_set.data ? obj_set.data : [['No data captured'], ['']];
            var ws = XLSX.utils.aoa_to_sheet(data);
            const sheet_name = `(${obj_set.id+1})`;
            XLSX.utils.book_append_sheet(wb, ws, sheet_name);
        }

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
            <Button color="primary" variant="contained" sx={{ m: 2 }} onClick={downloadOverview}>Download Overview Only</Button>
            <Button color="success" variant="contained" sx={{ m: 2 }} onClick={download}>Download Now</Button>
        </ButtonGroup>
    );
};