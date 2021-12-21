import React from 'react'

const modal = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#6a00ac',
    padding: '50px',
    zIndex: 1000
}

export default function Modal({ open, children, onClose }) {
    if (!open) return null

    return (
        <>
            <div style={modal}>
                <button onClick={onClose} className="modal-button bg-blue-400 rounded-lg font-bold transition duration-500 ease-in-out hover:ring-2 ring-offset-2 ring-blue-600">Close</button>
                {children}
            </div>
        </>
    )
}