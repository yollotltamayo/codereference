import React from 'react';
import './Cards.css'
import { Card } from 'antd';
import { Button } from 'antd';
const p = `const Cards = () => (
    <Card>
        <p> skdjfskdjf</p>
`
const Cards = (props: {id:number, content:string, onRemove:any,onWrite:any, onDisplay:any}) => (
    <Card className = "card" >
        <p> skkdjf</p>
        <code>
            {props.content?props.content.substr(0,30)+'...':""}
        </code>
        <Button onClick={ 
            () =>( props.onRemove(props.id),
                props.onWrite(props.content, 0))}
        size ="middle" block ={true} type="dashed"> Agregar</Button>
    <Button onClick={ 
        () =>( props.onDisplay(true),
            props.onWrite(props.content, 2))}
            size ="middle" block ={true} type="dashed"> 
            Preview
        </Button>
    </Card>
); 
export default Cards;


