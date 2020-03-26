import React, { useState } from 'react'
import './style.css'
import { Link, useHistory } from 'react-router-dom'
import logoImg from '../../assets/logo.svg'
import { FiArrowLeft } from 'react-icons/fi'
import Api from '../../services/api'


function NewIncident(){
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [value, setValue] = useState('')
    const ongId = localStorage.getItem('ongId')
    const history = useHistory()
    
    async function handleNewIncident(e){
        e.preventDefault()

        const data = {
            title,
            description,
            value
        }
        
        try {
            await Api.post('incidents', data, {
                headers: {
                    auth: ongId
                }
            }).then(res => {
                history.push('/profile')
            })

        } catch (error) {
            alert('Error ao criar um caso')
        }
    
    }




    return (
        <div className='new-incident-container'>
            <div className='content'>
                <section>
                    <img src={logoImg} alt='be the hero'></img>
                    <h1>Cadartrar novo caso</h1>
                    <p>Descreva o caso detalhadamente para encontrar um heroi para resolver isso.</p>

                    <Link className='back-link' to='/profile'>
                        <FiArrowLeft size={16} color='#e02041'/> 
                        Voltar para home
                    </Link>
                </section>

                <form onSubmit={handleNewIncident}>
                    <input 
                        placeholder='Título do caso'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <textarea 
                        placeholder='Descrição'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <input 
                        placeholder='Valor em reais'
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                    />

                    <button className='button' type='submit'>Cadastrar</button>
                </form>
            </div>
        </div>
    )
}

export default NewIncident