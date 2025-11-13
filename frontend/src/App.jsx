import React, {useState, useEffect} from "react";

export default function App(){
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  async function load(){
    const res = await fetch("/api/users");
    const data = await res.json();
    setUsers(data);
  }

  useEffect(()=>{ load() }, []);

  async function add(e){
    e.preventDefault();
    const res = await fetch("/api/users", {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({name, email})
    });
    if(res.ok){
      setName(""); setEmail("");
      load();
    } else {
      alert("Error");
    }
  }

  return (
    <div style={{padding:20, fontFamily:'Arial'}}>
      <h2>Users</h2>
      <ul>{users.map(u => <li key={u.id}>{u.id}: {u.name} — {u.email}</li>)}</ul>

      <h3>Add user</h3>
      <form onSubmit={add}>
        <input placeholder="Name" value={name} onChange={e=>setName(e.target.value)} required /><br/>
        <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required /><br/>
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

