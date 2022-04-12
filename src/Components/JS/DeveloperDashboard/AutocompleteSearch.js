import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import '../../CSS/searchbar.css'

function sleep(delay = 0) {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    });
}

export default function AutocompleteSearch() {
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState([]);
    const loading = open && options.length === 0;
    const requestOption = {
        method: 'GET',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'Authorization': `Token ${localStorage.getItem('token')}`
        }
    }
    const navigate = useNavigate()
    useEffect(() => {
        let active = true;

        if (!loading) {
            return undefined;
        }

        (async () => {
            await sleep(1e3); // For demo purposes.

            if (active) {
                fetch('http://127.0.0.1:8000/api/search/', requestOption)
                    .then(request => request.json())
                    .then(data => {
                        setOptions(data)

                    })
                    .catch(error => console.log(error))
                // setOptions([...topFilms]);
            }
        })();

        return () => {
            active = false;
        };
    }, [loading]);

    useEffect(() => {
        if (!open) {
            setOptions([]);
        }
    }, [open]);

    return (
        <Autocomplete
            id="size-small-standard"
            size="small"
            sx={{
                width: 300,
                }}
            open={open}
            onOpen={() => {
                setOpen(true);
            }}
            onClose={() => {
                setOpen(false);
            }}
            //navigate to page after option is selected in menu and remove the selected option
            onChange={(event, value) => {
                if (value !== null && value.type === 'Projects') {
                    setOpen(false)
                    navigate(`/projects/${value.id}`)
                    navigate(0)

                } else if (value !== null && value.type === 'Tickets') {
                    setOpen(false)
                    navigate(`/tickets/${value.id}`)
                    navigate(0)
                }
                else if (value !== null && value.type === 'Users') {
                    setOpen(false)
                    navigate(`/users/${value.id}`)
                    navigate(0)

            }}}
            isOptionEqualToValue={(option, value) => option.title === value.title}
            getOptionLabel={(option) => option.title}
            options={options}
            groupBy={(option) => option.type}
            loading={loading}
            renderOption={(props, option) => {
                return (
                    <li {...props} key={option.key}>
                        {option.title}
                    </li>
                );
            }}
            renderInput={(params) => (
                <TextField
                    {...params}
                    variant="standard"
                    label="Search"
                    //makes label white
                    InputLabelProps={{
                        style: {color: '#fff'},
                    }}
                    InputProps={{
                        ...params.InputProps,
                        //makes the selected option white when added to the box
                        sx: {color: '#fff'},
                        endAdornment: (
                            <>
                                {loading ? <CircularProgress color="inherit" size={20}/> : null}
                                {params.InputProps.endAdornment}
                            </>
                        ),
                    }}

                />
            )}
        />

    );
}


