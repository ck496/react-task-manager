import { useState } from "react"

const AddTask = ({onAdd}) => {
    const [text, setText] = useState('')
    const [day, setDay] = useState('')
    const [reminder,setReminder] = useState(false)

    const onSubmit = (e) => {
        //So it doesnt submit to a page like usual 
        e.preventDefault()

        //Validate task attributes
        if(!text) {
            alert('Please add task')
            return
        }

        //Send Task object to App component to add to Tasks state 
        onAdd({text,day,reminder})

        //Clear form 
        setText('')
        setDay('')
        setReminder(false)
    }

  return (
    <form className='add-form' onSubmit={onSubmit}>
        <div className='form-control'>
            <label>Task</label>
            <input type='text' placeholder='Add Task' value={text}
                onChange={(e) => setText(e.target.value)}/>
        </div>
        <div className='form-control'>
            <label>Day & Time</label>
            <input type='text' placeholder='Add Day & Time' value={day}
                onChange={(e) => setDay(e.target.value)}/>
        </div>
        <div className='form-control form-control-check'>
            <label>Set Reminder</label>
            <input 
                type='checkbox'
                checked={reminder} 
                value={reminder} 
                onChange={(e) => setReminder(e.currentTarget.checked)}/>
        </div>

        <input type='submit' value='Save Task' className='btn btn-block'/>

    </form>
  )
}

export default AddTask