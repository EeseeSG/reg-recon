import * as React from 'react';
import { useState, useEffect, } from 'react';
import logo from './logo.svg';
import './App.css';

// components
import ExportToExcel from './components/ExportToExcel';
import {
  Grid,
  Typography,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Skeleton,
  IconButton,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  Box,
} from '@mui/material';
import LinearProgress from './components/LinearProgress';

// assets
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import LinkIcon from '@mui/icons-material/Link';
import TaskAltIcon from '@mui/icons-material/TaskAlt';

const DEFAULT_DATA = [
  {
    id: 0,
    type: 'ACT',
    name: 'Currency Act 1967',
    url: 'https://sso.agc.gov.sg/Act/CA1967',
    source: 'sso',
  },
  {
    id: 1,
    type: 'ACT',
    name: 'Deposit Insurance an Policy Owners’ Protection Schemes ACT 2011',
    url: 'https://sso.agc.gov.sg/Act/DIPOPSA2011',
    source: 'sso',
  },
  {
    id: 2,
    type: 'ACT',
    name: 'Banking Act 1970',
    url: 'https://sso.agc.gov.sg/Act/BA1970',
    source: 'sso',
  },
  {
    id: 3,
    type: 'ACT',
    name: 'Securities and Futures Act 2001',
    url: 'https://sso.agc.gov.sg/Act/SFA2001',
    source: 'sso',
  },
  {
    id: 4,
    type: 'ACT',
    name: 'Financial Advisors Act 2001',
    url: 'https://sso.agc.gov.sg/Act/FAA2001',
    source: 'sso',
  },
  {
    id: 5,
    type: 'ACT',
    name: 'Insurance Act 1966',
    url: 'https://sso.agc.gov.sg/Act/IA1966',
    source: 'sso',
  },
  {
    id: 6,
    type: 'ACT',
    name: 'Payment Services Act 2019',
    url: 'https://sso.agc.gov.sg/Acts-Supp/2-2019/Published/20190220?DocDate=20190220',
    source: 'sso',
  },
  {
    id: 7,
    type: 'ACT',
    name: 'Payment and Settlement Systems (Finality and Netting Act) 2002',
    url: 'https://sso.agc.gov.sg/Act/PSSFNA2002',
    source: 'sso',
  },
  {
    id: 8,
    type: 'ACT',
    name: 'MAS Act (Cap. 186)',
    url: 'https://sso.agc.gov.sg/Act/MASA1970',
    source: 'sso',
  },
  {
    id: 9,
    type: 'ACT',
    name: 'Banking (Publication and Provision of Accounts) Regulation',
    url: 'https://sso.agc.gov.sg/SL/19-RG2?DocDate=20040229',
    source: 'sso',
  },
  {
    id: 10,
    type: 'ACT',
    name: "Deposit Insurance and Policy Owners' Protection Schemes (Deposit Insurance) Regulations 2011",
    url: 'https://sso.agc.gov.sg/Act/MASA1970',
    source: 'sso',
  },
]

const columns = [
  { 
    id: 'id', 
    label: 'ID', 
    minWidth: 20,
    format: (value) => (value + 1).toString(),
    align: 'center',
  },
  { 
    id: 'type', 
    label: 'Type', 
    minWidth: 120,
    align: 'center',
  },
  {
    id: 'name',
    label: 'Description',
    minWidth: 250,
  },
  {
    id: 'url',
    label: 'URL Link',
    minWidth: 170,
    maxWidth: 300,
  },
  {
    id: 'action',
    label: 'Action',
    minWidth: 100,
  },
];



// ==================== ACTUAL ====================== //

