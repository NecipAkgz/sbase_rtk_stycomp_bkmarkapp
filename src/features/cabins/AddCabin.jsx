import { useState } from 'react'
import Button from '../../ui/Button'
import Modal from '../../ui/Modal'
import CreateCabinForm from './CreateCabinForm'

function AddCabin() {
  const [showForm, setShowForm] = useState(false)

  return (
    <div>
      <Button onClick={() => setShowForm((show) => !show)}>
        Add new cabbin
      </Button>
      {showForm && (
        <Modal onClose={() => setShowForm(false)}>
          <CreateCabinForm onClose={() => setShowForm(false)} />
        </Modal>
      )}
    </div>
  )
}
export default AddCabin
