import React,{useContext} from 'react'
import { Context } from "../store/appContext";
import "../../styles/ranking.css"

function RankingItem() {
    const {store, actions} = useContext(Context)
    // Determinar el tipo de ranking basándote en la ruta
    const isUserRanking = window.location.pathname === "/ranking-user";

    const rankings = isUserRanking ? store.userRankings : store.photoRankings;
  return (
    <div className='e-claro'>
         <div className="e-claro mobile-column user-info">
               <p>Nombre del usuario</p>
                <div className="user-stats">
                    <p>Likes</p>
                    <p>Votos</p>
                    <p>Publicaciones</p>
                </div>
            </div>
            {rankings.map((userData, index) => (
                <div className='e-claro mobile-column ranking-container' key={index}>
                    <div className="e-claro ranking-info">
                        <div className="e-claro ranking-circle">
                            <p>{userData.rank}</p>
                        </div>
                        <img src={userData.imageUrl} alt='user' className='rounded-circle' />
                        <h5>{userData.username}</h5>
                    </div>
                    <div className="e-claro ranking-numbers">
                        {userData.numbers.map((number, numberIndex) => (
                            <p key={numberIndex}>{number}</p>
                        ))}
                    </div>
                </div>
            ))}
        </div>

  )
}

export default RankingItem