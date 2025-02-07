import React, { useState, useEffect, useContext, useCallback } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import firebase from '../metro.config';
import { UserContext } from "../App";
import Loading from "./Loading";
import Sidebar from '../components1/Sidebar';
import Navbar from '../components1/Navbar';

export default function Messages() {
    const { setMessages, setEmail, setNom } = useContext(UserContext);

    const refUser = firebase.firestore().collection("BiblioUser");

    const [data, setData] = useState([]);
    const [ dataMes, setDataMes] = useState([]);
    const [loader, setLoader] = useState(false);

    const getDataUser = useCallback(() => {
        refUser.onSnapshot((querySnapshot) => {
            const items = [];
            const itemsMes = [];

            querySnapshot.forEach((doc) => {
                const userData = doc.data();

                if (userData.messages && userData.messages.length > 1) {
                    items.push(userData);
                }

                if (userData.messages) {
                    itemsMes.push(userData.messages);
                }
            });

            setData(items);
            setDataMes(itemsMes);
            setLoader(true);

            console.log("Données récupérées:", items);
        });
    }, [refUser]);

    useEffect(() => {
        getDataUser();
    }, [getDataUser]);

    const changerCat = (mes, mail, nom) => {
        setMessages(mes);
        setNom(nom);
        setEmail(mail);
    };

    const newMessage = () => {
        setEmail(""); // Assurez-vous de passer une valeur correcte
    };

    return (
        <div className="content-box">
            <Sidebar />
            <Navbar />
            <Section>
                <div className="mess">Historique des discussions</div>
                {loader ? (
                    <>
                        <div className="header-mess">
                            <div className="header-name">Noms</div>
                            <div className="header-me">Messages les plus récents</div>
                        </div>
                        {data.map((msg, index) => (
                            <div
                                className="horizon-div"
                                key={index}
                                onClick={() => changerCat(msg.messages, msg.email, msg.name)}
                            >
                                <NavLink className="lin" to="/discuss" end>
                                    <div className="mess-name">{msg.name} :</div>
                                    <div className="mess-mess">
                                        {msg.messages && msg.messages.length > 0
                                            ? msg.messages[msg.messages.length - 1].texte
                                            : "Aucun message"}
                                    </div>
                                </NavLink>
                            </div>
                        ))}
                    </>
                ) : (
                    <Loading />
                )}

                <NavLink onClick={newMessage} className="new-message-link" to="/sendMessage" end>
                    <div className="new-message"><span>+</span></div>
                </NavLink>

                <NavLink to="/accueil" className="home">
                    Aller à Accueil
                </NavLink>
            </Section>
        </div>
    );
}

const Section = styled.section`
    margin-top: 40px;
    .mess {
        color: black;
        text-align: center;
        font-size: 40px;
        margin-bottom: 20px;
        text-decoration: underline;
        border: 2px solid black;
    }

    .header-mess {
        display: flex;
        width: 100%;
        height: 50px;
        color: black;
        margin: 0 0 20px 0;

        .header-name {
            padding-top: 10px;
            width: 30%;
            height: 100%;
            text-align: center;
            font-size: 30px;
        }
        .header-me {
            padding-top: 10px;
            text-align: center;
            width: 70%;
            height: 100%;
            font-size: 30px;
        }
    }

    .horizon-div {
        display: flex;
        margin-top: 10px;

        a {
            display: flex;
            text-decoration: none;
            width: 100%;
            height: 50px;
            color: black;

            .mess-name {
                padding-top: 10px;
                width: 30%;
                height: 100%;
                text-overflow: ellipsis;
                text-align: center;
                white-space: nowrap;
                overflow: hidden;
                font-family: Consolas;
                font-size: 20px;
                font-weight: bold;
            }

            .mess-mess {
                padding-top: 10px;
                width: 70%;
                height: 100%;
                text-overflow: ellipsis;
                text-align: center;
                white-space: nowrap;
                overflow: hidden;
                font-size: 20px;
            }
        }

        &:hover {
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.322);
            background-color: transparent;
            border-radius: 10px;
        }
    }

    .horizon-div:nth-child(2n + 1) {
        background: white;
        border-radius: 10px;
    }

    .home {
        display: flex;
        position: fixed;
        background-color: rgb(219, 153, 29);
        color: white;
        width: 100px;
        height: 50px;
        bottom: 50px;
        border-radius: 5px;
        text-align: center;
        padding: 10px;
        font-weight: bold;
        text-decoration: none;
        justify-content: center;
        align-items: center;
    }

    .new-message-link {
        .new-message {
            display: flex;
            position: fixed;
            background-color: rgb(219, 153, 29);
            color: white;
            width: 50px;
            height: 50px;
            bottom: 50px;
            right: 50px;
            border-radius: 30px;
            z-index: 5;
            font-size: 60px;
            justify-content: center;
            align-items: center;
            transition: 0.5s ease-in-out;

            &:hover {
                transform: scale(1.1);
            }
        }
    }
`;
