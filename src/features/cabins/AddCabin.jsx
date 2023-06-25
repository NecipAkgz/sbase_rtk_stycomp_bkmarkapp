import Button from '../../ui/Button'
import Modal from '../../ui/Modal'
import CreateCabinForm from './CreateCabinForm'

function AddCabin() {
  return (
    <div>
      <Modal>
        <Modal.Open opens='cabin-form'>
          <Button>Add new cabin</Button>
        </Modal.Open>
        <Modal.Window name='cabin-form'>
          <CreateCabinForm />
        </Modal.Window>
      </Modal>
    </div>
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
