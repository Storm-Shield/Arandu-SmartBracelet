import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home"
import Feed from "./pages/Feed";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Quiz from "./pages/Quiz";
import MessagePage from "./pages/MessagePage";
import { useEffect, useState } from "react";
import Alert from "./components/Alert";

const Routers = () => {
    const [alert, setAlert] = useState({})

    useEffect(() => {
        const websocket = new WebSocket('ws://localhost:8765')

        websocket.onopen = () => {
            console.log("Conectado ao WebSocket")
            try{
                websocket.send(JSON.stringify({"type": "listener"}))
            }catch(error){
                console.error("Error to send message:", error)
            }    
        }

        websocket.onmessage = (e) => {
            const data = JSON.parse(e.data)
            setAlert(data)
        }

        websocket.onerror = (error) => {
        console.error("Erro no WebSocket:", error);
    };

    websocket.onclose = () => {
        console.log("WebSocket desconectado")
    }    

    return () => {
        websocket.close()
    }
    }, [])

   

    return(
        <BrowserRouter>
            <Header/>
                <Routes>
                    <Route path="/" element={<Home/>} />
                    <Route path="/feed" element={<Feed/>}/>
                    <Route path="/quiz" element={<Quiz/>}/>
                    <Route path="/message/:candidateName" element={<MessagePage />} />
                </Routes>
            <Footer/>
            {!alert.value && (<Alert {...alert}/>)}
        </BrowserRouter>
    )
}

export default Routers