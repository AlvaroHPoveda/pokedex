import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const NameForm = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [name, setName] = useState("");
    
    const submit = e => {
        e.preventDefault();
        dispatch({type:"SET_NAME",payload:name});
        navigate("/Pokedex");
    }
    
    return (
        <section className='sectionForm'>
            <div>
                <h1 className='h1Form'>Hello trainer!</h1>
                <img 
                className='ashImg'
                src="https://www.seekpng.com/png/full/201-2011786_red-by-xous-54-red-pokemon-trainer-png.png" alt="ash" />
            </div>
            <h4 className='pform'>Give me your name to start</h4> 
            <div className='divform'>
                <form className='nameForm' onSubmit={submit}>
                    <label htmlFor="nameform">
                        <input 
                            id='nameform'
                            type="text"
                            value={name}
                            onChange={e=> setName(e.target.value)}
                        />
                    </label>
                    <button className='buttonform'><i className="far fa-paper-plane"></i></button>
                </form>
            </div>
        </section>
    );
};

export default NameForm;