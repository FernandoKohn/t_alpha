import React, { useState } from 'react'
import Alert from '@mui/material/Alert';
import styles from "./Messages.module.css"

export const Messages = ({messageType, messageContent, errorArray}) => {

  return (
    <div className={styles.main}>
        {messageType === "success" && (
          <Alert severity={messageType}>{messageContent}</Alert>
        )}
        
        {(messageType === "error") && (
          errorArray.map((err, index) => (
              <div key={index}>
                <Alert severity={messageType}>{err}</Alert>
              </div>
          ))
        )}
        
    </div>
  )
}
