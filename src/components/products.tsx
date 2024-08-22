import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';

function createData(
    vegetable: string,
    measurement: string,
    quantity: number
    
  ) {
    return { vegetable, measurement, quantity };
  }
  
  const rows = [
    createData('Tomato', "kg", 29),
    createData('Tomato', "kg", 29),
    createData('Tomato', "kg", 29),
    createData('Tomato', "kg", 29),
    createData('Tomato', "kg", 29),
    createData('Tomato', "kg", 29),
    createData('Tomato', "kg", 29),
    createData('Tomato', "kg", 29),
    createData('Tomato', "kg", 29),
    createData('Tomato', "kg", 29),
    createData('Tomato', "kg", 29),
    
  ];

export default function Products() {

    const top100Films = [
        { label: 'Tomato', year: 1994 },
        { label: 'Brinjal', year: 1972 },
        { label: 'Potato', year: 1974 },
      ];

      return (
        <div className="m-4 mt-12 flex flex-col items-center justify-center ">
            <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 ">
            <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
            Place your Order
        </a>
            <div className="flex flex-row gap-4">
                <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={top100Films}
                sx={{ width: 200 }}
            
                renderInput={(params) => <TextField {...params} label="Vegetable" />}
                />
                <OutlinedInput
                    id="outlined-adornment-weight"
                    endAdornment={<InputAdornment position="end">kg</InputAdornment>}
                    aria-describedby="outlined-weight-helper-text"
                    inputProps={{
                    'aria-label': 'weight',
                    }}
          />

                <Button variant="contained">ADD</Button>
            </div>
            <div className="mt-8 w-full flex flex-col items-center justify-center">
                <TableContainer component={Paper} sx={{  maxWidth: 600 }}>
                    <Table  aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell >Quantity</TableCell>
                            <TableCell >Action</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {rows.map((row) => (
                            <TableRow
                            key={row.vegetable}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                            <TableCell component="th" scope="row">
                                {row.vegetable} 
                            </TableCell>
                            
                            <TableCell >{row.quantity} {row.measurement}</TableCell>
                           
                            <TableCell>
                                Edit Remove
                            </TableCell>
                            </TableRow>
                            
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            <div className="flex flex-row gap-6 mt-8">
                <Button variant="outlined" disableElevation>
                    Clear
                </Button>
                <Button variant="contained" disableElevation>
                    Place Order
                </Button>
            </div>
        </div>
      );
}