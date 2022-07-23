import React, {useState, useEffect} from 'react';
import './style.css';
import {Card, Icard} from '../../components/Card'

export function Home() {


  interface User {
    name: string;
    avatar: string;
  }

  interface ProfileResponse {
    name: string;
    avatar_url: string;
  }

  const [studentName, setStudentName] = useState<string>();
  const [students, setStudents] = useState<Icard[]>([]);
  const [user, setUser] = useState<User>({} as User);
  let i = 0;

  useEffect(() => {

    async function fnGetProfile () {
      const result = await fetch('https://api.github.com/users/gbrito1995');
      const data = await result.json() as ProfileResponse

      setUser({
        name: data.name,
        avatar: data.avatar_url
      })
    }
    fnGetProfile();
  }, [])

  function handleAddStudent(){

    const newStudent:Icard = {
      name: studentName,
      time: new Date().toLocaleTimeString("pt-br",
      {
        hour: '2-digit',
        minute: '2-digit',
        second:  '2-digit'
      })
      
    }

    setStudents(prevState => [...prevState, newStudent]);
  }

  return (
    <div className='container'>

      <header>
        <h1>Lista de Presença</h1>
        <div>
          <strong>{user.name}</strong>
          <img src={user.avatar} alt="" />
        </div>
      </header>

      <input 
        type="text" 
        placeholder="Digite um nome"
        onChange={e => setStudentName(e.target.value)}
      />
      <button 
        type="button"
        onClick={handleAddStudent}>
          Adicionar
      </button>

       {
         students.map(student => (
          <Card
            key={++i} 
            name={student.name} 
            time={student.time}
          />))
       }

    </div>
  )
}
