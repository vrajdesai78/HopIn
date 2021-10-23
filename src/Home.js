import React, { useEffect, useState } from 'react';
import { styled } from '@material-ui/core/styles';
import useHeight from './hooks/useHeight/useHeight';
import { useParams } from 'react-router-dom';
import './Home.css';
import LocalVideoPreview from "./components/LocalVideoPreview/LocalVideoPreview";
import Room from "./components/Room/Room";
import useRoomState from "./hooks/useRoomState/useRoomState";
import { useAppState } from "./state";
import useVideoContext from "./hooks/useVideoContext/useVideoContext";
import MenuBar from "./components/MenuBar/MenuBar";
import ClosedCaptions from "./components/ClosedCaptions/ClosedCaptions";
import { SymblProvider } from "./components/SymblProvider";
import Controls from "./components/Controls/Controls";
import { Typography, Grid, Card, CardMedia, CardContent } from '@material-ui/core';
import db from './components/firebase.js'
import { collection, addDoc, getDocs } from "firebase/firestore";

const Container = styled('div')({
    display: 'grid',
    gridTemplateRows: 'auto 1fr',
});

const Main = styled('main')({
    overflow: 'hidden',
});



function Home() {
    const { roomState, room } = useRoomState();
    const height = useHeight();
    let { URLRoomName, UserName } = useParams();
    const [roomName, setRoomName] = useState(URLRoomName);
    const [userName, setUserName] = useState(UserName);
    const { getToken } = useAppState();
    const { connect } = useVideoContext();

    const [hasStarted, setHasStarted] = useState(false);
    const [isStarting, setIsStarting] = useState(false);

    useEffect(() => {
        if (roomState === 'disconnected' && !hasStarted && !isStarting) {
            if (!(roomName && userName) && (room && room.name && room.localParticipant && room.localParticipant.identity)) {
                !roomName && setRoomName(room.name);
                !userName && setUserName(room.localParticipant.identity);
            }
            if (roomName && userName) {
                setIsStarting(true)
                getToken(userName, roomName).then(token => {
                    connect(token)
                    setIsStarting(false);
                    setHasStarted(true);
                });
            }
        }
    }, [roomName, userName, room]);

    const cards = [{ name: 'Developer Days', room: '10' }, { name: 'Community Bonding', room: '12' }, { name: 'React for Beginners', room: '33' }, { name: 'ML for beginners', room: '24' }];


    let [transcriptItems, setTranscriptItems] = useState([]);

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
    const downloadTxtFile = () => {
        const element = document.createElement("a");
        const file = new Blob([
            transcriptItems.map((item) => (
                item.pfrom.name,
                item.ptext

            ))
        ],
            { type: 'text/plain;charset=utf-8' });
        element.href = URL.createObjectURL(file);
        element.download = "myFile.txt";
        document.body.appendChild(element);
        element.click();
    }


    return (
        <Container className='home-ctn'>
            {roomState === 'disconnected' ?
                <Container>
                    <MenuBar />
                    <Typography className='heading-ctn' variant='h3'>Explore Ongoing Sessions</Typography>
                    <Grid container spacing={4}>
                        {cards.map((card) => (
                            <Grid item xs={12} sm={6} md={4} height='300px'>

                                <Card
                                    sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                                >
                                    <CardMedia
                                        component="img"
                                        height='300px'
                                        marginBottom='8px'
                                        sx={{
                                            // 16:9
                                            pt: '56.25%',
                                        }}
                                        image="https://source.unsplash.com/random"
                                        alt="random"
                                    />
                                    <CardContent sx={{ flexGrow: 1 }}>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            Room Name: {card.name}
                                        </Typography>
                                        <Typography>
                                            Participants: {card.room}
                                        </Typography>
                                        <button onClick={downloadTxtFile}>Download Transcript</button>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
                : (
                    <Container style={{ height }}>
                        <MenuBar />
                        <Main>
                            <SymblProvider roomName={roomName}>
                                <Room />
                                <ClosedCaptions />
                                <Controls />
                            </SymblProvider>
                        </Main>
                    </Container>
                )
            }
        </Container >
    );
}

export default Home;
