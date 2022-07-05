import filter from "./Filters.module.css";

export default function Filters({allDiets, handleFilterDiet, handleOrderByName, handleOrderByHealthScore}) {
       
    return (
        <div className={filter.container}>
            <select className={filter.select} defaultValue="Alphabetical order" onChange = {(e) => handleOrderByName(e)}>
                <option disabled>Alphabetical order</option>
                <option value="ABC">A to Z</option>
                <option value="ZYX">Z to A</option>
            </select>
            <select className={filter.select} defaultValue="Health score" onChange = {(e) => handleOrderByHealthScore(e)}>
                <option disabled>Health score</option>
                <option value="Max">Max</option>
                <option value="Min">Min</option>
            </select>
            <select className={filter.select} defaultValue="Diet types" onChange = {(e) => handleFilterDiet(e)}>
                <option disabled>Diet types</option>
                <option value="All">All</option>
                {
                    allDiets?.map((dt, index) => { //Crea opciones de acuerdo a la cantidad de tipos de dieta
                        return (
                            <option value= {dt} key= {index}>{dt}</option>
                        )
                    }) 
                }
            </select>            
        </div>
    );
};