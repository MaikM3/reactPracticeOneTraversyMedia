import { useState } from "react"

const AddTask = ({onAddTask}) => {
  const [name, setName] = useState('')
  const [date, setDate] = useState('')
  const [reminder, setReminder] = useState(false)

  const onSubmit = (e) => {
    e.preventDefault()
    if (!name || !date) {
      alert('Please add a name & date')
      return
    }

    onAddTask({ name, date, reminder})

    setName('')
    setDate('')
    setReminder(false)
  }

  return (
    <form className="add-form" onSubmit={onSubmit}>
      <div className="form-control">
        <label>Task</label>
        <input type='textbox' placeholder='Add task'
        value={name} onChange={ e =>setName(e.target.value)}
        />
      </div>
      <div className="form-control">
        <label>Date</label>
        <input type='textbox' placeholder='Add day and time'
        value={date} onChange={ e =>setDate(e.target.value)} />
      </div>
      <div className="form-control form-control-check">
        <label>Set reminder</label>
        <input type='checkbox' 
        checked={reminder}
        value={reminder} onChange={ e =>setReminder(e.currentTarget.checked)} />
      </div>
      <input type='submit' value='Save Task' className='btn btn-block' />
    </form>
  )
}

export default AddTask