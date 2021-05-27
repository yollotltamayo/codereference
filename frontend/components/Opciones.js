const Langs = [
    {label:"C++",value:"clike"},
    {label:"Rust",value:"rust"},
    {label:"Python",value:"python"},
    {label:"Markdown",value:"markdown"}
];
//const Opciones = (value,onElection) => {
const Opciones = (props) => {
    return (
        <div>
            <select 
                value={props.value} 
                onChange={props.onElection}>
                {
                    Langs.map( (data) => (
                        <option value={data.value}>
                            {data.label}
                        </option>
                    ))
                }
            </select>
        </div>
    );
}
export default Opciones;


