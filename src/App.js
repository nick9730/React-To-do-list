import { useState } from "react";




const todos = [ {

   action: 'teethclean',
   id : 1 ,
   checked: true


},

{
  action: 'car clean',
  id : 2 ,
  checked: false

},

{
  action: 'cook',
  id : 3 ,
  checked: false

}



]

function App() {
  const [todo,setTodo] = useState(todos);
  const [ name,setName] = useState('')

  

const Todo= (newTodo)=>{
  setTodo((todo)=>[...todo,newTodo])
}

const Delete = (id)=>{
  setTodo((todo)=>todo.filter(todos=>todos.id !== id))
}


const Toggle= (id)=>{
  setTodo((todo)=>
  todo.map((todos)=>
  todos.id === id? {...todos,checked:!todos.checked } : todos))
  console.log(todo)
}



  return (
    <div className="App">
       <List  onToggle={Toggle} OnDelete={Delete}   data={todo}/>
       <Add setName={setName} name={name} Todo={Todo}/>
    </div>
  );
}

export default App;


function List({onToggle,OnDelete,data}){
  const [sotBy,setSortby] = useState('input')


  let sortedItems;

  if(sotBy === 'input') {sortedItems=data}
  if(sotBy === 'action') {sortedItems=data.slice().sort((a,b)=>a.action.localeCompare(b.action)) }
  if(sotBy === 'checked') {sortedItems=data.slice().sort((a,b)=>Number(a.checked)-Number(b.checked)) }


  console.log(sortedItems)


  return(

  <div>

    <ul>
     {sortedItems.map((item,i)=>
        <Item OnDelete={OnDelete} onToggle={onToggle}  key={item.id} item={item} i={i}/>
        )}
     </ul>
    { sortedItems.length !== 0 && <div>
      <select  onChange={(e)=>setSortby(e.target.value)}>
        <option value="input">Input</option>
        <option value="action">action</option>
        <option value="checked">Checked</option>

      </select>
    </div>}
    

  </div>
  )

}


function Item ({onToggle,OnDelete,item,i}){


  return(
  <li className="item">
     <p style={{marginLeft:10}}>{i}</p>
         <div className={!item.checked? 'line' : ''}  >{item.action}</div>
        
         <input type="checkbox" value={item.checked} onChange={()=>onToggle(item.id)} />
           
         <button onClick={()=>OnDelete(item.id)}>Delete</button>

      

  </li>)
}

function Add ({Todo,name,setName}){

const Sumbit = (e)=>{
  e.preventDefault(); 
  if(!name) return
  const newTodo = {action :name,id:crypto.randomUUID(),checked:false}
  Todo(newTodo)
  setName('')


}
console.log(name)

return(
  <form onSubmit={Sumbit}>
    <input type="text" value={name} onChange={(e)=>{setName(e.target.value)} } ></input>
    <button>Add</button>
      </form>
)

}