import { canUseDOM } from 'vtex.render-runtime';

import React, { useState , useEffect } from 'react';
//@ts-expect-error
import img from './assets/New-tela-03.png';
//@ts-ignore 
import styles from './style.css'

const ContactForm: React.FC = () => { 
  const [isIOS, setIsIOS] = useState(false);

  const [checked, setChecked] = useState(false);

  const [formData, setFormData] = useState({
    nome: '',
    email: '',       
  }); 

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/dataentities/NL/documents', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Exibir uma mensagem de sucesso ou redirecionar o usuário após o envio bem-sucedido.
        console.log('Dados enviados com sucesso!');
        const sucesso = document.getElementById('newsletter-modal-success');
        const cadastrar = document.getElementById('newsletter-modal');
        if (sucesso != null && cadastrar != null) {
          cadastrar.style.display = 'none'; 
          sucesso.style.display = 'block';
          sucesso.innerHTML = `<img src="${img}" alt="" />`;
        }
        setFormData({ 
            nome: '',
            email: '',   
          });
      } else { 
        // Lidar com erros, como validações do servidor.
        console.error('Ocorreu um erro ao enviar os dados.');
      }
    } catch (error) {
      console.error('Ocorreu um erro ao enviar os dados.', error);
    }
  };

  useEffect(() => {
    if (checked) {
      return
    }
    //@ts-ignore
    if (canUseDOM) {      
      //@ts-ignore 
      if (window.navigator.userAgent.includes("iPhone") || window.navigator.userAgent.includes("iPad") ) {
        const data = document.getElementsByClassName('tfcvxe-store-theme-0-x-nascimento')[1];
        data?.classList.add(styles.ios);
        data?.addEventListener("click", function(){
          data?.classList.remove(styles.ios);
        });
        setIsIOS(true);        
      } else {
        setChecked(true);    
      }
    }
  }, [isIOS]);

  return (
    <form onSubmit={handleSubmit} >
        <div className={styles.newslettermodal}> 
            <div>
                <input
                    type="text"
                    id="nome" 
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange} 
                    placeholder='Nome'
                    className={styles.input}
                    required
                /> 
            </div>
            <div>
            <input
                type="date"
                id="birthdate"
                name="birthdate"
                onChange={handleChange}
                className={styles.nascimento}
                required 
            />
            </div>
            <div>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={styles.input}
                    placeholder='E-mail'
                    required
                />
            </div>
            <div>
                <button type="submit">Cadastrar e ver cupom</button> 
            </div>    
        </div>
    </form>
  ); 
};

export default ContactForm;