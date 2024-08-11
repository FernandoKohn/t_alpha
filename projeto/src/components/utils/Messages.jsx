import React, { useState } from 'react'
import Alert from '@mui/material/Alert';
import styles from "./Messages.module.css"

export const Messages = ({messageType, messageContent, errorArray, setErrorArray, setOpen}) => {

  //Componente de alertas

  return (
    <div className={styles.main}>
        {messageType === "success" && (
          <Alert onClose={() => {setOpen(false); setErrorArray([])}} severity={messageType}>{messageContent}</Alert>
        )}
        
        {(messageType === "error") && (
          errorArray.map((err, index) => (
              <div key={index}>
                <Alert onClose={() => {setOpen(false); setErrorArray([])}} severity={messageType}>{err}</Alert>
              </div>
          ))
        )}
        
    </div>
  )
}
