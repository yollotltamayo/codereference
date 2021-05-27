import styles from '../styles/Cards.module.css'
import { Card } from 'antd';
import { Button } from 'antd';
import {useEffect,memo} from 'react';
const p = `const Cards = () => (
    <Card>
        <p> skdjfskdjf</p>
`
//const Cards = (props: {id:number, content:string, onRemove:any,onWrite:any, onDisplay:any}) => (
const compareRender = (prevProps,nextProps) => {
    return prevProps.autho === nextProps.autho;
};
const Cards =memo((props) => {
    return (
        <Card  className={styles.card} >
            <p> {props.author}</p>
            <code>
                {props.content?props.content.substr(0,30)+'...':""}
            </code>
            <Button onClick={ () =>( 
                props.setPrev(props.content, 5) , props.setCurrentWindow(false) )

                }
                size ="middle" block ={true} type="dashed"> Preview</Button>
            {/*props.onWrite(props.content, 2))*/}
            {/*onClick={ () =>( props.onDisplay(true) )}
            <Button 
                size ="middle" block ={true} type="dashed"> 
                Preview
            </Button>*/}
        </Card>
    )
})
export default Cards;


