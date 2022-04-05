import Box from "@mui/material/Box";
import {Typography} from "@mui/material";
import Divider from "@mui/material/Divider";
import * as React from "react";
import {v4 as uuidv4} from 'uuid';

export default function TicketDetailContent(props) {
    const ticketDetailData = [
        {
            "leftHeader": "Ticket title",
            "leftSubtitle": `${props.ticket_info.title}`,
            "rightHeader": "Ticket description",
            "rightSubtitle": `${props.ticket_info.description}`
        },
        {
            "leftHeader": "Assigned developer",
            "leftSubtitle": `${props.ticket_info.assigned_developer}`,
            "rightHeader": "Ticket submitter",
            "rightSubtitle": `${props.ticket_info.created_by}`
        },
        {
            "leftHeader": "Parent project",
            "leftSubtitle": `${props.ticket_info.parent_project}`,
            "rightHeader": "Ticket priority",
            "rightSubtitle": `${props.ticket_info.priority}`
        },
        {
            "leftHeader": "Ticket status",
            "leftSubtitle": `${props.ticket_info.status}`,
            "rightHeader": "Ticket type",
            "rightSubtitle": `${props.ticket_info.type}`,
        },
        {
            "leftHeader": "Created",
            "leftSubtitle": `${props.ticket_info.created_on}`,
            "rightHeader": "Updated",
            "rightSubtitle": `${props.ticket_info.update_time ? props.ticket_info.update_time : 'No updates yet'}`
        },
    ]
    const ticketDetailElements = ticketDetailData.map((entry) =>
        <div key={uuidv4()}>
            {/*box that contains both columns*/}
            <Divider
            sx={{pb:1.5}}
            />
            <Box sx={{
                display: "flex",
                flexDirection: 'row',
                justifyContent: 'space-between',
                height: '100%'
            }}>
                {/*left column*/}
                <Box sx={
                    {
                        width: 2 / 5,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-start',
                        alignItems: 'flex-start',
                        pl: 2.75,
                        pb: 4
                    }}>
                    {/*    ticket title and description*/}
                    <div>
                        <Typography
                            component="h2"
                            variant="h6"
                            color="#212121"
                            fontSize="1.1rem"
                            fontWeight={500}
                            gutterBottom
                            sx={{mt:1}}

                        >
                            {entry.leftHeader}

                        </Typography>

                        <Typography
                            variant="subtitle2"

                        >
                            {entry.leftSubtitle}
                        </Typography>

                    </div>
                </Box>

                <Box sx={
                    {
                        width: 3 / 5,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-start',
                        alignItems: 'flex-start'
                        // justifyContent: 'space-between',
                        // pl: 2.75
                    }}>
                    {/*    ticket title and description*/}
                    <div>
                        <Typography
                            component="h2"
                            variant="h6"
                            color="#212121"
                            fontSize="1.1rem"
                            gutterBottom
                            sx={{mt:1}}
                        >
                            {entry.rightHeader}

                        </Typography>

                        <Typography variant="subtitle2">
                            {entry.rightSubtitle}
                        </Typography>

                    </div>

                </Box>

            </Box>
            {/*<Divider />*/}
        </div>
    )

    return (
        <>
            {ticketDetailElements}
        </>
    )
}