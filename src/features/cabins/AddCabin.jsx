import Button from '../../ui/Button'
import Modal from '../../ui/Modal'
import CabinTable from './CabinTable'
import CreateCabinForm from './CreateCabinForm'

function AddCabin() {
  return (
    <Modal>
      <Modal.Open opens='cabin-form'>
        <Button>Add new cabin</Button>
      </Modal.Open>
      <Modal.Window name='cabin-form'>
        <CreateCabinForm />
      </Modal.Window>

      <Modal.Open opens='table'>
        <Button>Show Table</Button>
      </Modal.Open>
      <Modal.Window name='table'>
        <CabinTable />
      </Modal.Window>
    </Modal>
  )
}
export default AddCabin

// function AddCabin() {
//   const [showForm, setShowForm] = useState(false)

//   return (
//     <div>
//       <Button onClick={() => setShowForm((show) => !show)}>
//         Add new cabbin
//       </Button>
//       {showForm && (
//         <Modal onClose={() => setShowForm(false)}>
//           <CreateCabinForm onClose={() => setShowForm(false)} />
//         </Modal>
//       )}
//     </div>
//   )
// }
// export default AddCabin
