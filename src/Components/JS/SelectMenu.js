import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {useState} from 'react';
import Title from './Title';
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'

export default function SelectMenu(props) {
    // const [personName, setPersonName] = useState([]);
    // const handleChangeMultiple = (event) => {
    //     const {options} = event.target;
    //     const value = [];
    //     for (let i = 0, l = options.length; i < l; i += 1) {
    //         if (options[i].selected) {
    //             value.push(options[i].value);
    //         }
    //     }
    //     setPersonName(value);
    //
    // };

    return (
        <>
            <Title>Select one or more users</Title>

            <div>
                {/*Select user form*/}
                <FormControl sx={{m: 1, minWidth: 300, maxWidth: 450}}>
                    <InputLabel shrink htmlFor="select-multiple-native">
                        Native
                    </InputLabel>
                    <Select
                        multiple
                        native
                        value={props.personName}
                        // @ts-ignore Typings are not considering `native`
                        onChange={props.handleChangeMultiple}
                        label="Native"
                        inputProps={{
                            id: 'select-multiple-native',
                        }}
                    >
                        {/*id on option is set so that when name is selected, its
                        id can be passed to the backend to edit role*/}
                        {props.loading ? props.users.map((user) => (
                                <option id={user.id} key={user.id} value={user.username}>
                                    {`${user.first_name} ${user.last_name}`}
                                </option>
                            ))
                            : null}
                    </Select>
                </FormControl>
            </div>
            <Title>
                Select the role to assign
            </Title>
            {/*    Select role form*/}
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Role</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    size="small"
                    label="Role"
                    value={props.selectedRole}
                    onChange={props.handleRoleChange}
                >
                    <MenuItem value="Admin">Admin</MenuItem>
                    <MenuItem value="Developer" >Developer</MenuItem>
                    <MenuItem value="User" >User</MenuItem>
                </Select>
            </FormControl>
            <Button
                variant="contained"
                href="#contained-buttons"
                sx={{mt: 5}}
                // onClick={props.editRole}
                onClick={props.createPayload}

            >
                Submit
            </Button>
        </>
    );
}