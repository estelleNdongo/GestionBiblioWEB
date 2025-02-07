import React, {useRef, useState,useContext} from "react";
import { Form } from "react-bootstrap";
import { UserContext } from "../App";
import firebase from '../metro.config'
import ReactJsAlert from "reactjs-alert";
import { arrayUnion,Timestamp  } from "firebase/firestore";
import Sidebar from '../components1/Sidebar';
import Navbar from '../components1/Navbar';

export default function SendMess() {

   var dt =Timestamp.fromDate(new Date())
   function ajouter(){
    const washingtonRef = firebase.firestore().collection("BiblioUser").doc(email)

    washingtonRef.update({
      messages: arrayUnion({"recue":"R", "texte": message ,"heure": dt})
    });

   }


    // Add a new document in collection "cities" with ID 'LA'
    const  res = async function(){
        await firebase.firestore().collection('MessagesRecue').doc(message).set({
           email:email,
           messages:message
        })
        setStatus(true);
        setType("success");
        setTitle("Message envoyé avec success");
        setNom("");
        setMessage("Entrer le message");
        setEmail("Entrer l'email");
        setObjet("Entrer l'objet");
        ajouter()
   }

    const [status, setStatus] = useState(false);
    const [type, setType] = useState("");
    const [title, setTitle] = useState("");

    // const [email, setEmail] = useState('');
    const [objet, setObjet] = useState('');
    const [message, setMessage] = useState('');
    const formRef = useRef();
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);
    }


    const {email, setEmail,nom, setNom} = useContext(UserContext)





  return (
    <div className="content-box">
    <Sidebar />
    <Navbar />
    <div>
      <Form ref={formRef} onSubmit={handleSubmit} className="rounded p-4 p-sm-3">
            <Form.Group className='mb-3' controlId='formBasicName'>
                <Form.Label className="labelForm" column={true}>Entrer l'email de l'utilisateur</Form.Label>
                <Form.Control className="email-input" type="email" placeholder="email" name="name" value={email}  onChange={(e) => setEmail(e.target.value)} required></Form.Control>
            </Form.Group>
            <Form.Group className='mb-3' controlId='formBasicName'>
                <Form.Label className="labelForm" column={true}>Entrer l'objet</Form.Label>
                <Form.Control className="name-input" type="text" placeholder="objet" name="name" value={objet}  onChange={(e) => setObjet(e.target.value)} required></Form.Control>
            </Form.Group>
            <Form.Group className='mb-3' controlId='formBasicNumber'>
                <Form.Label className="labelForm" column={true}>Entrer le message</Form.Label>
                <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="Message" name="exemplaire" value={message}  onChange={(e) => setMessage(e.target.value)}></textarea>
            </Form.Group>
            <button type='button' onClick={res} style={{display:'flex',borderRadius:5,textAlign:'center', padding:10,color:'white',background:'rgb(219, 153, 29)',width:100, fontWeight:"bold", textDecoration:"none"}}><a href="messages" style={{color:"black", textAlign:'center',textDecoration:"none"}}>Envoyer </a></button>
            <ReactJsAlert
                status={status} // true or false
                type={type} // success, warning, error, info
                title={title}
                quotes={true}
                quote=""
                Close={() => setStatus(false)}
            />
        </Form>
    </div>
    </div>
  );
}
