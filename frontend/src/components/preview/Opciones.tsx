import React from 'react'

const Langs = [
    {label:"C++",value:"clike"},
    {label:"Rust",value:"rust"},
    {label:"Python",value:"python"}
];
const Opciones = (props:{value:string,onElection:any}) => {
    return (
        <>
            <select value={props.value} onClick={props.onElection}>
                {
                    Langs.map( (data) => (
                        <option value={data.value}>
                            {data.label}
                        </option>
                    ))
                }
            </select>
        </>
    );
}
export default Opciones;


