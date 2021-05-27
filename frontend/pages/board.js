import {useState,useCallback,useEffect} from 'react';
import axios from 'axios';
//import useSWR from 'swr'
import styles from '../styles/App.module.css';
import arr from '../components/arr';
import Editor from '../components/Editor';
import Head from 'next/head';
import { Avatar } from 'antd';
function App(props) { 
    const [user, setUser ] = useState({});
    const axiosReq = async () => {
        const URI = process.env.URI || "";
        var logged = await axios.get(URI + '/user')
            .then(res => {return res})
        setUser(logged.data)
       
    }
    useEffect( () => {
        axiosReq()
    },[])
        
    const [list, setList] = useState(arr); 
    const [prec, setPrec] = useState("");
    const [display, setDisplay] = useState(false);
    const [idex, setIdx] = useState(0);
    function submit(){
        // fetch
        // http requests 
        // axios http rapido 
        axios( {
            method:'POST',
            url:'/api/submit',
            data : {
                author: props.logged.name,
                content: prec
            }
        }
        );
    }

    //function handleId(Mov:number){
    function handleId(Mov){
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

    const handleRemove = useCallback((id) => {
        setList(list => list.filter( c => c.id !== id));
    },[])
    //function handleNewText(newText,estado) {
        //let aux = prec;
        //console.log('handleNewText',newText);
        //if(estado === 1){
            //setPrec(newText);
        //}else{
            //if(estado===2){
                //setPrev(newText);    
            //} 
        //}
    //}
    const handleNewText = (newText,estado) =>{
        let aux = prec;
        //console.log('prec' , prec)
        if(estado === 1){
            setPrec(newText);
        }else{
            if(estado===2){
                setPrev(newText);    
            }else{
                if( aux === ""){
                    console.log('prec' , prec + newText)
                    //console.log('newText' , newText)
                    setText( aux + '\n' + newText);
                }else{
                    aux+= '\n' + newText;
                    console.log('prec' , prec + newText)
                    //console.log('prec' , prec)
                    setText( aux +'\n'+ newText  );
                }
            }
        }
    }
    //,[prec,text])
    const handleDisplay = useCallback((val) =>{
       setDisplay(val); 
    },[display])
    //const fetcher = (quer) => {
        //axios.get(`/search/find/${quer}`)
            //.then(res => {
                //console.log(res.data);
                //var aux = [];
                //res.data.map( (value) => aux.push(value));
                //setList(aux)
            //});
            //console.log('handleDisplay',quer);
    //};
        //const { data, error } = useSWR(query, fetcher);
    return (
        <>
            <Head>
                <link rel="stylesheet" href="//cdn.jsdelivr.net/gh/highlightjs/cdn-release@10.3.2/build/styles/default.min.css"></link>
                <title> board </title>
            </Head>
            <body className={styles.body}>
                {/*<Navbar 
                    name={props.logged.name} 
                    avatar={props.logged.avatar} 
                    save={submit}/>*/}
                <div className={styles.avatar}>
                <Avatar 
                    src={user.avatar?user.avatar.replace(/"/g,""):""}
                    size={{ xs: 50, sm: 50, md: 50, lg: 50,xxl:50}}
                />
                </div>
                <Editor/>
            </body>
        </>
    );
}

export default App;

export async function getStaticProps(context) {
    const URI = process.env.URI || "";
    let logged =  await axios.get(URI + '/user')
                        .then(res => {return res.data});

    //console.log("server" + logged);
    return {
        props : {logged},
    }
};
