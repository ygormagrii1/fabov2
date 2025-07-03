import React, { useState } from 'react';
//@ts-ignore 
import styles from './style.css'

const ContactForm: React.FC = () => { 
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
  }); 
  const [success, setSucces] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
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
      console.log(response, "response form")
      if (response.ok) {
        // Exibir uma mensagem de sucesso ou redirecionar o usuário após o envio bem-sucedido.
        console.log('Dados enviados com sucesso!');
        setSucces(true)
        setTimeout(function( ) {
          setSucces(false)
        }, 2000)
        const box = document.getElementById('mensagemsucesso');
        if (box != null) {
          box.style.display = 'block'; 
        }
        setFormData({ 
            nome: '',
            email: ''
          });

      } else { 
        // Lidar com erros, como validações do servidor.
        console.error('Ocorreu um erro ao enviar os dados.');
        setSucces(false)

      }
    } catch (error) {
      setSucces(false)
      console.error('Ocorreu um erro ao enviar os dados.', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} >
        <div className={styles.newsletterhome}> 
            <div>
                <label htmlFor="name">Nome</label>
                <input
                    type="text"
                    id="nome" 
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange} 
                    placeholder='Digite seu nome'
                    className={styles.input}
                    required
                /> 
            </div>
            <div>
                <label htmlFor="email">E-mail</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={styles.input}
                    placeholder='Digite seu e-mail'
                    required
                />
            </div>
            <div>
                <button type="submit">Cadastrar</button> 
            </div>    
            <div id="mensagemsucesso" className={styles.sucessomensagem} >Sua mensagem foi enviada com sucesso!</div>
            {success && (
              <div className={styles.success}> 
                <strong>Obrigado!</strong>
                <br/>Seu cadastro foi enviado com sucesso. 
                <br/>Para se descadastrar da nossa base, basta clicar no link descadastrar em nossos emails.
              </div>)
            }
        
        </div>
    </form>
  ); 
};

export default ContactForm;