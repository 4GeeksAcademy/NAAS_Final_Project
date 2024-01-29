import React,{useContext} from 'react'
import { Context } from "../store/appContext";
import "../../styles/ranking.css"

function RankingItem() {
    const {store, actions} = useContext(Context)
  return (
    <div>
         <div className="user-info">
               <p>Nombre del usuario</p>
                <div className="user-stats">
                    <p>Likes</p>
                    <p>Votos</p>
                    <p>Publicaciones</p>
                </div>
            </div>
            {store.rankings.map((userData, index) => (
                <div className='ranking-container' key={index}>
                    <div className="ranking-info">
                        <div className="ranking-circle">
                            <p>{userData.rank}</p>
                        </div>
                        <img src={userData.imageUrl} alt='user' className='rounded-circle' />
                        <h5>{userData.username}</h5>
                    </div>
                    <div className="ranking-numbers">
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