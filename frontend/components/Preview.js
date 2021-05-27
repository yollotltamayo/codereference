import React ,{useState,useEffect} from 'react';
import Cardboard from '../components/Carboard'
import {UnControlled as CodeMirror} from 'react-codemirror2'
import style from '../styles/Preview.module.css'
import dynamic from 'next/dynamic'
import MediaQuery from './MediaQuery'
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import rust from 'highlight.js/lib/languages/rust';
import cpp from 'highlight.js/lib/languages/cpp';
import namedCodeBlocks from 'markdown-it-named-code-blocks';
import Sider from '../components/Sider';
hljs.registerLanguage('js', javascript);
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('rust', rust);
hljs.registerLanguage('c++', cpp);
if (typeof navigator !== 'undefined') { // to avoid ssr
    require('codemirror/mode/clike/clike');
    require('codemirror/mode/rust/rust');
    require('codemirror/mode/python/python');
    require('codemirror/mode/javascript/javascript');
    require('codemirror/mode/markdown/markdown');
    require('codemirror/theme/material.css'); // muy importante no quitar
    require('codemirror/lib/codemirror.css');
}

//const ResizePanel = dynamic(() => import('react-resize-panel'),{ssr:false});
var tm = require('markdown-it-texmath');
var md = require('markdown-it')({
    breaks:       true,        // Convert '\n' in paragraphs into <br>
    highlight: function (str, lang) {
        if (lang && hljs.getLanguage(lang)) {
            try {
                return `<pre><code class="lang-${lang}">` +
                    hljs.highlight(str, { language: lang, ignoreIllegals: true }).value +
                    '</code></pre>';
            } catch (__) {}
        }

        return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
    },
    html:false
})
    .use(require('markdown-it-multimd-table'))
    .use(namedCodeBlocks)
    .use(tm, { engine: require('katex'),
        delimiters:'dollars',
        katexOptions: { macros: {"\\RR": "\\mathbb{R}"} }
    });
//console.log(markdown.parse("# hello\n*world*"))

const CodingBoard = (props) => {
    return (
        <div>
            <CodeMirror
                options={{
                    mode:props.lang,
                    theme: 'material',
                    lineNumbers: true,
                    autoCursor:false,
                    readOnly : props.read
                }}
                value={props.value}
                onChange={(editor, data, value) => {
                    props.onWrite(value,props.write)
                    //console.log('onChange',value);
                    if(typeof props.setMarked !== 'undefined'){
                        props.setMarked(value);
                    }
                }}
            />
        </div>
    )

}
//
//const Preview = (props:{display:boolean,preview:string,val:string, onWrite:any,onDisplay:any,onNext:any}) =>{

const Preview = (props)=>{
    let Wide = MediaQuery('(max-width: 800px)');
    const [mark,setMarked] = useState("");
    const [prev, setPrev] = useState("");
    const [currentWindow, setCurrentWindow ] = useState(true); // true => displat current refs , false display preview
    const [display, setDisplay] = useState(false)
    useEffect( () => {
        hljs.highlightAll();
    });
    //const CodingBoard = (props:{lang,election,onWrite,onDisplay,value})=> {
    //console.log('props.val',props.val);
    return (
        <>
            <div className={style.container}>
                <Sider setDisplay={setDisplay} />
                <div key="bro" className={style.area1}  >
                    {/*<div className={style.optionBar}>
                        <Opciones 
                            value={lang2} 
       
                            onElection={onElection2}/>
                        <button onClick={() => {props.onDisplay(true)}}>
                            ver preview
                        </button>
                    </div>*/}
                    <div>
                        <CodingBoard 
                            lang= {"markdown"}
                            onWrite={props.onWrite}
                            onDisplay={props.onDisplay} 
                            write={1}
                            value={ props.val }
                            setMarked={setMarked}
                        />
                    </div>

                </div>
                <div className={style.tabs + ' ' + style.divPreview}>
                    <button 
                        className={currentWindow?"":style.tabsDisabled}
                        onClick={() => setCurrentWindow(true)}>
                        Reference
                    </button>
                    <button 
                        className={!currentWindow?"":style.tabsDisabled}
                        onClick={() => setCurrentWindow(false)}
                    >
                        Preview
                    </button>
                    {currentWindow ? 
                        <>
                            <div className={style.markdown + " markdown-body"} 
                                dangerouslySetInnerHTML={{__html: md.render(mark)}}>
                            </div>
                        </>
                        :
                        <div className={style.markdown + " markdown-body"} 
                            dangerouslySetInnerHTML={{__html: md.render(prev)}}>
                        </div>
                    }
                </div>
                <div>
                    {!display &&
                    <Cardboard
                        setCurrentWindow={setCurrentWindow}
                        setPrev={setPrev}
                    />
                    }
                </div>
            </div>
        </>
        
    );
};
export default Preview;

