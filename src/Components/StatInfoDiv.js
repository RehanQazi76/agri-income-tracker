import "../styles/StatInfoDiv.css"
function StatInfoDiv(props){
    return(
    <div className=' infoDiv  ' >
      <h1> {props.title}</h1>
      <h1>  ₹ {props.amount}</h1>
    </div>);
}
export default StatInfoDiv;