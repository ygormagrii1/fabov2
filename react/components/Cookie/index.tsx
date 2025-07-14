import React, { useEffect, useRef, useState } from "react"
//@ts-ignore
import styles from './style.css'

const Cookie: React.FC = () => {
  const [verify, setVerify] = useState(false)
  const cookieRef = useRef<HTMLDivElement>(null)

  function checkLocalStorage() {
    const storage = localStorage.getItem("privacidade-cookies")
    if (!storage) {
      setVerify(true)
      localStorage.setItem("privacidade-cookies", "true")
    }
  }

  function handleAccept() {
    setVerify(false)
  }

  // Fecha ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cookieRef.current && !cookieRef.current.contains(event.target as Node)) {
        setVerify(false)
      }
    }

    if (verify) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [verify])

  useEffect(() => {
    checkLocalStorage()
  }, [])

  return (
    <div className={`${styles.contentcookie} ${verify ? styles.ativo : ''}`}>
      {verify && (
        <div ref={cookieRef} className={styles.cookie}>
          <span>
            Esse site salva seu histórico de uso. Ao continuar navegando nele, entendemos que Você concorda com a nossa{" "}
            <a href="/institucional/politicas">Política de Privacidade.</a>
          </span>
          <button onClick={handleAccept}>Aceitar e continuar</button>
        </div>
      )}
    </div>
  )
}

export default Cookie