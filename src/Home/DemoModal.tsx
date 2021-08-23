import React from 'react'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';


interface ModalProps {
  id?: any;
  open?: any;
  suredelete?: any;
  can_body: any;
  del_body: any;


}


export default function DemoModal({

  open,
  id,
  suredelete,
  can_body,
  del_body,



}: ModalProps) {

  return (
    <div>

      <Dialog open={open} >

        <DialogTitle id={id}>
          {suredelete}
        </DialogTitle>

        <DialogActions>

          {can_body}
          {del_body}

        </DialogActions>

      </Dialog>

    </div>
  )
}
