import React from 'react';
import "../../styles/ranking.css";

function RankingUser() {
    return (
        <div className='e-claro mobile-column ranking-container'>
            <div className="e-claro ranking-info">
            <div className="e-claro ranking-circle">
                    <p>1</p>
                </div>
                <img src='' alt='user' className='e-claro rounded-circle' />
                <h5>Nombre del usuario</h5>
            </div>
            <div className="e-claro ranking-numbers">
                <p>456</p>
                <p>789</p>
                <p>123</p>
            </div>
        </div>
    );
}

export default RankingUser;
