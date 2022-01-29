import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PokemonDetail from '../pages/PokedexDetail';
import ValidateColor from '../tools/ValidateColor'


const PokemonInfo = ({url}) => {

    const [pokemon, setPokemon] = useState({});
    const [type, setType] = useState('');

    useEffect(()=>{
        axios.get(url)
            .then(res=>{
                setPokemon({
                    name: res.data.name,
                    id: res.data.id,
                    image: res.data.sprites.front_default,
                    type: res.data.types,
                    hp: res.data.stats[0].base_stat,
                    attack: res.data.stats[1].base_stat,
                    defense: res.data.stats[2].base_stat,
                    speed: res.data.stats[5].base_stat
                })
                setType(res.data.types[0].type.name)
            });
    },[url])
        
    return (
       
        <Link to={`/pokedex/${pokemon.name}`}
         className='pokedex-card'
         style={{background: ValidateColor(type)}}
        >
             <div className="text">
                <h3 className='titleCard'>
                    {pokemon.name}
                </h3>
                 <p className="cloud"> 
                    <b>Types:</b> {" "}
                    {pokemon.type?.map((value) => {
                    return(
                        <span key={value.slot}>{value.type.name}, </span>
                    )
                    })}
                </p> 
                <div><div className="cloud"><b>hp:</b> {pokemon.hp}</div></div>
                <div><div className="cloud"><b>attack:</b> {pokemon.attack}</div></div>
                <div><div className="cloud"><b>defense:</b> {pokemon.defense}</div></div>
                <div><div className="cloud"><b>speed:</b> {pokemon.speed}</div></div>
            </div>
            <div className="imgCard">
                <img src={pokemon.image} alt="" width="100%"/>                
                <div className="pokeballCard"></div>
            </div> 
        </Link>     
        
    );
};

export default PokemonInfo;


