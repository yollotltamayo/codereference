import style from '../styles/Cardboard.module.css'
import {useState} from 'react';
//import arr from '../components/arr';
import List from '../components/List';
import { Pagination } from 'antd';
import { Input } from 'antd';
var styleSticky = {
    'position': 'sticky',
    'top' : '0px'
};
var centerInput = {
    display:'grid',
    placeItems:'center',

};

let arr = [ ];
for( var i = 0 ; i < 100;i++){
    arr.push({
        "id":i,
        "author":"yollotl",
        "content": `${i}
        holholholholhol holholhol holhol
        holholholholhol holholhol holhol
        holholholholhol holholhol holhol
        holholholholhol holholhol holhol
        holholholholhol holholhol holhol
        holholholholhol holholhol holhol
        holholholholhol holholhol holhol
        holholholholhol holholhol holhol
        holholholholhol holholhol holhol
        holholholholhol holholhol holhol
        holholholholhol holholhol holhol
        holholholholhol holholhol holhol
        holholholholhol holholhol holhol
        holholholholhol holholhol holhol
        holholholholhol holholhol holhol
        holholholholhol holholhol holhol
        holholholholhol holholhol holhol`
    });
};
const Cardboard = (props) => {
    const [page, setPage ] = useState(1)
    const [list, setList] = useState(arr)
    const {Search} = Input;

    const search = (query) => {
        query = query.toLowerCase();
        setList(arr.filter( post  => {
            return post.author.toLowerCase().includes(query) || 
                post.content.toLowerCase().includes(query) ||
                toString(post.id) === query 
        }))
        setPage(1)
    }
    return (
        <> 
            <div style={styleSticky}>
                <div style={centerInput}>
                    {/*onSearch={(nom) => search(nom)*/}
                    <Search 
                        placeholder="input search text" 
                        onSearch={(nom) => search(nom)} 
                        style={{ textAlign:'center', width: 200 }} 

                    />
                </div>
                <div className={style.grid}>
                    <List 
                        start={page-1}
                        step={8}
                        list={list} 
                        setCurrentWindow={props.setCurrentWindow}
                        setPrev={props.setPrev}
                    /> 
                </div>
                <Pagination 
                    className={style.pagination}
                    simple 
                    defaultCurrent={1}
                    onChange={(page) => setPage(page)} 
                    total={list.length} 
                />
            </div>
        </> 
    )
}
export default Cardboard;
