import {useEffect, useState} from "react";
import MUIDataTable from "mui-datatables";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

export default function ProjectDetail(props) {
    const fetchProjectPersonnel = () => {
        fetch(`http://127.0.0.1:8000/api/projects/`)
    }
    return (
        <Container maxWidth="lg" sx={{mt: 4, mb: 4}}>
            <Grid container spacing={3} direction='row' justifyContent="space-between"
                  alignItems="flex-start">
                <Grid item xs={12} sm={12} md={5} lg={5}>
                <MUIDataTable
                   columns={['User name', 'Email', 'Role']}

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
    )
}