import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TodoAddBtn from './TodoAddBtn';

function TodoList(props) {
    const { data, onDelete, dateId, currentMonth, addModal } = props;

    console.log("리스트에서 받는 날짜 " + dateId);
    console.log("리스트에서 받은 데이터 : " + data);


    return (
        <div style={{ height: '64%', overflowY: 'auto', marginBottom: '10px', display: 'flex', flexDirection: 'column' }}>
            {data.length === 0 ? (
                <div>
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                        <button style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60px', width: '90%', borderRadius: '5px', fontSize: '15px', backgroundColor: '#212024f8', color: 'white', marginBottom: '8px' }}>
                            이벤트를 추가해주세요!!
                        </button>
                    </div>
                </div>
            ) : (
                data.map((event) => {
                    console.log(event);

                    return (
                        <div key={event.calId} className="TodoListcontainer">
                            <div className='Todotitle-container'>
                                <button
                                    className="Todotitle"
                                    style={{border: `2px, solid, ${event.color}`}}
                                    onClick={() => {
                                        props.UpdateModal(event.calId)
                                    }}
                                >
                                    {event.title}
                                </button>                                <button
                                    className="deleteTodo"
                                    onClick={() => onDelete(event.calId, event.title)}
                                >
                                    <FontAwesomeIcon icon={faTrash} className='deleteicon' />
                                </button>
                            </div>
                        </div>
                    );
                })
            )}
            <TodoAddBtn
                dateId={dateId}
                currentMonth={currentMonth}
                addModal={addModal}
            />
        </div>
    );
}

export default TodoList;
