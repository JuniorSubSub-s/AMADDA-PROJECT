function TodoAddBtn(props) {

    const {dateId, addModal} = props;


    return (

        <div className="addbtncontainer" style={{display: 'flex', justifyContent: 'center'}}>
            <div>
                <button className= "addEventBtn"style={{ height: '60px', width : '43vw', marginLeft:'15px', borderRadius: '5px', fontSize: '15px', cursor: 'pointer', backgroundColor: 'rgb(43, 99, 253)', color: 'white'}}
                        onClick={() => {
                            console.log(dateId)
                            addModal()
                        }}> + 새로운 이벤트 </button>
                        
            </div>                    
        </div>
    );
}

export default TodoAddBtn;