import React ,{useState} from 'react';
import ResizePanel from "react-resize-panel";
import {UnControlled as CodeMirror} from 'react-codemirror2'
import './Preview.css'
import MediaQuery from '../MediaQuery/MediaQuery'
import Opciones from './Opciones'
require('codemirror/mode/clike/clike');
require('codemirror/mode/rust/rust');
require('codemirror/mode/python/python');
require('codemirror/theme/material.css'); // muy importante no quitar
require('codemirror/lib/codemirror.css');

const Preview = (props:{display:boolean,preview:string,val:string, onWrite:any,onDisplay:any,onNext:any}) =>{
    let Wide = MediaQuery('(max-width: 800px)');
    const [lang1, setLang1] = useState('python');
    const [lang2, setLang2] = useState('python');
    function onElection1( event:any){
        setLang1(event.target.value);
        console.log(lang1);
    }
    function onElection2( event:any){
        setLang2(event.target.value);
        console.log(lang2);
    }
    return (
        <>
            <div className="container">
                {props.display &&  /* si quieren ver el preview o no */
                <ResizePanel  direction={Wide?"s":"e"} style={{flexGrow:'1'}}>
                    <div className="area1">
                        <Opciones 
                            value={lang1} 
                            onElection={onElection1}/>
                        <button onClick={ () => 
                            {props.onDisplay(false)}}>
                            Quitar preview
                        </button>
                        <button onClick={()=>props.onNext(0)}>←</button> {/*0 para ir a la izquierda*/}
                            <button onClick={()=>props.onNext(1)}>frontend→</button>  {/* 1 para la derecha */}
                                <CodeMirror
                                    value={props.preview}
                                    options={{
                                        mode:lang1,
                                            theme: 'material',
                                            lineNumbers: true,
                                            autoCursor:false,
                                            readOnly:"nocursor"
                                    }}
                                    onChange={(editor, data, value) => {
                                        props.onWrite(value,2);
                                    }}
                                />
                            </div>
                    </ResizePanel> 
                }
                        <div key="bro" className="area1"  >
                            <Opciones 
                                value={lang2} 
                                onElection={onElection2}/>
                            <button onClick={() => {props.onDisplay(true)}}>
                                ver preview
                            </button>
                            <CodeMirror
                                options={{
                                    mode:lang2,
                                        theme: 'material',
                                        lineNumbers: true,
                                        autoCursor:false,
                                }}
                                value={props.val}
                                onChange={(editor, data, value) => {
                                    props.onWrite(value,1)
                                }}
                            />
                        </div>
                    </div>
                </>
            );
};
export default Preview;

