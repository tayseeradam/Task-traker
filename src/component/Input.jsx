
import PropTypes from "prop-types"

const Input = ({type, placeholder, className, onChange}) => {


  return (
    <input 
          type={type} 
          onChange={onChange}
          placeholder={placeholder}
          className={className}
          />
  )
}


Input.propTypes ={
   
    placeholder:PropTypes.string,
    type:PropTypes.string,
    onChange:PropTypes.func,
    className:PropTypes.string,
    
    }
export default Input
