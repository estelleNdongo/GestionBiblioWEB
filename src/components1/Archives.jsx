import React, {useState, useEffect, useContext, useCallback} from "react";
import {Table} from 'react-bootstrap';
import firebase from '../metro.config';
import styled from "styled-components";
import { UserContext } from "../App";
import Loading from "./Loading";
import Sidebar from '../components1/Sidebar';
import Navbar from '../components1/Navbar';

function Archives() {

   //debut firebase

   const ref = firebase.firestore().collection("ArchivesBiblio")

   const [data,setData]=useState([])
   //const [dataArchi,setDataArchi]=useState([])
   const [loader,setLoader] = useState(false)

   
  const {searchWord} = useContext(UserContext)

  
   const getData = useCallback(() => {
    ref.onSnapshot((querySnapshot) => {
      const items = []
      querySnapshot.forEach((doc) => {
        items.push(doc.data())
        setLoader(true)
      })
      setData(items)
      
    });
   },[ref]);
  
   useEffect(() =>{
    getData()
  //  console.log('listDocModal',search)
   },[getData])
  //firebase fin
  const { darkMode } = useContext(UserContext);

    return (
      <>
      <Sidebar />
      <Navbar />
      <Section>
        {loader ? 
      <Table variant={darkMode ? "dark" : undefined} striped bordered hover>
        <thead>
          <tr>
            <th>Id</th>
            <th>Nom du client</th>     
            <th>Nom du document</th>
            <th>Date de remise</th>
            <th>Statut</th>
           
          </tr>
        </thead>
        <tbody>
        {data.map((doc, index) =>{
        
      return( doc.tableauArchives.slice().reverse().map((e,i)=>{
        if(e.nomDoc.includes(searchWord.toUpperCase()) || e.heure.toUpperCase().includes(searchWord.toUpperCase()) || e.nomEtudiant.toUpperCase().includes(searchWord.toUpperCase())){
              return ( <tr key={i}>
                    <td>{doc.tableauArchives.length - i}</td>
                    <td>{e.nomEtudiant}</td>
                    
                    <td>{e.nomDoc}</td>
                         
                    <td>{e.heure}</td>
                    <td>Remis</td>
                </tr>);
                }
                return null;

              }))
         
        })}
        </tbody>
      </Table> : <Loading /> }
      </Section>
      </>
    );
  }
  
  export default Archives;

  const Section = styled.section`
    overflow:auto;
    margin-top: 40px;
    margin-bottom: 20px;
  
    td, tr{
      text-align: center;
    }
  `