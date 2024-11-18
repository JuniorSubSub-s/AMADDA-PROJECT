function TodoAddBtn(props) {

    const {dateId, addModal} = props;


    return (

        <div className="addbtncontainer" style={{display: 'flex', justifyContent: 'center', width: '100%'}}>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center'}}>
                <button className= "addEventBtn"
                        onClick={() => {
                            console.log(dateId)
                            addModal()
                        }}> + 새로운 이벤트 </button>
                        
            </div>                    
        </div>
    );
}

export default TodoAddBtn;