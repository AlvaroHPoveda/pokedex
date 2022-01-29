import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import ValidateColor from '../tools/ValidateColor'
import { useNavigate } from 'react-router-dom';

const PokemonDetail = () => {

    const {name} = useParams()
    const [pokemon, setPokemon] = useState({})
    const [type, setType] = useState("")
    const [type2, setType2] = useState("")
    const [ability, setAbility] = useState("")
    const [ability2, setAbility2] = useState("")  
    const [bar, setBar] = useState({});
    const navigate = useNavigate();  

    useEffect(()=>{
        axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
            .then(res=>{
                setPokemon(res.data)
                setType (res.data.types[0].type.name)
                setType2(res.data.types[1].type.name)
                setAbility(res.data.abilities[0].ability.name)
                setAbility2(res.data.abilities[1].ability.name)
                setBar({
                    hp: res.data.stats[0].base_stat,
                    attack: res.data.stats[1].base_stat,
                    defense: res.data.stats[2].base_stat,
                    speed: res.data.stats[5].base_stat
                })                
                })
            
        },[name])
              
    return (
        <main className='gridDetail'
         style={{background: ValidateColor(type)}}>
            <header className='headerDetail'>
                <div className='divImgDetail' style={{background: ValidateColor(type)}}>
                    <img className='imgDetail'
                        src="https://logos-marcas.com/wp-content/uploads/2020/05/Pokemon-Logo.png" alt="" />
                </div>
                <div className='divImgDetail01'>
                    <img className='imgDetail01' src={pokemon?.sprites?.other.home.front_default} alt="" />
                </div>
                <div className='divWH'>
                    <div style={{textAlign: 'center'}}><b>{pokemon.weight}</b><br />Weight</div>
                    <div style={{textAlign: 'center'}}><b>{pokemon.height}</b><br />Height</div>
                </div>
                <div style={{textAlign: 'center'}}>
                <h2>{pokemon.name}</h2>
                </div>
                <div className='divId'>
                    <div className='abc'></div>
                    <div># {pokemon.id}</div>
                    <div className='abc'></div>
                </div>

                </header>

            <section className='sectionDetail01'>
                <div className='divTypeAbilities'>
                    <div className='abcd'></div><div> <h3>Type</h3></div><div className='abcd'></div>
                </div>
                <div className='divsectionDetail'>
                    <div className='buttonDetail'>{type}</div>
                    <div className='buttonDetail'>{type2}</div>
                </div>
            </section>
            <section className='sectionDetail02'>
                <div className='divTypeAbilities'>
                    <div className='abcd'></div><div><h3>Abilities</h3></div><div className='abcd'></div>
                </div>
                <div className='divsectionDetail'>
                    <div className='buttonDetail'>{ability}</div>
                    <div className='buttonDetail'>{ability2}</div>
                </div>
            </section>
            <section className='sectionDetail03'>
                <div className='divId'>
                    <div className='abcd'></div><h2>Stats Base</h2><div className='abcd'></div>
                </div>
                <div className='w3'>
                    <h4 className='h4W3'>Hp :</h4>
                    <div className="w3-light-grey">
                        <div className="w3-grey" style={{height:'24px',width: bar.hp +'%'}}></div>
                    </div>
                </div>
                <div className='w3'>
                    <h4 className='h4W3'>Attack :</h4>
                    <div className="w3-light-grey">
                        <div className="w3-grey" style={{height:'24px',width: bar.attack +'%'}}></div>
                    </div>
                </div>
                <div className='w3'>
                    <h4 className='h4W3'>Defense :</h4>
                    <div className="w3-light-grey">
                        <div className="w3-grey" style={{height:'24px',width: bar.defense +'%'}}></div>
                    </div>
                </div>
                <div className='w3'>
                    <h4 className='h4W3'>Speed :</h4>
                    <div className="w3-light-grey">
                        <div className="w3-grey" style={{height:'24px',width: bar.speed +'%'}}></div>
                    </div>
                </div>          
            </section> 

            <aside className='asideDetail'>
                <div className='divId'>
                    <div className='abcd'></div><h2>Movements</h2><div className='abcd'></div>
                </div>
                    <ul className='asideDetailUl'>                        
                        {
                            pokemon.moves?.map( move => (
                                <li className='asideDetailLi' key={move.url}>
                                    {move.move?.name}
                                </li>
                            ))
                        }                        
                    </ul>                
            </aside>
        </main>
       
        
    );
};

export default PokemonDetail;