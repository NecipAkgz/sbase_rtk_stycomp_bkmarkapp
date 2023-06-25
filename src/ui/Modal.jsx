import { cloneElement, createContext, useContext, useState } from 'react'
import { createPortal } from 'react-dom'
import { HiXMark } from 'react-icons/hi2'
import styled from 'styled-components'

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
`

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* Sometimes we need both */
    /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
    color: var(--color-grey-500);
  }
`

const ModalContext = createContext()

// Define a Modal component, which maintains the state of the current open modal window:
function Modal({ children }) {
  const [openName, setOpenName] = useState('')

  const close = () => setOpenName('')
  const open = setOpenName

  return (
    <ModalContext.Provider value={{ openName, close, open }}>
      {children}
    </ModalContext.Provider>
  )
}

// Define an Open component that creates clickable elements to trigger selected modal windows:
function Open({ children, opens: opensWindowName }) {
  const { open } = useContext(ModalContext)

  // Attach the `open` function to the onClick event of the passed `children` element:
  return cloneElement(children, { onClick: () => open(opensWindowName) })
}

// Define a Window component that represents an individual modal window:
function Window({ children, name }) {
  const { openName, close } = useContext(ModalContext)

  // If the `name` prop does not match the current `openName` state, do not render this modal window:
  if (name !== openName) return null

  // Render a new modal window using createPortal(), with close button functionality:
  return createPortal(
    <Overlay>
      <StyledModal>
        <Button onClick={close}>
          <HiXMark />
        </Button>

        <div>{cloneElement(children, { onClose: close })}</div>
      </StyledModal>
    </Overlay>,
    document.body
  )
}

// Add sub-components `Open` and `Window` as properties to the `Modal` component:
Modal.Open = Open
Modal.Window = Window

export default Modal
