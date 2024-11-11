import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

function TodoList(props) {
    const { data, onDelete, dateId } = props;

    console.log("리스트에서 받는 날짜 " + dateId);
    console.log("리스트에서 받은 데이터 : " + data);
    

    return (
        <div>
            {data.length === 0 ? (
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',height: '60px', width: '43vw', marginLeft: '15px', borderRadius: '10px', fontSize: '15px', backgroundColor: '#212024f8', color: 'white', marginBottom: '8px' }}>
                            이벤트를 추가해주세요!!
                        </div>
                    </div>
                </div>
            ) : (
                data.map((event) => {
                    console.log(event);
                    
                    return (
                        <div key={event.calId} className="TodoListcontainer">
                            <div>
                                <label className="eventlabelpoint" style={{ backgroundColor: event.color }}>
                                    {/* Set style based on color property */}
                                </label>
                            </div>
                            <div>
                                <button
                                    className="btn btn-light Todotitle"
                                    onClick={() => {                                       
                                        props.UpdateModal(event.calId)
                                    }}
                                >
                                    {event.title}
                                </button>
                            </div>
                            <div>
                                <button
                                    className="deleteTodo"
                                    onClick={() => onDelete(event.calId, event.title)}
                                >
                                    <FontAwesomeIcon icon={faTrash} className='deleteicon'/>
                                </button>
                            </div>
                        </div>
                    );
                })
            )}
        </div>
    );
}

export default TodoList;
