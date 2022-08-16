import axios from "axios";
import React, {useEffect, useState} from "react";
import SortIcon from '@mui/icons-material/Sort';
import SortByAlphaIcon from '@mui/icons-material/SortByAlpha';
import {
    Box,
    Button,
    CircularProgress,
    Collapse,
    FormControl,
    FormControlLabel, IconButton,
    InputLabel, List, ListItem, ListItemText,
    MenuItem,
    Pagination,
    Paper,
    Select,
    Stack,
    Switch,
    Table,
    TableBody,
    TableCell,
    tableCellClasses,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    TextField,
    Typography
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import InfoIcon from '@mui/icons-material/Info';
import ArticleIcon from '@mui/icons-material/Article';
import {styled} from '@mui/material/styles';
import UserDetailModal from './UserDetailModal'
import {Link} from "react-router-dom";

function DataTable() {

    const dataURL = '/data/usersData.json';

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [paginationNumberCount, setPaginationNumberCount] = useState();
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [sort, setSort] = useState('id');
    const [filter, setFilter] = useState('');
    const [filterValue, setFilterValue] = useState('');
    const [isFilterSectionOpen, setIsFilterSectionOpen] = useState(false);
    const [allFilters, setAllFilters] = useState([
        {
            filterName: 'first_name',
            filterVal: '',
        },
        {
            filterName: 'last_name',
            filterVal: '',
        },
        {
            filterName: 'age',
            filterVal: '',
        }
    ]);

    const StyledTableCell = styled(TableCell)(({theme}) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
        '&:hover': {
            cursor: 'pointer',
        }
    }));

    const StyledTableRow = styled(TableRow)(({theme}) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));

    const filterPillStyle = {
        backgroundColor: '#188dff',
        color: 'white',
        padding: '0 5px 0 15px',
        width: 'auto',
        marginLeft: '10px',
        borderRadius: '20px',
    }

    const getUsers = async () => {
        try {
            let response = await axios.get(dataURL);
            setUsers(response.data);
        } catch (error) {
            console.log(error);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        if (isLoading) {
            setTimeout(() => {
                getUsers().then();
            }, 2000);
        }
    }, [isLoading]);

    useEffect(() => {
        document.getElementById('tablePaginationRoot')
            .getElementsByTagName('p')[0].innerHTML = 'Records per page:';
    }, [])

    useEffect(() => {
    }, [sort])

    useEffect(() => {
        let n = 0;
        let m = users.length;
        while (m > 0) {
            m = m - rowsPerPage;
            n++;
        }
        setPaginationNumberCount(n);
    }, [rowsPerPage, users.length]);

    useEffect(() => {
        allFilters.forEach((i, index) => {
            if (i.filterVal !== '') {
                document.getElementById(`pillNum${index}`).style.display = 'block';
            } else {
                document.getElementById(`pillNum${index}`).style.display = 'none';
            }
        })
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [allFilters])

    const fetchData = () => {
        fetch(dataURL)
            .then(res => res.json())
            .then((data) => {
                setUsers(data.filter((user) => {
                    return user.first_name.toLowerCase().includes(allFilters[0].filterVal) &&
                        user.last_name.toLowerCase().includes(allFilters[1].filterVal) &&
                        user.age.toLowerCase().includes(allFilters[2].filterVal);
                }))
            })
            .catch((error) => {
                console.log(error);
            })
    };

    const handleChangePage = (event, newPage: number) => {
        setPage(newPage - 1);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(event.target.value);
        setPaginationNumberCount(100 / event.target.value)
        setPage(0);
    };

    const sortBy = (val) => {
        setUsers(users.sort(function (a, b) {
            setSort(val);
            if (!isNaN(a[val])) {
                return a[val] - b[val];
            } else {
                let x = a[val].toLowerCase();
                let y = b[val].toLowerCase();
                if (x < y) {
                    return -1;
                }
                if (x > y) {
                    return 1;
                }
                return 0;
            }
        }))
    };

    const handleDropDownChange = (event) => {
        setFilter(event.target.value);
    };

    const handleSearchFiled = (event) => {
        setFilterValue(event.target.value.toLowerCase());
    };

    const handleFilterSection = () => {
        setIsFilterSectionOpen((prev) => !prev);
    };

    const updateFilters = (value, index) => {
        let newArr = [...allFilters];
        newArr[index].filterVal = value;
        setAllFilters(newArr);
    }

    const filterData = () => {
        if (filter === 'first_name') {
            updateFilters(filterValue, 0);
        } else if (filter === 'last_name') {
            updateFilters(filterValue, 1);
        } else if (filter === 'age') {
            updateFilters(filterValue, 2);
        } else {
            alert('Select a Filter!')
        }
        setFilter('');
        setFilterValue('');
    };

    const deleteFilter = (i) => {
        updateFilters('', i);
        console.log(i, allFilters)
    }

    return (
        <>
            <Box
                sx={{
                    padding: '10px 0 10px 20px',
                    margin: '0 10px 10px 10px',
                    backgroundColor: '#ebebeb',
                    borderRadius: '5px'
                }}>
                <FormControlLabel
                    control={
                        <Switch
                            checked={isFilterSectionOpen}
                            onChange={handleFilterSection}/>
                    }
                    label="Add Filter"/>
                <Collapse
                    in={isFilterSectionOpen}>
                    <Stack
                        direction={'row'}
                        spacing={3}
                        sx={{
                            padding: '10px 10px 17px 10px',
                            height: '39px'
                        }}>
                        <FormControl
                            fullWidth
                            sx={{
                                width: '25%'
                            }}
                            size={"small"}>
                            <InputLabel
                                id="demo-simple-select-label">
                                Filter
                            </InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={filter}
                                label="Filter"
                                onChange={handleDropDownChange}>
                                <MenuItem
                                    value={'first_name'}>
                                    First Name
                                </MenuItem>
                                <MenuItem
                                    value={'last_name'}>
                                    Last Name
                                </MenuItem>
                                <MenuItem
                                    value={'age'}>
                                    Age
                                </MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            label={`Search for ${filter}`}
                            value={filterValue}
                            onChange={handleSearchFiled}
                            variant="outlined"
                            size={"small"}/>
                        <Button
                            variant={"contained"}
                            onClick={filterData}
                            sx={{
                                width: '10%'
                            }}>
                            Submit
                        </Button>
                    </Stack>
                    <List>
                        <Stack direction={'row'}>
                            {allFilters.map((filter, index) => {
                                return <ListItem id={`pillNum${index}`} key={index} sx={filterPillStyle}>
                                    <ListItemText
                                        sx={{
                                            '& .MuiTypography-root': {
                                                fontSize: '13px',
                                            }
                                        }}>
                                        {filter.filterName} : {filter.filterVal}
                                        <IconButton onClick={() => deleteFilter(index)}><CloseIcon
                                            sx={{fontSize: '18px', color: 'white'}}/></IconButton>
                                    </ListItemText>

                                </ListItem>
                            })}
                        </Stack>
                    </List>
                </Collapse>
            </Box>
            <Paper
                sx={{
                    width: '100%',
                    overflow: 'hidden'
                }}>
                <TableContainer
                    sx={{
                        maxHeight: 440
                    }}>
                    <Table
                        stickyHeader
                        aria-label="sticky table">
                        <TableHead>
                            <TableRow
                                sx={{
                                    position: 'relative'
                                }}>
                                <StyledTableCell onClick={() => sortBy('id')}>
                                    ID
                                    <SortIcon
                                        sx={{
                                            fontSize: '20px',
                                            position: 'relative',
                                            top: '4px',
                                            left: '2px'
                                        }}/>
                                </StyledTableCell>
                                <StyledTableCell onClick={() => sortBy('first_name')}>
                                    First Name
                                    <SortByAlphaIcon
                                        sx={{
                                            fontSize: '20px',
                                            position: 'relative',
                                            top: '5px',
                                            left: '2px'
                                        }}/>
                                </StyledTableCell>
                                <StyledTableCell onClick={() => sortBy('last_name')}>
                                    Last Name
                                    <SortByAlphaIcon
                                        sx={{
                                            fontSize: '20px',
                                            position: 'relative',
                                            top: '5px',
                                            left: '2px'
                                        }}/>
                                </StyledTableCell>
                                <StyledTableCell onClick={() => sortBy('age')}>
                                    Age
                                    <SortIcon
                                        sx={{
                                            fontSize: '20px',
                                            position: 'relative',
                                            top: '5px',
                                            left: '2px'
                                        }}/>
                                </StyledTableCell>
                                <StyledTableCell>
                                    Details
                                </StyledTableCell>
                            </TableRow>
                        </TableHead>
                        {
                            isLoading ?
                                <TableBody>
                                    <TableRow>
                                        <TableCell>
                                            <Stack
                                                justifyContent="center"
                                                alignItems="center"
                                                spacing={4}
                                                sx={{
                                                    padding: '100px 0 100px 0', width: '97vw'
                                                }}>
                                                <CircularProgress
                                                    size={100}
                                                />
                                                <Typography
                                                    variant={"h4"}
                                                    style={{
                                                        paddingLeft: '20px'
                                                    }}>
                                                    Loading...
                                                </Typography>
                                            </Stack>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                                :
                                <TableBody>
                                    {users
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((user) => {
                                            return <StyledTableRow
                                                key={user.id}
                                                sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                                                <TableCell
                                                    component="th"
                                                    scope="row"
                                                    sx={{
                                                        paddingLeft: '20px'
                                                    }}>
                                                    {user.id}
                                                </TableCell>
                                                <TableCell
                                                    sx={{
                                                        paddingLeft: '20px'
                                                    }}>
                                                    {user.first_name}
                                                </TableCell>
                                                <TableCell
                                                    sx={{
                                                        paddingLeft: '20px'
                                                    }}>
                                                    {user.last_name}
                                                </TableCell>
                                                <TableCell
                                                    sx={{
                                                        paddingLeft: '20px'
                                                    }}>
                                                    {user.age}
                                                </TableCell>
                                                <TableCell
                                                    sx={{
                                                        padding: '0 0 0 5px'
                                                    }}>
                                                    <Stack direction={'row'}>
                                                        <UserDetailModal
                                                            firstName={user.first_name}
                                                            lastName={user.last_name}
                                                            age={user.age}>
                                                            <InfoIcon/>
                                                        </UserDetailModal>
                                                        <Link to={`detail-page/${user.id}`}>
                                                            <IconButton sx={{padding: '5px'}}>
                                                                <ArticleIcon/>
                                                            </IconButton>
                                                        </Link>
                                                    </Stack>
                                                </TableCell>
                                            </StyledTableRow>
                                        })}
                                </TableBody>
                        }
                    </Table>
                </TableContainer>
                <Stack
                    justifyContent="center"
                    alignItems="center"
                    spacing={1}
                    sx={{
                        paddingBottom: '20px'
                    }}>
                    <TablePagination
                        id={'tablePaginationRoot'}
                        rowsPerPageOptions={[5, 10, 25, 100]}
                        component="div"
                        count={users.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        sx={{
                            '& .MuiIconButton-root': {
                                display: 'none',
                            }
                        }}/>
                    <Pagination
                        page={page + 1}
                        count={paginationNumberCount}
                        variant="outlined"
                        onChange={handleChangePage}/>
                </Stack>
            </Paper>
        </>
    );
}

export default DataTable;
