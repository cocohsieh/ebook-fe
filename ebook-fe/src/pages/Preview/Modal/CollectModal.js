import * as React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Slide from '@mui/material/Slide'
import { TransitionProps } from '@mui/material/transitions'
import iconBook from '../../../img/book.png'
import iconCheack from '../../../img/check(1).png'

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>,
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />
})

export default function AlertDialogSlide() {
  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div>
      <Button
        style={{
          display: 'block',
          color: '#df9d6e',
          border: 'none',
          padding: '0',
        }}
        variant="outlined"
        onClick={handleClickOpen}
      >
        <img src={iconBook} alt="" />
        <p style={{ fontSize: '15px' }}>收藏</p>
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle
          style={{
            textAlign: 'center',
            fontSize: '30px',
            color: '#c0724a',
            transitionDelay: '0.3s',
          }}
        >
          <p>幫你收藏好了拉，Bitch！</p>
        </DialogTitle>
        <DialogContent style={{ margin: '0 auto', transitionDelay: '0.3s' }}>
          <DialogContentText id="alert-dialog-slide-description">
            <img src={iconCheack} alt="" />
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  )
}
