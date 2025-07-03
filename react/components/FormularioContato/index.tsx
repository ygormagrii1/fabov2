import React, { useState } from 'react';
//@ts-ignore 
import styles from './style.css'

const ContactForm: React.FC = () => { 
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
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
      const response = await fetch('/api/dataentities/FC/documents', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Exibir uma mensagem de sucesso ou redirecionar o usuário após o envio bem-sucedido.  
        const box = document.getElementById('mensagemsucesso');
        if (box != null) {
          box.style.display = 'block';
        }
        console.log('Dados enviados com sucesso!');
        setFormData({ 
            name: '',
            email: '',
            subject: '',
            message: '',
          });
      } else { 
        // Lidar com erros, como validações do servidor.
        console.error('Ocorreu um erro ao enviar os dados.');
      }
    } catch (error) {
      console.error('Ocorreu um erro ao enviar os dados.', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='formulariocontato'>
        <div className={styles.formulariocontato}>  
          <div className={styles.duascolunas}>
            <div className={styles.colunas}>
                <label htmlFor="name">Nome</label>
                <input
                    type="text"
                    id="name" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange} 
                    placeholder='Ex: João Silva'
                    className={styles.input}
                    required
                /> 
            </div>
            <div className={styles.colunas}>
                <label htmlFor="email">E-mail</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={styles.input}
                    placeholder='exemplo@email.com'
                    required
                />
            </div> 
          </div> 
            <div>
                <label htmlFor="subject">Assunto</label>
                <input
                    type="subject"
                    id="subject"
                    name="subject" 
                    value={formData.subject}
                    onChange={handleChange}
                    className={styles.input}
                    placeholder='Ex.: Vendas B2B, Meu Pedido, etc'
                    required
                />
            </div>  
            <div>
                <label htmlFor="message">Mensagem</label>
                <textarea 
                  id="message"
                  name="message"
                  value={formData.message}
                  //@ts-ignore
                  onChange={handleChange}
                  className={styles.input}  
                  required
                ></textarea>
            </div>  
            <div> 
                <button type="submit">Enviar</button> 
            </div>   
            <div id="mensagemsucesso" className={styles.sucessomensagem} >Sua mensagem foi enviada com sucesso!</div>
        </div>
    </form>
  ); 
};

export default ContactForm;