import React ,{useRef,useState} from 'react';
import ResizePanel from "react-resize-panel";
import {UnControlled as CodeMirror} from 'react-codemirror2'
import './Preview.css'
import '../MediaQuery/MediaQuery'
require('codemirror/mode/xml/xml');
require('codemirror/mode/clike/clike');
require('codemirror/mode/rust/rust');
require('codemirror/mode/python/python');
require('codemirror/lib/codemirror.css');
require('codemirror/theme/material.css');
require('codemirror/theme/zenburn.css');



let bel = ''
const Preview = (props:{val:string, onWrite:any}) =>{
    const [ widhtA , setWidth ]= useState(300);
    const targetRef = useRef();
    const [dimensions, setDimensions] = useState({ width:0, height: 0 })
      let Wide = MediaQuery('(min-width: 800px)');
    return (
        <div className="container">
            <ResizePanel direction="e" style={{flexGrow:'1'}}>
                <div className="area1">
                    <CodeMirror
                        value={props.val}
                        options={{
                            mode: 'python',
                                theme: 'material',
                                lineNumbers: true,
                                autoCursor:false,
                                readOnly:"nocursor"
                        }}
                        onChange={(editor, data, value) => {
                            props.onWrite(value,1);
                            console.log(value);
                        }}
                    />
                </div>
            </ResizePanel>

            <div className="area1" style={{}} >
                <CodeMirror
                    value={props.val}
                    options={{
                        mode: 'python',
                            theme: 'material',
                            lineNumbers: true,
                            autoCursor:false
                    }}
                    onChange={(editor, data, value) => {
                        props.onWrite(value,1);
                        console.log(value);
                    }}
                />
            </div>

        </div>
    );
};
export default Preview;
