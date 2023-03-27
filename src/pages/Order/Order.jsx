import React, { useEffect, useState } from "react";
import {useSelector} from "react-redux";
//import Tables from "../../components/Tables/Tables";
import useFetch from "../../hooks/useFetch";
import {styled} from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, {tableCellClasses} from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import Paper from "@mui/material/Paper";
import axios from "axios";
import TableRow from '@mui/material/TableRow';

const Order = () => {
  const user = useSelector((state) => state.user.currentUser);

  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [pTitles,setPTitles]= useState([]);



  const path = `/orders?[filters][email]=${user.email}`
 


  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.get(process.env.REACT_APP_API_URL + path, {
          headers: {
            Authorization: "bearer" + process.env.REACT_APP_API_TOKEN
          }
        })
        console.log("Data : ", res.data.data)
        setData(res.data.data)
        // res.data.data.map((p)=>{
        //   setPTitles(...pTitles,p.attributes.product[0].title)
        // })
      } catch (error) {
        setError(true);
      }
      setLoading(false);
    }
    fetchData()
  }, [path])

  console.log("ptitle ",pTitles)
  const StyledTableCell = styled(TableCell)(({theme}) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));


  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{minWidth: 700}} aria-label="customized table">
          <TableHead>
          <TableRow>
              <StyledTableCell align="center" >ID</StyledTableCell>
              <StyledTableCell align="center">No. Of Product</StyledTableCell>
              <StyledTableCell align="center">Email</StyledTableCell>
              <StyledTableCell align="center">StripeId</StyledTableCell>
              <StyledTableCell align="center">Created At</StyledTableCell>
              <StyledTableCell align="center">Status</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
           {
            data.map((prod)=>{
             console.log(prod);
              return  <StyledTableRow  key={prod.id}>
                <StyledTableCell  align="center">
                  {prod.id}
                </StyledTableCell>
                <StyledTableCell align="center">{prod.attributes.product.length}</StyledTableCell>
                <StyledTableCell align="center">{prod.attributes.email}</StyledTableCell>
                <StyledTableCell align="center">{prod.attributes.stripeId.slice(1,15)+"..."}</StyledTableCell>
                <StyledTableCell align="center">{prod.attributes.createdAt}</StyledTableCell>
                <StyledTableCell align="center">{prod.attributes.status}</StyledTableCell>
              </StyledTableRow >
            })
           }
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Order;