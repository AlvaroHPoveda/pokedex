import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PokedexInfo from '../component/PokedexInfo';

const Pokedex = () => {

    const name = useSelector(state => state.name);
    const [pokemons, setPokemons] = useState([]);
    const [types, setTypes] = useState([]);
    const [namePokemon, setNamePokemon] = useState("");
    const [pokemonSearched, setPokemonSearched] = useState("")
    const [page, setPage] = useState(1)
    const [searchByPokemon, setSearchByPokemon] = useState(false);
    const navigate = useNavigate();

 

    useEffect(()=>{
        axios.get(`https://pokeapi.co/api/v2/type/`)
            .then(res => setTypes(res.data.results));
    },[])

    useEffect(()=>{
        if(namePokemon){
            axios.get(`https://pokeapi.co/api/v2/type/${namePokemon}`)
                .then(res => setPokemons(res.data.pokemon.map(pokemon =>pokemon.pokemon))); 
                setPage(1);
            
        } else{
            axios.get(`https://pokeapi.co/api/v2/pokemon/?offset=${1}&limit=${1118}}`)
                .then(res => setPokemons(res.data.results));
        }
    },[namePokemon]) 
    
    const search = () => navigate(`/pokedex/${pokemonSearched}`)

    const pokemonsForPage = 16;

    const lastIndex = page * pokemonsForPage;
    const firstIndex = lastIndex - pokemonsForPage;
        
    const paginatedPokemons = pokemons.slice(firstIndex, lastIndex);
    const totalPages = Math.ceil(pokemons.length / pokemonsForPage);
       
    let pagesNumber =[];
    for(let i = page; i <= page + 5; i++){
        if(i < totalPages){
        pagesNumber.push(i)
        }
    }

    return (
        <section className='sectionpokedex'>
            <h1 style={{fontSize: '3rem', margin : '1rem'}}>Pokedex</h1>
            <h3 style={{margin : '1rem'}}>Welcome {name}, here you can find your favorite pokemon</h3>
            <div className='headerPokedexInputs'>
                <div className='divInputs'>
                    <div className="center check-container">
                        <span>type</span>
                        <input
                        className='inputTP'
                        type="checkbox"
                        onChange={() => setSearchByPokemon(!searchByPokemon)}/>
                        <span>pokemon</span>
                    </div>
                    {!searchByPokemon ? (
                    <select className='inputpokedex' onChange={e => setNamePokemon(e.target.value)}>
                        <option value="">All pokemons</option>
                        {
                            types.map(type => (
                                <option key={type.url} value={type.name}>{type.name}</option>                        
                            ))
                        }              
                    </select>
                    ):(
                    <div style={{position:'relative'}}>
                        <input className='inputpokedex' 
                            type="text" 
                            id='pokemonSearched'
                            placeholder="Search Here..."
                            value={pokemonSearched}
                            onChange={e => setPokemonSearched(e.target.value)}
                        />
                        <label htmlFor='pokemonSearched'
                            className='buttonpokedex'
                            onClick={search}><i className="fas fa-search"></i>
                        </label>
                    </div>
                    )}
                </div>
            </div>
            <ul className='pokedex-list'>
                {
                    paginatedPokemons.map(pokemon =>(
                        <li key={pokemon.url} className='pokedex-column'>
                            <PokedexInfo url={pokemon.url}/>
                        </li>
                    ))
                }
            </ul>
            <div className='pagination'>
            {
                page !== 1 &&(
                    <button className='chainPagination' onClick={() => setPage(page - 1)}><i className="fas fa-less-than"></i></button>
                )
            }
            {
                pagesNumber.map(number =>
                
                    <button className='chainPagination'
                        key={number}
                        onClick={() => setPage(number)}>
                        {number}
                    </button>)
            }
            {
                page !== totalPages && (
                    <button className='chainPagination' onClick={() => setPage(page + 1)}><i className="fas fa-greater-than"></i></button>
                    )
                }
            </div>
            <div className='page'>{page} / {totalPages}</div>
            
        </section>
    );
};

export default Pokedex;