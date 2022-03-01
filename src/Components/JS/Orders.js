import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import TextField from '@mui/material/TextField';


function preventDefault(event) {
    event.preventDefault();
}

export default function Orders(props) {
    //handling change on Textfield using numUserRows setting passed as prop
    const handleChange = (event) => {
        props.setnumUserRows(event.target.value)

    }
    return (
        <React.Fragment>
            <Title>Recent Orders</Title>
            <TextField
                id="standard-number"
                label="Number of entries"
                type="number"
                InputLabelProps={{
                    shrink: true,
                }}
                variant="standard"
                onChange={handleChange}

                sx={{
                    width: 100
                }}

            />
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Role</TableCell>
                        {/*<TableCell>Payment Method</TableCell>*/}
                        {/*<TableCell align="right">Sale Amount</TableCell>*/}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.loading ?
                        props.users.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell>{`${user.first_name} ${user.last_name}`}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.roles.assigned_role}</TableCell>
                            </TableRow>
                        ))
                        : null}


                </TableBody>
            </Table>

        </React.Fragment>
    );
}