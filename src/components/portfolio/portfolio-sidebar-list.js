// import React from "react";

// const PortfolioSidebarList = props => {
//     const portfolioList = props.data.map(portfolioItem => {
//         return (
//             <div key={portfolioItem.id} className="portfolio-item-thumb">
//                 <div className="portfolio-thumb-img">
//                     <img src={portfolioItem.thumb_image_url} />                       
//                 </div>        
//                 <h1 className="title">{portfolioItem.name}</h1>
//                 <h2>{portfolioItem.id}</h2>    
//             </div>
//         );
//     });

//     return <div className="portfolio-sidebar-list-wrapper">{portfolioList}</div>;
// };

// export default PortfolioSidebarList;
import React from "react";

const PortfolioSidebarList = props => {
  const portfolioList = props.data.map(portfolioItem => {
    return (
      <div key={portfolioItem.id} className="portfolio-item-thumb">
        <div className="portfolio-thumb-img">
          <img src={portfolioItem.thumb_image_url} />
        </div>

        <div className="text-content">
          <div className="title">{portfolioItem.name}</div>

          <div className="actions">

            <a className="action-icon" onClick={() => props.handleEditClick(portfolioItem)}>
            </a>

            <a className="action-icon" onClick={() => props.handleDeleteClick(portfolioItem)}>
            </a>
          </div>
        </div>
      </div>
    );
  });

  return <div className="portfolio-sidebar-list-wrapper">{portfolioList}</div>;
};

export default PortfolioSidebarList;