import React, {useState} from "react";
import "../../styles/ranking.css"
import TodayContent from "./TodayContent";
import WeekContent from "./WeekContent";
import MonthContent from "./MonthContent";
import AllTimeContent from "./AllTimeContent";

const Ranking = () => {
  const [activeTab, setActiveTab] = useState('today');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
    return(
      <div className="container ranking">
      <div className="ranking-user">
      <div style={{marginBottom: "30px"}}>
        <h2>Top Creadores</h2>
        <p className="lead">Explore a los artistas de la comunidad mejor clasificados en la galería</p>
      </div>

      {/* Pestañas */}
      <div className="tabs-container">
        <button className={activeTab === 'today' ? 'active' : ''} onClick={() => handleTabChange('today')}>Today</button>
        <button className={activeTab === 'ThisWeek' ? 'active' : ''} onClick={() => handleTabChange('ThisWeek')}>This Week</button>
        <button className={activeTab === 'ThisMonth' ? 'active' : ''} onClick={() => handleTabChange('ThisMonth')}>This Month</button>
        <button className={activeTab === 'allTime' ? 'active' : ''} onClick={() => handleTabChange('allTime')}>All Time</button>
      </div>

      {/* Contenido según la pestaña activa */}
      <div>
        {activeTab === 'today' && <TodayContent />}
        {activeTab === 'ThisWeek' && <WeekContent />}
        {activeTab === 'ThisMonth' && <MonthContent />}
        {activeTab === 'allTime' && <AllTimeContent />}
      </div>
    </div>
    </div>
    )
}

export default Ranking