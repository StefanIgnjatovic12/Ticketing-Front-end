import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import SelectMenu from "./SelectMenu";
import Container from "@mui/material/Container";
import * as React from "react";
// import Cookies from "js-cookie";
import {useEffect, useState} from "react";
import MUIDataTable from "mui-datatables";

export default function RoleManagement() {

    // const csrftoken = Cookies.get('csrftoken');
    const [loading, setLoading] = useState(null)
    const [users, setUsers] = useState(null)
    //number of rows to display
    const [personName, setPersonName] = useState([])
    const [selectedUser, setSelectedUser] = useState([])
    const [selectedRole, setSelectedRole] = useState("")
    const [searchDone, setSearchDone] = useState(null)

    //Array to populate the User table
    const userData = () => {
        let userDataArr = []
        for (let i = 0; i < users.length; i++) {
            userDataArr.push([
                `${users[i].first_name} ${users[i].last_name}`,
                users[i].email,
                users[i].roles.assigned_role
            ])
        }
        return userDataArr
    }
    //handle change for selecting names in SelectMenu component
    const handleChangeMultiple = (event) => {
        const {options} = event.target;

        const value = [];
        const selectedID = []
        for (let i = 0, l = options.length; i < l; i += 1) {
            if (options[i].selected) {
                value.push(options[i].value);
                selectedID.push(options[i].getAttribute('id'))
            }
        }

        setPersonName(value);
        setSelectedUser(selectedID)


    };
    const handleRoleChange = (event) => {
        setSelectedRole(event.target.value)


    }
    //edit role of user based on SelectMenu component inputs
    const createPayload = () => {
        let putPayload = []
        if (selectedUser.length > 0 && selectedRole.length > 0) {
            for (let i = 0; i < selectedUser.length; i++) {
                putPayload.push({
                    user: selectedUser[i],
                    assigned_role: selectedRole
                })

            }
        }

        return JSON.stringify(putPayload)

    }

    //need to make this so you don't need to refresh the page to see the change
    const editRole = () => {
        setSearchDone(Math.floor(Math.random() * 1000))
        const requestOptions = {
            method: 'PUT',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: createPayload()

        }
        //if only 1 user selected, request sent to endpoint for updating single object in db

        selectedUser === 1
            ? fetch(`http://127.0.0.1:8000/api/update-role/${selectedUser}/`, requestOptions)
            : fetch(`http://127.0.0.1:8000/api/update-role/`, requestOptions)


    }
    //fetch user data to populate table
    useEffect(() => {
            const fetchUsers = (num) => {
                fetch(`http://127.0.0.1:8000/api/users/?limit=${num}`)
                    .then(response => response.json())
                    .then(data => {
                        console.log('Data loaded in useEffect')
                        setUsers(data)
                        setLoading(true)


                    })
            }

            fetchUsers(20)
        }

        , [searchDone])


    return (

        <Container maxWidth="lg" sx={{mt: 4, mb: 4}}>
            <Grid container spacing={3} direction='row' justifyContent="space-between"
                  alignItems="flex-start">
                <Grid item xs={12} sm={12} md={4} lg={4}>

                    {loading
                        ? <Paper
                            sx={{
                                p: 2, display: 'flex', flexDirection: 'column',
                            }}
                        >
                            <SelectMenu
                                users={users}
                                loading={loading}
                                personName={personName}
                                handleChangeMultiple={handleChangeMultiple}
                                editRole={editRole}
                                selectedRole={selectedRole}
                                handleRoleChange={handleRoleChange}
                                createPayload={createPayload}
                            />
                        </Paper>
                        : null
                    }
                </Grid>
                {/* Recent UserTable */}
                <Grid item xs={12} sm={12} md={8} lg={8}>
                    {loading
                        ? <MUIDataTable
                            columns={['Name', 'Email', 'Role']}
                            data={userData()}
                            title={"Users"}
                            options={
                                {selectableRows: 'none'}
                            }

                        />
                        : null}

                </Grid>
            </Grid>

        </Container>

    )
}