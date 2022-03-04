import {useEffect, useState} from "react";
import MUIDataTable from "mui-datatables";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import {useLocation} from "react-router";

export default function ProjectDetail(props) {

    const [personnel, setPersonnel] = useState(null)
    const [loading, setLoading] = useState(null)
    //Get project ID from the location URL
    let location = useLocation();
    //get personnel attached to project
    useEffect(() => {
        const fetchProjectPersonnel = (ID) => {
            fetch(`http://127.0.0.1:8000/api${ID}`)
                .then(response => response.json())
                .then(data => {
                    setPersonnel(data)
                    setLoading(true)
                })
        }
        fetchProjectPersonnel(location.pathname)
    }, [])
    const personnelData = () => {
        let personnelDataArr = []
        for (let i = 0; i < personnel.length; i++){
            personnelDataArr.push([
                personnel[i].username,
                personnel[i].email,
                personnel[i].assigned_role
            ])
        }
        return personnelDataArr
    }


    return (
        <>
        {/*    table containing personnel assigned to project*/}
        {loading
        ? <Container maxWidth="lg" sx={{mt: 4, mb: 4}}>
            <Grid container spacing={3} direction='row' justifyContent="space-between"
                  alignItems="flex-start">
                <Grid item xs={12} sm={12} md={5} lg={5}>
                    <MUIDataTable
                        columns={['User name', 'Email', 'Role']}
                        data={personnelData()}
                        title={'Personnel assigned to project'}
                        options={
                            {selectableRows: 'none'}
                        }
                    />


                </Grid>

                <Grid item xs={12} sm={12} md={7} lg={7}>

                </Grid>
            </Grid>
        </Container>
        : null}
        </>
    )
}