import React, { useState, useEffect, useRef, useMemo, useCallback, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Dropdown, Card, Button, Grid } from "../../components";
import { useAxiosPrivate, useAlert, useDateFormat, useGridColumnDefns } from "../../hooks";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { FaFileCsv } from "react-icons/fa";
import { ThemeContext } from "styled-components";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

function AdminDashboard() {
    const { employersGridDefn, jobsGridDefn, candidatesGridDefn } = useGridColumnDefns();
    const companyRef = useRef();
    const themeContext = useContext(ThemeContext);
    const [licenseTab, setLicenseTab] = useState(true);
    const [reportsTab, setReportsTab] = useState(false);

    const [noOfCandidates, setNoOfCandidates] = useState("");
    const [expiryDate, setExpiryDate] = useState("");
    const [company, setCompany] = useState("");
    const [companyDD, setCompanyDD] = useState("");
    const [companyList, setCompanyList] = useState([]);

    const [employersTab, setEmployersTab] = useState(true);
    const [jobsTab, setJobsTab] = useState(false);
    const [candidatesTab, setCandidatesTab] = useState(false);

    const {setAlert} = useAlert();
    const {dateConverter} = useDateFormat();
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const blockInvalidNumber = e => ['e', 'E', '+', '-', '.'].includes(e.key) && e.preventDefault();
    const isInvalid = company === "" || noOfCandidates === "" || expiryDate === "";

    const [rowData, setRowData] = useState([]);
    const [columnDefs, setColumnDefs] = useState([]);

    const [rowSelected,setRowSelected] = useState({});
    const [gridApi, setGridApi] = useState(null);
    const operationInvalid = () => {
        if (rowSelected?.id) {
            return false;
        }
        else {
            return true;
        }
    }
    const defaultColDef = useMemo(() => ({
        sortable: true,
        filter: true,
        resizable: true,
    }),[]);
    const gridRef = useRef();
    const autoSizeAll = useCallback((skipHeader) => {
        const allColumnIds = [];
        gridRef.current?.columnApi.getColumns().forEach((column) => {
            allColumnIds.push(column.getId());
        });
        gridRef.current?.columnApi.autoSizeColumns(allColumnIds, skipHeader);
    }, []);
    const onGridReady = (params) => {
        setGridApi(params.api);
        setTimeout(() => autoSizeAll(false), 1000);
    };
    const exportCSV = () => {
        gridApi.exportDataAsCsv();
    }
    const onSelectionChanged = () => {
        const row = gridRef.current.api.getSelectedRows();
        if(row[0] !== undefined) {
            setRowSelected(row[0]);
        }
        else
            setRowSelected({});
    }

    const toggleLicenseTab = () => {
        setLicenseTab(true);
        setReportsTab(false);
        getCompanies();
    }
    const toggleReportsTab = () => {
        setLicenseTab(false);
        setReportsTab(true);
        resetLicenseTabFields();
    }
    const toggleEmployersTab = () => {
        setEmployersTab(true);
        setJobsTab(false);
        setCandidatesTab(false);
        setColumnDefs(employersGridDefn);
        getEmployers();
    }
    const toggleJobsTab = () => {
        setEmployersTab(false);
        setJobsTab(true);
        setCandidatesTab(false);
        setColumnDefs(jobsGridDefn);
        getJobs();
    }
    const toggleCandidatesTab = () => {
        setEmployersTab(false);
        setJobsTab(false);
        setCandidatesTab(true);
        setColumnDefs(candidatesGridDefn);
        getCandidates();
    }

    const resetLicenseTabFields = () => {
        setCompany("");
        setNoOfCandidates("");
        setExpiryDate("");
    }

    const handleNoOfCandidates = (num) => {
        if ((num >= 1) || num == "") {
            setNoOfCandidates(num.replace(/^0+/, ''));
        }
    }
    
    const getCompanies = () => {
        axiosPrivate
        .get("/api/admin/get-companies")
        .then(function (response) {
            // console.log(response?.data);
            const companyList = response?.data;
            setCompanyList(companyList);
        })
        .catch(function (error) {
            setAlert({msg: `Error: ${error?.response?.data?.detail}`, type: "error"});
            // navigate("/admin/dashboard");
        });
    }
    
    const getEmployers = () => {
        axiosPrivate
        .get("/api/admin/get-employers")
        .then(function (response) {
            // console.log(response?.data);
            setRowData(() => []);
            setRowData(response?.data);
        })
        .catch(function (error) {
            setAlert({msg: `Error: ${error?.response?.data?.detail}`, type: "error"});
            // navigate("/admin/dashboard");
        });
    }
    
    const getJobs = () => {
        axiosPrivate
        .get("/api/admin/get-jobs")
        .then(function (response) {
            // console.log(response?.data);
            setRowData(() => []);
            setRowData(response?.data);
        })
        .catch(function (error) {
            setAlert({msg: `Error: ${error?.response?.data?.detail}`, type: "error"});
            // navigate("/admin/dashboard");
        });
    }
    
    const getCandidates = () => {
        axiosPrivate
        .get("/api/admin/get-candidates")
        .then(function (response) {
            // console.log(response?.data);
            setRowData(() => []);
            setRowData(response?.data);
        })
        .catch(function (error) {
            setAlert({msg: `Error: ${error?.response?.data?.detail}`, type: "error"});
            // navigate("/admin/dashboard");
        });
    }

    useEffect(() => {
        if(company !== "") {
            axiosPrivate
            .post("/api/admin/get-license-values",{company_name: company})
            .then(function (response) {
                // console.log(response?.data);
                setExpiryDate(response?.data?.expiry_date.substring(0,10));
                setNoOfCandidates(response?.data?.no_of_candidates_to_view);
            })
            .catch(function (error) {
                setAlert({msg: `Error: ${error?.response?.data?.detail}`, type: "error"});
                // navigate("/admin/dashboard");
            });
        }
    }, [company]);
    
    useEffect(() => {
        const handleOutsideClick = (e) => {
            if(companyDD && !companyRef?.current?.contains(e.target)) {
                setCompanyDD(false);
            }
        }
        window.addEventListener("click",handleOutsideClick);
        return () => window.removeEventListener("click",handleOutsideClick);
    }, [companyDD, companyRef]);
    const changeCompany = (item) => {
        setCompany(item);
        setCompanyDD(false);
    }

    const handleUpdateLicense = () => {
        axiosPrivate
        .put("/api/admin/update-license",{company_name: company, no_of_candidates_to_view: noOfCandidates, expiry_date: expiryDate})
        .then(function (response) {
            // console.log(response?.data);
            setAlert({msg: `Success: ${response?.data}`, type: "success"});
            resetLicenseTabFields();
        })
        .catch(function (error) {
            setAlert({msg: `Error: ${error?.response?.data?.detail}`, type: "error"});
            // navigate("/admin/dashboard");
        });
    }

    useEffect(() => {
        getCompanies();
        toggleEmployersTab();
    }, [])
    

    return (
        <>
        <Card width="100%">
            <Card.Title>
                Dashboard
            </Card.Title>
            <Card.Line />
            <Card.ButtonGroup flexStart>
                <Button nofill={!licenseTab} small onClick={() => toggleLicenseTab()}>License Management</Button>
                <Button nofill={!reportsTab} small onClick={() => toggleReportsTab()}>Reports</Button>
            </Card.ButtonGroup>
        </Card>
        {licenseTab && 
            <Card width="45%">
                <Card.InputColumn>
                    <Card.InputContainer refPointer={companyRef}>
                        <Card.Input readOnly type="text" id="company" placeholder=" " autoComplete="off" value={company} onClick={() => setCompanyDD((companyDD) => !companyDD)} />
                        <Card.Label htmlFor="company" mandatory>Company</Card.Label>
                        <Dropdown empty={companyList.length === 0} width={"100%"} dropdown={companyDD} flexDirection="column">
                            {companyList.map((item) => {
                                return <Dropdown.Option selected={(company === item.company_name) ? "selected" : undefined} key={item.id} onClick={() => changeCompany(item.company_name)}>{item.company_name}</Dropdown.Option>
                            })}
                        </Dropdown>
                        <Card.Icon style={{pointerEvents: "none"}}>
                            {(companyDD) ? <FiChevronUp /> : <FiChevronDown />}
                        </Card.Icon>
                    </Card.InputContainer>
                </Card.InputColumn>
                {company !== "" &&
                    <>
                        <Card.InputColumn>
                            <Card.InputContainer>
                                <Card.Input type="number" id="noOfCandidates" onWheel={(e) => e.target.blur()} onKeyDown={blockInvalidNumber} placeholder=" " autoComplete="off" value={noOfCandidates} onChange={({target}) => handleNoOfCandidates(target.value)} />
                                <Card.Label htmlFor="noOfCandidates" mandatory>No. of candidates to view</Card.Label>
                            </Card.InputContainer>
                        </Card.InputColumn>
                        <Card.InputColumn>
                            <Card.InputContainer>
                                <Card.Input type="date" id="expiryDate" placeholder=" " onKeyDown={(e) => e.preventDefault()} autoComplete="off" value={expiryDate} onChange={({ target }) => setExpiryDate(target.value)} />
                                <Card.Label htmlFor="expiryDate" mandatory>Expiry Date</Card.Label>
                            </Card.InputContainer>
                        </Card.InputColumn>
                    </>
                }
                <Card.ButtonGroup marginTop>
                    <Button nofill onClick={() => resetLicenseTabFields()}>Reset</Button>
                    <Button disabled={isInvalid} onClick={() => handleUpdateLicense()}>Update</Button>
                </Card.ButtonGroup>
            </Card>
        }
        {reportsTab &&
            <>
            <Card width="100%" forGrid>
                <Card.InputColumn>
                    <Card.ButtonGroup flexStart>
                        <Button nofill={!employersTab} small onClick={() => toggleEmployersTab()}>Companies</Button>
                        <Button nofill={!jobsTab} small onClick={() => toggleJobsTab()}>Jobs posted</Button>
                        <Button nofill={!candidatesTab} small onClick={() => toggleCandidatesTab()}>Candidates</Button>
                    </Card.ButtonGroup>
                    <Card.ButtonGroup flexEnd marginBottom>
                        <Button small onClick={() => exportCSV()}><Button.Icon><FaFileCsv /></Button.Icon>Export</Button>
                    </Card.ButtonGroup>
                </Card.InputColumn>
                <div style={{width: "100%", height: "100%", marginBottom: "1rem"}}>
                    <AgGridReact className={(themeContext.type === "dark") ? "ag-theme-alpine-dark" : "ag-theme-alpine"} 
                        rowData={rowData} 
                        columnDefs={columnDefs} 
                        defaultColDef={defaultColDef}
                        animateRows={true} 
                        ref={gridRef}
                        onGridReady={onGridReady}
                        suppressSizeToFit={true}
                        onSelectionChanged={onSelectionChanged}
                        pagination={true}
                        paginationPageSize={15}
                        suppressColumnVirtualisation={true}
                    />
                </div>
                {rowSelected.id && <Grid.Text>Selected: {employersTab ? rowSelected.company_name : jobsTab ? rowSelected.job_title : candidatesTab ? rowSelected.name : null}</Grid.Text>}
            </Card>
            </>
        }
        </>
    );
}

export default AdminDashboard;
