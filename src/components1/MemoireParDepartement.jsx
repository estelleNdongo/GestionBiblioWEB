import React, { useState, useContext } from "react";
import styled from "styled-components";
import { UserContext } from "../App";
import { useLocation } from 'react-router-dom';  // Importation de useLocation
import Modal from 'react-modal';
import { GrFormClose } from 'react-icons/gr';
import Sidebar from "../components1/Sidebar";
import Navbar from "../components1/Navbar";
import Loading from "./Loading";

export default function MemoireParDepartement() {
  const { searchWord } = useContext(UserContext);
  const { state } = useLocation();  // Utilisation de useLocation pour récupérer les données
  const [modalIsOpen, setIsOpen] = useState(false);
  const [selectedMemoire, setSelectedMemoire] = useState(null);

  const memoires = state ? state.memories : [];
  const departement = state ? state.departement : ""; 
  
  


  function openModal(memoire) {
    setSelectedMemoire(memoire);
    setIsOpen(true);
  }

  const customStyles = {
    content: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      padding: '10px 50px',
      transform: 'translate(-50%, -50%)',
    },
  };

  return (
    <div className="content-box">
      <Container>
        <Sidebar />
        <Navbar />
        <MainContent>
          <Title>Liste des Mémoires du {departement}</Title>
          <Section>
            {memoires.length > 0 ? (
              memoires
                .filter((doc) => {
                  const docName = doc.name || "";
                  const search = searchWord || "";
                  return docName.toUpperCase().includes(search.toUpperCase());
                })
                .map((doc, index) => (
                  <Card key={index} onClick={() => openModal(doc)}>
                    <CardContent>
                      <ThemeTitle>{doc.theme}</ThemeTitle>
                      <AuthorName>{doc.name}</AuthorName>
                      <Department>Département : {doc.département}</Department>
                      <Year>Année : {doc.annee}</Year>
                    </CardContent>
                    <CardImage>
                      <a href={doc.image}>
                        <img src={doc.image} alt="mémoire" />
                      </a>
                    </CardImage>
                  </Card>
                ))
            ) : (
              <Loading />
            )}
          </Section>

          <Modal
            isOpen={modalIsOpen}
            onRequestClose={() => setIsOpen(false)}
            style={customStyles}
          >
            <CloseButton onClick={() => setIsOpen(false)}>
              <GrFormClose />
            </CloseButton>
            {selectedMemoire && (
              <>
                <ModalTitle>Détails du Mémoire</ModalTitle>
                <ModalForm>
                  <FormLabel>Nom</FormLabel>
                  <FormInput type="text" value={selectedMemoire.name} readOnly />
                  <FormLabel>Thème</FormLabel>
                  <FormInput type="text" value={selectedMemoire.theme} readOnly />
                  <FormLabel>Département</FormLabel>
                  <FormInput type="text" value={selectedMemoire.département} readOnly />
                  <FormLabel>Année</FormLabel>
                  <FormInput type="text" value={selectedMemoire.annee} readOnly />
                  <FormLabel>Étagère</FormLabel>
                  <FormInput type="text" value={selectedMemoire.etagere} readOnly />
                  <FormLabel>Commentaire</FormLabel>
                  <FormInput type="text" value={selectedMemoire.commentaire} readOnly />
                </ModalForm>
              </>
            )}
          </Modal>
        </MainContent>
      </Container>
    </div>
  );
}

// Styled Components
const Container = styled.div`
  min-height: 100vh;
`;

const MainContent = styled.div`
  padding: 2rem;
`;

const Title = styled.h1`
  text-align: center;
  color: gray;
  margin-bottom: 2rem;
  font-size: 1.8rem;
`;

const Section = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  padding: 1rem;
`;

const Card = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ThemeTitle = styled.h3`
  color: chocolate;
  text-align: center;
  margin-bottom: 1rem;
  font-size: 1.2rem;
`;

const AuthorName = styled.h4`
  color: #333;
  text-align: center;
`;

const Department = styled.h6`
  color: black;
  text-align: center;
  margin-top: 0.5rem;
`;

const Year = styled.h6`
  color: #666;
  text-align: center;
  margin-top: 0.5rem;
`;

const CardImage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;

  img {
    width: 100px;
    height: 100px;
    border-radius: 10px;
    object-fit: cover;
  }
`;

// Modal Styles
const CloseButton = styled.button`
  position: absolute;
  right: 1rem;
  top: 1rem;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
`;

const ModalTitle = styled.h2`
  color: #333;
  margin-bottom: 1.5rem;
`;

const ModalForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
`;

const FormLabel = styled.label`
  font-size: 1rem;
  color: #333;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
`;
