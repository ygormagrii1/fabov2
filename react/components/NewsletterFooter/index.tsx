import React, { useState } from 'react';
//@ts-ignore 
import styles from './style.css'

const ContactForm: React.FC = () => { 
  const [formData, setFormData] = useState({
    email: '',     
  }); 
  const [emails, setEmails] = useState('') 

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
        setEmails(formData.email);
        setFormData({
            email: '',
        });        
        const box = document.getElementById('mensagemsucessoa');
        if (box != null) {
          box.style.display = 'block';
        } 
      } else { 
        // Lidar com erros, como validações do servidor.
        console.error('Ocorreu um erro ao enviar os dados.');
      }
    } catch (error) {
      console.error('Ocorreu um erro ao enviar os dados.', error);
    }
  }; 

  return (
    <form onSubmit={handleSubmit} > 
        <div className={styles.footernewsletter}> 
            <div>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email} 
                    onChange={handleChange} 
                    placeholder='Insira seu melhor e-mail!'
                    required
                />
            </div> 
            <div> 
                <button type="submit">Cadastrar</button>
            </div>     
            <div id="mensagemsucessoa" style={{ display: 'none' }} className={styles.sucessomensagem}><span>Obrigado!</span> <p>Você foi cadastrado em nossa base de e-mails com o endereço ({emails}). Você pode se descadastrar a qualquer momento clicando no link de descadastramento dentro de nossas newsletters.</p></div>
        </div>
    </form>  
  );   
};

export default ContactForm;