import './style.css'

export interface Icard {
    name: string | undefined;
    time: string;
}

export function Card({name, time}:Icard){
    return (
        <div className='card'>
            <strong>{name}</strong>
            <small>{time}</small>
        </div>
    )
}