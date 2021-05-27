
import ResizePanel from 'react-resize-panel'
const Resizer = ({preview,style,direction}) => {
    return <ResizePanel style={style} direction={direction}>{preview}</ResizePanel>
};
export default Resizer;
