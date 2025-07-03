import React, { useEffect, useState } from "react";
//@ts-ignore
import styles from './style.css'

const Cookie: React.FC = () => { 


    const [verify, verificar] = useState(false) 
    
    function checkLocalStorage() {
        const storage = localStorage.getItem("privacidade-cookies");
        if(!storage){
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            verificar(true)
            setLocalStorage();
        }
    } 
 
    function setLocalStorage() {
        localStorage.setItem("privacidade-cookies", "true");
    }

    function setLocalStorageBtn() {
        verificar(false)
    }

    useEffect(() => {
        checkLocalStorage();  
    });
 
 
  return (
    <div className={`${styles.contentcookie} ${verify && styles.ativo}`} style={{display: "none"}}>
        <div className={styles.cookie}>
            <span>Esse site salva seu histórico de uso. Ao continuar navegando nele, entendemos que Você concorda com a nossa <a href="/institucional/politicas"> Política de Privacidade.</a></span>
            <button onClick={setLocalStorageBtn}>Aceitar e continuar</button>
        </div>
    </div>     
  ) 
}
 
export default Cookie
 

