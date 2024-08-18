import React, { useEffect, useState } from 'react'
import './inventory.css';
import {
  Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, Paper, IconButton, Button, Dialog, DialogActions,
  DialogContent, DialogTitle, TextField
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from 'react-router-dom'



const initialData = [
  { id: 1, apiUrl: 'https://api.example1.com'},
  { id: 2, apiUrl: 'https://api.example2.com'},
  { id: 3, apiUrl: 'https://api.example3.com'},
  { id: 4, apiUrl: 'https://api.example4.com'},
];

export function ApiInventory() {
  const [data, setData] = useState(initialData);
  const [editOpen, setEditOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [currentEdit, setCurrentEdit] = useState(null);
  const [newApi, setNewApi] = useState({ apiUrl: ''});

  const [users, setUsers] = useState([]);

  useEffect(()=>{

    const fetchData = async()=>{
        const response = await axios.get("http://localhost:8000/api/getall");
        setUsers(response.data);
    }

    fetchData();

  },[])

  const deleteUser = async(userId) =>{
      await axios.delete(`http://localhost:8000/api/delete/${userId}`)
      .then((respones)=>{
        setUsers((prevUser)=> prevUser.filter((user)=> user._id !== userId))
        toast.success(respones.data.msg, {position: 'top-right'})
      })
      .catch((error) =>{
        console.log(error);
      })
  }

  return (
    <>
      <div className='button-container'>
        <Link to={"/add"} className='addButton'>Add API</Link>
      </div>
      
      <TableContainer component={Paper} className="table-wrapper">
        <Table className="custom-table">
          <TableHead className='custom-header'>
            <TableRow>
              <TableCell>API URL</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
                users.map((user, index)=>{
                    return(
                    <tr key={index} className="custom-row">
                        <td className="custom-cell">{user.api_url}</td>
                        <td className='actionButtons custom-cell'>
                                <button onClick={()=> deleteUser(user._id)}><i className="fa-solid fa-trash"><DeleteIcon />
</i></button>
                        </td>
                    </tr>
                    )
                })
            }
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit Dialog */}
      <Dialog open={editOpen} onClose={() => setEditOpen(false)}>
        <DialogTitle>Edit API</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="API URL"
            type="url"
            fullWidth
            name="apiUrl"
            value={currentEdit?.apiUrl || ''}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditOpen(false)}>Cancel</Button>
          <Button>Save</Button>
        </DialogActions>
      </Dialog>

      {/* Add Dialog */}
      <Dialog open={addOpen} onClose={() => setAddOpen(false)}>
        <DialogTitle>Add New API</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="API URL"
            type="url"
            fullWidth
            name="apiUrl"
            value={newApi.apiUrl}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAddOpen(false)}>Cancel</Button>
          <Button>Add</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
