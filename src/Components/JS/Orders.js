import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';


function preventDefault(event) {
  event.preventDefault();
}

export default function Orders(props) {
  // console.log(props)
  return (
    <React.Fragment>
      <Title>Recent Orders</Title>
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
              {/*<TableCell>{user.shipTo}</TableCell>*/}
              {/*<TableCell>{user.paymentMethod}</TableCell>*/}
              {/*<TableCell align="right">{`$${user.amount}`}</TableCell>*/}
            </TableRow>
          ))
          : null}


        </TableBody>
      </Table>
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more orders
      </Link>
    </React.Fragment>
  );
}