function TodoAddBtn(props) {

    const {dateId, addModal} = props;


    return (

        <div className="addbtncontainer" style={{display: 'flex', justifyContent: 'center', width: '98%'}}>
            <div style={{ width: '97%'}}>
                <button className= "addEventBtn"style={{ height: '60px', width : '100%', marginLeft:'10px', borderRadius: '5px', fontSize: '15px', cursor: 'pointer', backgroundColor: 'rgb(43, 99, 253)', color: 'white', border: 0}}
                        onClick={() => {
                            console.log(dateId)
                            addModal()
                        }}> + 새로운 이벤트 </button>
                        
            </div>                    
        </div>
    );
}

export default TodoAddBtn;