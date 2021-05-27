import Preview from '../components/Preview';
import styles from '../styles/App.module.css';
import {useState,useCallback} from 'react';
//import arr from '../components/arr';



const Editor = (props) => {
    //const [list, setList] = useState(arr); 
    const [text, setText] = useState("experimento"); 
    const [prec, setPrec] = useState("");
    const [flag, setFlag] = useState("");
    const [prev, setPrev] = useState("");
    const [display, setDisplay] = useState(false);
        
    const handleRemove = useCallback((id) => {
        setList(list => list.filter( c => c.id !== id));
        console.log('handleRemove',id);
    },[display])
    const handleNewText = useCallback((newText,estado) =>{
        let aux = prec;
        //console.log('prec' , prec)
        if(estado === 1){
            setPrec( prec => newText);
        }else{
            if(estado===2){
                setPrev(newText);    
            }else{
                if( aux === ""){
                    setText( aux + '\n' + newText);
                }else{
                    //setText( aux +'\n'+ newText  );
                }
                setPrec(prec => prec + "")
                setText(text => prec + '\n' + newText );
                //setText(newText)
            }
        }
    },[display]);
    //,[prec,text])
    const handleDisplay = useCallback((val) =>{
       setDisplay(val); 
    },[])

    return (    
        <>
            {/*<List 
                list={list} 
                listaStyle={styles.lista}
                cardStyle={styles.card}
                onRemove={handleRemove}
                onWrite={handleNewText}
            />*/}
            <main className={styles.main}>
                {/*display={display} 
                onDisplay={handleDisplay}  
                preview={prev} */}
                <Preview 
                    onWrite={handleNewText} 
                    val={text}
                    onDisplay={handleDisplay} 
                />
                {/*onNext={handleId}*/}
                <div style={{color:"white"}}>
                    <br>
                    </br>
                </div>
            </main>
        </>
    )
}
export default Editor;
