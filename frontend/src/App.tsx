import React from 'react';
import axios from 'axios';
import { Layout } from 'antd';
import './App.css';
import Preview from './components/preview/Preview';
import Navbar from './components/navbar/navbar';
import Cards from './components/cards/Cards';
import arr from './arr';
const { Sider } = Layout;
function App() { 
    const [list, setList] = React.useState(arr); 
    const [text, setText] = React.useState(""); 
    const [prec, setPrec] = React.useState("");
    const [prev, setPrev] = React.useState("");
    const [display, setDisplay] = React.useState(false);
    const [idex, setIdx] = React.useState(0);
    function loadData(){
        axios.get("/api")
            .then(response => {
                setList(response.data)
            })
            .catch( () => console.log("F"));
    }
    function submit(){
        axios( {
            method:'POST',
            url:'/api/submit',
            data : {
                author: "yollotl",
                content: prec
            }
        }
        );
    }
    function handleId(Mov:number){
        let new_idex = 0;
        if(Mov === 1)
            new_idex = (idex + 1)%list.length;
        else
            new_idex = ((idex )%list.length + list.length)%list.length;
        if( new_idex >= 0 && new_idex < list.length){
            setIdx(new_idex);
            setPrev(list[idex].content);
        }
    }

    function handleRemove(id:number) {
        const newList = list;
        newList.splice(id,1);
        setList(newList);
    }
    function handleNewText(newText:string,estado:number) {
        let aux = prec;
        if(estado === 1){
            setPrec(newText);
        }else{
            if(estado===2){
                setPrev(newText);    
            }else{
                if( aux === "")
                    aux= newText;
                else{
                    aux+= '\n' + newText;
                }
                setText(aux);
            }
        }
    }
    function handleDisplay(val:boolean){
       setDisplay(val); 
    }
    return (
        <>
            <body>
                <Navbar/>
                <Sider
                    style={{
                        overflowX: 'auto',
                            height: '100vh',
                            position: 'fixed',
                            left: 0, 
                    }} className="barra"> 
                    {list.length
                    ?   <List list={list} 
                        onDisplay={handleDisplay}  
                        onWrite={handleNewText} 
                        onRemove={handleRemove}/>
                    : <h2 className="banner_vacio" >
                        vacia
                    </h2>
                    }
                </Sider>
                <main>
                    <button onClick={()=>submit()}>load</button>
                    <Preview 
                        display={display} 
                        preview={prev} 
                        onDisplay={handleDisplay} 
                        onWrite={handleNewText} 
                        val={text}
                        onNext={handleId}
                    />
                </main>

            </body>
        </>
    );
}

export default App;
const List = (props:{list:any, onRemove:any, onWrite:any,onDisplay:any}) => (
    <>
        {props.list.map((x:any,index:number) => (
            <Cards content={x.content} 
                id ={index} 
                onRemove={props.onRemove} 
                onDisplay={props.onDisplay} 
                onWrite={props.onWrite}/>
        ))}
    </>
);