function App() {
  const [rows, setRows] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    async function getRows() {
      setRows(DEFAULT_DATA);
      setIsLoaded(true);
    }
    getRows();
  }, [])


  // ============================================================================================================================
  // ===== PROGRESS =====
  // ============================================================================================================================
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    async function calculateProgress() {
      const completed = rows.filter((item) => item.data).length;
      const total = rows.length;
      const progress_cal = (completed / total) * 100;
      setProgress(progress_cal)
    }
    calculateProgress();
  }, [rows])

  // ============================================================================================================================
  // ===== HANDLE TEXT =====
  // ============================================================================================================================
  const [text, setText] = useState('');
  const handleChangeText = (e) => {
    setText(e.target.value)
  }

  // ============================================================================================================================
  // ===== HANDLE CONFIRM =====
  // ============================================================================================================================
  const handleConfirm = async () => {
    let submit_results
    if(modalData.source === 'sso') {
      submit_results = handleSubmitSSO(text);
    } else {
      submit_results = handleSubmitMAS(text);
    }
    const updated_dataset = rows.map((row) => {
      if(row.id === modalData.id) {
        return {
          ...row,
          data: submit_results
        }
      }
      return row
    })
    setRows(updated_dataset)

    handleCloseModal();  // close modal
  }

  // ============================================================================================================================
  // ===== MODAL =====
  // ============================================================================================================================
  const [modalData, setModalData] = useState(null);
  const handleOpenModal = (data) => {
    setModalData(data)
    setOpen(true)
  }

  const handleCloseModal = () => {
    setOpen(false);
    setModalData(null)
    setText('');
  }

  const handleOpenLink = () => {
    window.open(modalData.url, '_blank');
  }

  // ============================================================================================================================
  // ===== TABLE =====
  // ============================================================================================================================
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // ============================================================================================================================
  // ===== SSO =====
  // ============================================================================================================================
  const handleSubmitSSO = (text) => {
    var el = document.createElement( 'html' );
    el.innerHTML = text;
    const search_results = el.getElementsByClassName('toc')[0];

    // get headers
    const headers = search_results.getElementsByClassName('nav-link');
    let header_map = {};
    for(var x = 0; x < headers.length; x++) {
      var target_header = headers[x];
      var header_data_part = target_header.href.split('#')[1];
      var header_name = target_header.textContent.trim();
      if(!(header_data_part in header_map)) {
        header_map[header_data_part] = header_name
      }
    }
    
    // get list items
    const list_items = search_results.getElementsByTagName('nav');
    let parent_array = [];
    for(var i = 0; i < list_items.length; i++) {
      let child_array = [];
      for(var j = 0; j < list_items[i].children.length; j++) {
        const item = list_items[i].children[j];
        const data_part = item.getAttribute('data-part');
        const full_description = item.textContent.trim();
        const split_desc = full_description.split(' ');
        const section = split_desc[0];
        const description = split_desc.slice(1,split_desc.length).join(' ');

        // add data into array
        child_array = [data_part, full_description, section, description];
        parent_array.push(child_array)
      }
    }

    // reorganise to include main section
    const final_result = parent_array.map((i) => {
      const val = i[0];
      const header = header_map[val];
      return [header, ...i] 
    })

    // add in schedules
    let schedule_array = [];
    for(const obj in header_map) {
      if(obj.indexOf('Sc') !== -1) {
        const target_schedule = header_map[obj];
        const full_description = target_schedule.trim();
        const split_desc = full_description.replace('  ', '').split('\n').join(' ').split(' ');
        const section = split_desc[0] + " SCHEDULE";
        const description = split_desc.filter(x => typeof x === 'string' && x.length > 0).join(' ');
        schedule_array.push(['Schedule', 'Schedule', full_description, section, description])
      }
    }

    // set headers
    const headers_name = ['Section Name', 'Section', 'Full Description', 'Section Number', 'Description'];

    // return results
    return [headers_name, ...final_result, ...schedule_array]
  }


  // ============================================================================================================================
  // ===== MAS =====
  // ============================================================================================================================

  const handleSubmitMAS = (text) => {
    var el = document.createElement('html');
    el.innerHTML = text;
    const search_results = el.getElementsByClassName('mas-search-card');

    let results_array = [];
    for(var i = 0; i < search_results.length; i++) {
      var target_element = search_results[i];
      var content_type = target_element.getElementsByClassName('mas-tag__text')[0].textContent;
      var timestamp = target_element.getElementsByClassName('ts:xs')[0].textContent;
      var title = target_element.getElementsByClassName('mas-link__text')[0].textContent;
      // var link = target_element.getElementsByClassName('mas-link')[0].href;
      var desc = target_element.getElementsByClassName('mas-search-card__body')[0].textContent;

      // tags
      var tags_array = target_element.getElementsByClassName('ola-field ola-field-pill mas-search-card__footer');
      let tag_parsed_arr = [];
      for(var t = 0; t < tags_array.length; t++) {
        tag_parsed_arr.push(tags_array[t].textContent);
      }
      var tags_string = tag_parsed_arr.join(',');

      results_array.push([content_type, timestamp, title, desc, tags_string])
    }

    // set headers
    const headers = ['Content Type', 'Timestamp', 'Title', 'Description', 'Tags (separated by ,)']

    // return results
    return [headers, ...results_array]
  }


  // ============================================================================================================================
  // ===== ACTUAL DISPLAY =====
  // ============================================================================================================================
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {
          !isLoaded ? (
            <>
              <Skeleton variant="rectangular" width={210} height={118} />
            </>
          ) : (
            <Box sx={{ display: 'flex' }}>
              <Grid 
                container 
                spacing={2} 
                direction="column"
                alignItems="center"
                justifyContent="center"
                sx={{ marginTop: 2, marginBottom: 2, }}
              >
                <Grid item>
                  <Box width={"100%"} sx={{ m: 1 }}>
                    <LinearProgress value={progress} />
                  </Box>
                  <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                    <TableContainer sx={{ maxHeight: 440 }}>
                      <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                          <TableRow>
                            {columns.map((column) => {
                              return (
                                <TableCell
                                  key={column.id}
                                  align={column.align}
                                  style={{ minWidth: column.minWidth }}
                                >
                                  {column.label}
                                </TableCell>
                              )
                            })}
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {rows
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => {
                              return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                  {columns.map((column) => {
                                    if(column.id === 'action') {
                                      return (
                                        <TableCell key={`${row.id}-${column.id}`} align={column.align}>
                                          <IconButton color="primary" aria-label="upload picture" component="label" onClick={() => handleOpenModal(row)}>
                                            {row.data ? <TaskAltIcon color="success" /> : <MoreHorizIcon />}
                                          </IconButton>
                                        </TableCell>
                                      )
                                    }
                                    const value = row[column.id];
                                    return (
                                      <TableCell key={`${row.id}-${column.id}`} align={column.align}>
                                        {column.format && typeof value === 'number'
                                          ? column.format(value)
                                          : value}
                                      </TableCell>
                                    );
                                  })}
                                </TableRow>
                              );
                            })}
                        </TableBody>
                      </Table>
                    </TableContainer>
                    <TablePagination
                      rowsPerPageOptions={[10, 25, 50, 100]}
                      component="div"
                      count={rows.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                  </Paper>
                </Grid>

                <Dialog open={open} onClose={handleCloseModal}>
                  <DialogTitle>Extract Content</DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                      <Typography>
                        Steps to follow:
                      </Typography>
                      <Typography>
                        1. Click on the 'copy' icon to open the link
                      </Typography>
                      <Typography>
                        2. Open inspector by right click and click on 'Inspect' or press F12
                      </Typography>
                      <Typography>
                        3. Right click 'nav' tag element and copy entire element
                      </Typography>
                    </DialogContentText>
                    <Card variant="outlined" sx={{ marginTop: 2, }}>
                      <CardContent>
                      <FormControl variant="outlined" fullWidth>
                        <InputLabel htmlFor="outlined-adornment-password">URL Link</InputLabel>
                        <OutlinedInput
                          id="outlined-adornment-password"
                          type={'text'}
                          value={modalData?.url}
                          onChange={() => {}}
                          fullWidth
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                edge="end"
                                onClick={handleOpenLink}
                              >
                                <LinkIcon />
                              </IconButton>
                            </InputAdornment>
                          }
                          label="URL Link"
                        />
                      </FormControl>
                      </CardContent>
                    </Card>
                    <TextField
                      autoFocus
                      margin="dense"
                      id="copy"
                      label="Copy-Paste elements here"
                      fullWidth
                      multiline
                      rows={10}
                      sx={{ marginTop: 5, }}
                      value={text} 
                      onChange={handleChangeText}
                    />
                  </DialogContent>
                  <DialogActions sx={{ m: 2, }}>
                    <Button onClick={handleCloseModal}>Cancel</Button>
                    <Button variant="contained" size="large" onClick={handleConfirm} sx={{ m: 1 }}>Done</Button>
                  </DialogActions>
                </Dialog>

                <ExportToExcel dataset={rows} fileName={`export_${new Date().toISOString()}`}/>
              </Grid>
            </Box>
          )
        }
      </header>
    </div>
  );
}

export default App;
