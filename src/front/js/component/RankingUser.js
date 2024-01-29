import React from 'react';
import "../../styles/ranking.css";

function RankingUser() {
    return (
        <div className='ranking-container'>
            <div className="ranking-info">
            <div className="ranking-circle">
                    <p>1</p>
                </div>
                <img src='' alt='user' className='rounded-circle' />
                <h5>Nombre del usuario</h5>
            </div>
            <div className="ranking-numbers">
                <p>456</p>
                <p>789</p>
                <p>123</p>
            </div>
        </div>
    );
}

export default RankingUser;
