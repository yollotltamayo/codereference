import Cards from '../components/Cards';
import {memo} from 'react';
const List =memo( (props) => {
    //{[><div key={x.id*7} className={props.cardStyle}><]}
    //<div className={props.listaStyle}>
    const fillCards = (list) => {
        var sze = props.list.length,
            start = props.start*props.step ,
            end = start + props.step,
            aux = [];
        
        for(var idx  = start  ;idx < end && idx < sze;idx++){ 
            aux.push(
                    <Cards 
                        id={list[idx].id}
                        key={list[idx].id*13}
                        author={list[idx].author}
                        content={list[idx].content} 
                        onRemove={props.onRemove} 
                        onDisplay={props.onDisplay} 
                        setPrev={props.setPrev }
                        setCurrentWindow={props.setCurrentWindow}

                    />
            );
        }
            return aux

    }
        return ( 
            <>
                {fillCards(props.list)}
            </>
)});
export default List ;
