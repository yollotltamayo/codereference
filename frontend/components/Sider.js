import {useState} from 'react';
import { Tooltip } from 'antd';
import style from '../styles/Sider.module.css';
const Sider = (props) => {
    const [width, setWidth] = useState("open");
    var style2 = {
        width,
    }
    const openWidth = () => {
        setWidth("1000px");
    }
    const closeWidth = () => {
        setWidth("300px");

    }
    const text = (name) => {
        return <span>{name}</span>
    }
    return (
        <>{/*onMouseEnter={openWidth}
                 onMouseLeave={closeWidth}*/}
            <div style={style2} className={style.Sider}>
                <ul >
                    <li className={style.Sider_link}>
                        <Tooltip placement="rightTop" title={text("Nuevos refs te aguardan")}>
                            <svg 
                                aria-hidden="true" 
                                focusable="false" 
                                data-prefix="fas" 
                                data-icon="home" 
                                className="svg-inline--fa fa-home fa-w-18" 
                                role="img" 
                                xmlns="http://www.w3.org/2000/svg" 
                                viewBox="0 0 576 512">
                                <path fill="currentColor" d="M280.37 148.26L96 300.11V464a16 16 0 0 0 16 16l112.06-.29a16 16 0 0 0 15.92-16V368a16 16 0 0 1 16-16h64a16 16 0 0 1 16 16v95.64a16 16 0 0 0 16 16.05L464 480a16 16 0 0 0 16-16V300L295.67 148.26a12.19 12.19 0 0 0-15.3 0zM571.6 251.47L488 182.56V44.05a12 12 0 0 0-12-12h-56a12 12 0 0 0-12 12v72.61L318.47 43a48 48 0 0 0-61 0L4.34 251.47a12 12 0 0 0-1.6 16.9l25.5 31A12 12 0 0 0 45.15 301l235.22-193.74a12.19 12.19 0 0 1 15.3 0L530.9 301a12 12 0 0 0 16.9-1.6l25.5-31a12 12 0 0 0-1.7-16.93z"></path>
                            </svg>
                        </Tooltip>
                    </li>
                    <li className={style.Sider_link}>
                        <Tooltip placement="rightTop" title={text("Revisa tus refs guardados")}>
                            <svg aria-hidden="true" 
                                focusable="false" 
                                data-prefix="fas" 
                                data-icon="bookmark" 
                                className="svg-inline--fa fa-bookmark fa-w-12" 
                                role="img" 
                                xmlns="http://www.w3.org/2000/svg" 
                                viewBox="0 0 384 512">
                                <a  onClick={() => props.setDisplay(display => !display)}>
                                    <path fill="currentColor" d="M0 512V48C0 21.49 21.49 0 48 0h288c26.51 0 48 21.49 48 48v464L192 400 0 512z"></path>
                                </a>
                            </svg>
                        </Tooltip>
                    </li>
                    <li  className={style.Sider_link}>
                        <svg aria-hidden="true" 
                            focusable="false" 
                            data-prefix="fas" 
                            data-icon="search" 
                            className="svg-inline--fa fa-search fa-w-16" 
                            role="img" 
                            xmlns="http://www.w3.org/2000/svg" 
                            viewBox="0 0 512 512">
                            <path fill="currentColor" d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path></svg>
                    </li>
                    <li className={style.Sider_link}>
                        <Tooltip placement="rightTop" title={text("Guarda tu Ref")}>
                            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="save" className="svg-inline--fa fa-save fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M433.941 129.941l-83.882-83.882A48 48 0 0 0 316.118 32H48C21.49 32 0 53.49 0 80v352c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48V163.882a48 48 0 0 0-14.059-33.941zM224 416c-35.346 0-64-28.654-64-64 0-35.346 28.654-64 64-64s64 28.654 64 64c0 35.346-28.654 64-64 64zm96-304.52V212c0 6.627-5.373 12-12 12H76c-6.627 0-12-5.373-12-12V108c0-6.627 5.373-12 12-12h228.52c3.183 0 6.235 1.264 8.485 3.515l3.48 3.48A11.996 11.996 0 0 1 320 111.48z"></path></svg>
                        </Tooltip>
                    </li>
                    <li className={style.Sider_link}>

                        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="cog" className="svg-inline--fa fa-cog fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M487.4 315.7l-42.6-24.6c4.3-23.2 4.3-47 0-70.2l42.6-24.6c4.9-2.8 7.1-8.6 5.5-14-11.1-35.6-30-67.8-54.7-94.6-3.8-4.1-10-5.1-14.8-2.3L380.8 110c-17.9-15.4-38.5-27.3-60.8-35.1V25.8c0-5.6-3.9-10.5-9.4-11.7-36.7-8.2-74.3-7.8-109.2 0-5.5 1.2-9.4 6.1-9.4 11.7V75c-22.2 7.9-42.8 19.8-60.8 35.1L88.7 85.5c-4.9-2.8-11-1.9-14.8 2.3-24.7 26.7-43.6 58.9-54.7 94.6-1.7 5.4.6 11.2 5.5 14L67.3 221c-4.3 23.2-4.3 47 0 70.2l-42.6 24.6c-4.9 2.8-7.1 8.6-5.5 14 11.1 35.6 30 67.8 54.7 94.6 3.8 4.1 10 5.1 14.8 2.3l42.6-24.6c17.9 15.4 38.5 27.3 60.8 35.1v49.2c0 5.6 3.9 10.5 9.4 11.7 36.7 8.2 74.3 7.8 109.2 0 5.5-1.2 9.4-6.1 9.4-11.7v-49.2c22.2-7.9 42.8-19.8 60.8-35.1l42.6 24.6c4.9 2.8 11 1.9 14.8-2.3 24.7-26.7 43.6-58.9 54.7-94.6 1.5-5.5-.7-11.3-5.6-14.1zM256 336c-44.1 0-80-35.9-80-80s35.9-80 80-80 80 35.9 80 80-35.9 80-80 80z"></path></svg>

                    </li>
                </ul>
            </div>
        </>
    )
}
export default Sider;
