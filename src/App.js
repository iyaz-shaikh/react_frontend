import { useState, useCallback, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { Box, Container } from '@mui/material';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

function App() {

  const [patientColumnDefs] = useState([
    {field: 'patientId', headerName: 'Patient Id'},
    {field: 'birthDate', headerName: 'Birth Date'},
    {field: 'firstName', headerName: 'First Name'},
    {field: 'middleName', headerName: 'Middle Name'},
    {field: 'lastName', headerName: 'Last Name'},
    {field: 'nickname', headerName: 'Nickname'},
    {field: 'gender', headerName: 'Male'},
    {field: 'phoneNumber', headerName: 'Phone Number'},
    {field: 'deceased', headerName: 'Deceased?'},
  ]);

  const [patientValues, setPatientValues] = useState([]);

  const defaultColDef = useMemo(() => {
    return {
        flex: 1,
        wrapText: true
    };
  }, []);

  const onGridReady = useCallback(() => {
    fetch("https://qau89mulbe.execute-api.us-east-1.amazonaws.com/default/Database_Endpoint")
    .then((resp) => resp.json(), {
        method: 'GET',
        mode: 'cors',
        headers: {}
    })
    .then((data) => {
      const rows = data.map((row) => {
        return {
          patientId: row.patientId.S,
          birthDate: row.birthDate.S,
          firstName: row.firstName.S,
          middleName: row.middleName.S,
          lastName: row.lastName.S,
          nickname: row.nickname.S,
          gender: row.gender.S,
          phoneNumber: row.phoneNumber.S,
          deceased: row.deceased.BOOL.toString(),
        }
      });
      setPatientValues(rows)
    })
    .catch(err => err);
  }, []);

    //rendering
    const renderPatientValues = () => {
      return <div className="ag-theme-alpine" style={{height: 800, width: 1200}}>
            <AgGridReact
                rowData={patientValues}
                columnDefs={patientColumnDefs}
                defaultColDef={defaultColDef}
                onGridReady={onGridReady}
            ></AgGridReact>
        </div>

    }

  return (
    <div>
      <Container component="main" maxWidth="large" maxHeight="large">
        <Box sx={{ display: 'flex', flexDirection: 'column'}}>
          <h1> List of Deceased Patients </h1>
          {renderPatientValues()}
          <p> For more information, please visit <a href="https://github.com/iyaz-shaikh/react_frontend">the repo</a></p>
        </Box>
      </Container>
    </div>
  );
}

export default App;
