import React, { useEffect, useState } from 'react'
import './style.css'
import { Link, useHistory } from 'react-router-dom'
import { FiPower, FiTrash2 } from 'react-icons/fi'
import logoImg from '../../assets/logo.svg'
import Api from '../../services/api'

function Profile(){
    const ongName = localStorage.getItem('ongName')
    const ongId = localStorage.getItem('ongId')
    const [incidents, setIncidents] = useState([])
    const history = useHistory()

    useEffect(() => {
        Api.get('incidents',{
            headers: {
                auth: ongId
            }
        }).then(response => {
            console.log(response.data)
            setIncidents(response.data.result)
        })
    } , [ongId])

    async function handleDeleteIncident(id){
        try {
            console.log(ongId)
            await Api.delete(`incidents/${id}`, {
                headers: {
                    auth: ongId
                }
            })

            setIncidents(incidents.filter(incident => incident.id !== id))

        } catch (error) {
            alert('Error ao deletar caso')
        }
    }

    function handleLogout(){
        localStorage.clear()
        history.push('/')
    }



    return (
        <div className='profile-container'>
            <header>
                <img src={logoImg} alt='be the hero'></img>
                <span>Bem vinda {ongName}</span>
                <Link className='button' to='/incidents/new'>Cadastrar novo caso</Link>
                <button onClick={handleLogout} type='button'>
                    <FiPower size='18px' color='#e02041' />
                </button>
            </header>

            <h1>Casos cadastrados</h1>

            <ul>
                {incidents.map(incident => (
                    <li key={incident.id}>
                        <strong>CASO: </strong>
                        <p>{incident.title}</p>

                        <strong>DESCRIÇÃO</strong>
                        <p>{incident.description}</p>

                        <strong>VALOR: </strong>
                        <p>{Intl.NumberFormat('pt-BR',{ style: 'currency', currency:'BRL'}).format(incident.value)}</p>

                        <button type='button' onClick={() => handleDeleteIncident(incident.id)}>
                            <FiTrash2 size='20px' color='#a8a8b3'/>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Profile