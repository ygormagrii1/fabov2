import React, { useState, useEffect } from "react";
//@ts-ignore
import styles from './style.css'

const OverlayOrderPlaced: React.FC = () => { 

    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
        }, 10000);

        return () => {
            clearTimeout(timer);
            //setIsVisible(false); // Garante que o componente não seja exibido novamente
          };
        
    }, []);
 
  return (
    <>
    {isVisible && (
        <div className={styles.overlayPlaced}>
          <div className={styles.overlayContainer}>
            <h2 className={styles.overlayTitle}>Estamos Confirmando o seu pedido! <br/>Aguarde</h2>
            <span className={styles.overlaySpinner}></span>
          </div>
        </div>
    )}
    </>    
  ) 
}
 
export default OverlayOrderPlaced
 

