import React, { useState } from 'react'
import './style.css'
import { Link, useHistory } from 'react-router-dom'
import logoImg from '../../assets/logo.svg'
import { FiArrowLeft } from 'react-icons/fi'
import Api from '../../services/api'

function Register(){
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [whatsapp, setWhatsapp] = useState('')
    const [city, setCity] = useState('')
    const [uf, setUf] = useState('')
    
    const history = useHistory()
    
    async function handleRegister(e){
        e.preventDefault()

        const data = ({
            name,
            email,
            city,
            whatsapp,
            uf
        })

        
        try {
            const response = await Api.post('ongs',data)
            alert(`Seu ID de acesso:  ${response.data.id}`)
            history.push('/')
        } catch (error) {
            alert("Error no cadastro, tente novamente.")
        }

    }

    return (
        <div className='register-container'>
            <div className='content'>
                <section>
                    <img src={logoImg} alt='be the hero'></img>
                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da suma ONG</p>

                    <Link className='back-link' to='/'>
                        <FiArrowLeft size={16} color='#e02041'/> 
                        Já tenho cadastro
                    </Link>
                </section>

                <form onSubmit={handleRegister}>
                    <input 
                        placeholder='Nome da ONG'
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <input 
                        type='email' 
                        placeholder='E-mail'
                        value={email}
                        onChange={e => setEmail(e.target.value)}    
                    />
                    <input 
                        placeholder='WhatsApp'
                        value={whatsapp}
                        onChange={e => setWhatsapp(e.target.value)}    
                    />
                    <div className='input-group'>
                        <input 
                            placeholder='Cidade'
                            value={city}
                            onChange={e => setCity(e.target.value)}    
                        />
                        <input 
                            placeholder='UF' 
                            style={{ width:'80px'}}
                            value={uf}
                            onChange={e => setUf(e.target.value)}
                        />
                    </div>

                    <button className='button' type='submit'>Cadastrar</button>


                </form>
            </div>
        </div>

    )
}

export default Register