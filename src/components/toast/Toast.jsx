import './toast.scss';

const Toast = ({show}) => {
 
  return (
    <div className="toast" style={{'display':show ? 'block':'none'}}>
    <p>Copied</p>
</div>
  )
}

export default Toast