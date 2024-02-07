import React, {useState} from "react";
import "../../styles/ranking.css"
import TodayContent from "./TodayContent";
import WeekContent from "./WeekContent";
import MonthContent from "./MonthContent";
import AllTimeContent from "./AllTimeContent";
import "../../styles/background.css"

const Ranking = ({title, description}) => {
  const [activeTab, setActiveTab] = useState('today');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
    return(
      <div className="e-claro mobile-column container ranking color-back">
      <div className="e-claro mobile-column ranking-user">
      <div style={{marginBottom: "30px"}}>
        <h2>{title}</h2>
        <p className="lead">{description}</p>
      </div>

      {/* Pestañas */}
      <div className="e-claro mobile-column tabs-container">
        <button className="e-claro"{...activeTab === 'today' ? 'active' : ''} onClick={() => handleTabChange('today')}>Today</button>
        <button className={activeTab === 'ThisWeek' ? 'active' : ''} onClick={() => handleTabChange('ThisWeek')}>This Week</button>
        <button className={activeTab === 'ThisMonth' ? 'active' : ''} onClick={() => handleTabChange('ThisMonth')}>This Month</button>
        <button className={activeTab === 'allTime' ? 'active' : ''} onClick={() => handleTabChange('allTime')}>All Time</button>
      </div>

      {/* Contenido según la pestaña activa */}
      <div className="e-claro">
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