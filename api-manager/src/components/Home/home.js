import React, { useEffect, useState } from 'react'

import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField as MuiTextField,
  Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from 'react-router-dom'

export const Home = () => {
  // Example data for the table
  const [rows, setRows] = useState([]);

  useEffect(()=>{

    const fetchData = async()=>{
        const response = await axios.get("http://localhost:8000/board/getapi");
        setRows(response.data);
    }

    fetchData();

  },[])

  // Function to get the color for status
  const getStatusColor = (status) => {
    switch (status) {
      case "High":
        return "#ff1744"; // Lighter Red
      case "Medium":
        return "#ffea00"; // Lighter Yellow
      case "Low":
        return "#00e676"; // Lighter Green
      default:
        return "#E0E0E0"; // Light Grey
    }
  };

  return (
    <Container maxWidth="lg">
      <Typography
        variant="h4"
        component="h2"
        gutterBottom
        style={{ marginTop: "20px", marginBottom: "40px" }}
      >
        API Dashboard
      </Typography>

      <TableContainer
        component={Paper}
        style={{ marginTop: "30px", borderRadius: 10 }}
      >
        <Table>
          <TableHead>
            <TableRow style={{ backgroundColor: "#F0F0F0" }}>
              <TableCell>Api URL</TableCell>
              <TableCell>Vulnerability</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Recommended solution</TableCell>
              <TableCell>Others</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.api_url}</TableCell>
                <TableCell>{row.vuln}</TableCell>
                <TableCell>
                  <Chip
                    label={row.status}
                    style={{
                      borderRadius: 15,
                      fontSize: "0.75rem",
                      width: 80,
                      height: 30,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: getStatusColor(row.status),
                      color: "#000", // Text color to ensure visibility
                    }}
                    size="small" // Ensures consistent chip size
                  />
                </TableCell>
                <TableCell>{row.description}</TableCell>
                <TableCell>{row.solution}</TableCell>
                <TableCell>{row.others}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit Dialog */}
      
    </Container>
  );
};

export default Home;