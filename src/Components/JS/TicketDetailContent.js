import Box from "@mui/material/Box";
import {Typography} from "@mui/material";

export default function TicketDetailContent(props) {
    console.log(props)
    const ticketDetailData = [
    {
        "leftHeader": "Ticket title",
        "leftSubtitle": `${props.ticket_info.title}`,
        "rightHeader": "Ticket description",
        "rightSubtitle": `${props.ticket_info.description}`
    },
    {
        "leftHeader": "Assigned developer",
        "leftSubtitle": "Demo assigned developer",
        "rightHeader": "Ticket submitter",
        "rightSubtitle": "Demo ticket submitter"
    },
    {
        "leftHeader": "Project",
        "leftSubtitle": "Demo project title",
        "rightHeader": "Ticket priority",
        "rightSubtitle": `${props.ticket_info.priority}`
    },
    {
        "leftHeader": "Ticket status",
        "leftSubtitle": "Demo ticket status",
        "rightHeader": "Ticket type",
        "rightSubtitle": "Demo ticket type"
    },
    {
        "leftHeader": "Created",
        "leftSubtitle": `${props.ticket_info.created_on}`,
        "rightHeader": "Updated",
        "rightSubtitle": "Demo ticket update time"
    },
]
    const ticketDetailElements = ticketDetailData.map((entry) =>
        <>
            {/*box that contains both columns*/}
            <Box sx={{
                display: "flex",
                flexDirection: 'row',
                justifyContent: 'space-between'
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
                        >
                            {entry.leftHeader}

                        </Typography>

                        <Typography variant="subtitle2">
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
                        >
                            {entry.rightHeader}

                        </Typography>

                        <Typography variant="subtitle2" fontSize="0.75rem">
                            {entry.rightSubtitle}
                        </Typography>

                    </div>
                </Box>
            </Box>
        </>
    )

    return (
        <>
            {ticketDetailElements}
        </>
    )
}