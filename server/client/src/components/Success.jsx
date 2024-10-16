import { useState } from 'react'

const Success = ({ message }) => {
  const [show, setShow] = useState(true)
  setTimeout(() => setShow(false), 1500)

  return (
    <>
      {show && (
        <div className="bg-green-500 text-white p-2 rounded-md mt-6 text-sm">
          <i className="fa-solid fa-circle-check"></i>&nbsp;
          { message }
        </div>
      )}
    </>
  )
}

export default Success