import { AppointmentDto } from '../../dtos/appointment.dto';

interface IProps {
    data: AppointmentDto[];
}

function ResultList({ data }: IProps) {
    return (<div className='m-5'>
        {data.map(appointment => <div key={appointment.id}>
            <div className='p-3 shadow-md rounded-md text-2xl'>
                <h5>{appointment.title}</h5>
                <p className="text-sm">{appointment.content}</p>
                <p className='text-xs'>{appointment.start_time} - {appointment.end_time}</p>
                <p className='text-xs'>Slot: {appointment.subscribed}/{appointment.limit}</p>
            </div>
        </div>)}
    </div>);
}

export default ResultList;