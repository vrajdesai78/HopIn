import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import TranscriptItem from "./TranscriptItem/TranscriptItem";
import useSymblContext from "../../hooks/useSymblContext/useSymblContext";
import padStart from "lodash-es/padStart";
import Draggable from "react-draggable"
import db from '../firebase.js'
import { collection, addDoc, getDocs } from "firebase/firestore";
import { Box } from '@material-ui/core';


const useStyles = makeStyles(() => ({
    root: {
        display: "flex",
        justifyContent: "center",
        cursor: "grab",
        alignItems: "center",
    },
    mainContainer: {
        padding: 12,
        overflow: "hidden",
        minWidth: '200px',
        height: '100%',
        // maxWidth: '300px',
        width: '20vw',
        border: 'none',
        borderRadius: 0,
        position: 'fixed',
        background: 'rgb(0, 0, 0, 0.5)',
        right: 0,
        zIndex: 1500
    },
    transcriptContainer: {
        overflowY: "auto",
        height: "100%"
    },
    item: {
        display: "flex",
        alignItems: "center",
        margin: "0 10px"
    },
    avatarContainer: {
        margin: 10,
    },
    p: {
        margin: "5px 0",
        fontSize: 14
    },
    avatar: {
        backgroundColor: red[500],
    },
    transcriptsHeader: {
        display: "flex",
        justifyContent: "center",
        paddingBottom: "20px"
    }

}));

export function TranscriptElement({ onSave, width, height, editable = false, transcriptItems }) {

    const classes = useStyles();
    const w = width;
    const h = height;

    const [containerRef, setContainerRef] = useState(null);

    useEffect(() => {
        if (!containerRef) {
            setContainerRef(React.createRef());
        }
    }, [containerRef]);

    useEffect(() => {
        if (containerRef && containerRef.current) {
            const element = containerRef.current;
            element.scrollTop = element.scrollHeight;
        }
    }, [transcriptItems, width, height, containerRef])

    return (
        <Grid container style={{ width: w }} className={classes.root}>
            <Draggable>
                <Paper id={"transcript-paper"} className={classes.mainContainer}
                    variant={"outlined"}
                >
                    <Grid className={classes.transcriptsHeader}>
                        <Typography variant="h6">
                            Transcript
                        </Typography>
                    </Grid>
                    <Grid className={classes.transcriptContainer} ref={containerRef} style={{ height: `calc(${h} - 62px)` }}>
                        {transcriptItems.map((item) => (
                            <div>
                                <p>{item.pfrom.name}</p>
                                <p>{item.ptext}</p>
                            </div>
                        ))}
                    </Grid>
                </Paper>
            </Draggable>
        </Grid>

    );
}


export default function Transcript({ height }) {

    const convertMessageToTranscriptItem = async (message, startedTime) => {
        if (message) {
            const Finaltext = message.text || message.payload.content;
            let FinalTime = {};
            if (message.duration && message.duration.startTime) {
                const messageTime = moment(message.duration.startTime);
                let diff = moment.duration(messageTime.diff(startedTime));
                FinalTime = {
                    hours: padStart(diff.hours().toString(), 2, '0'),
                    minutes: padStart(diff.minutes().toString(), 2, '0'),
                    seconds: padStart(diff.seconds().toString(), 2, '0'),
                };
            }
            const Finalfrom = message.from;

            try {
                const docRef = await addDoc(collection(db, "Developer"), {
                    description: Finaltext,
                    from: Finalfrom,
                    time: FinalTime
                });
                console.log("Document written with ID: ", docRef.id);
            } catch (e) {
                console.error("Error adding document: ", e);
            }
            const querySnapshot = await getDocs(collection(db, "Developer"));
            if (querySnapshot) {
                querySnapshot.forEach((doc) => {
                    setTranscriptItems(prevItems => [...prevItems, {
                        ptext: doc.data().description,
                        ptime: doc.data().time,
                        pfrom: doc.data().from
                    }])
                });
            } else {
                console.log("Error")
            }
        }



    }

    let [transcriptItems, setTranscriptItems] = useState([]);
    const { newMessages, startedTime } = useSymblContext()

    useEffect(() => {
        const fetchData = async () => {
            const querySnapshot = await getDocs(collection(db, "Developer"));
            if (querySnapshot) {
                querySnapshot.forEach((doc) => {
                    setTranscriptItems(prevItems => [...prevItems, {
                        ptext: doc.data().description,
                        ptime: doc.data().time,
                        pfrom: doc.data().from
                    }])
                });
            } else {
                console.log("Error")
            }
        }
        fetchData()

    }, [])


    useEffect(() => {

        if (newMessages && newMessages.length > 0) {
            newMessages.map(message => convertMessageToTranscriptItem(message, startedTime));
        }

    }, [newMessages]);

    return <TranscriptElement transcriptItems={transcriptItems} height={height} />

}