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
import { IProduct } from '../models/IProduct';
import { IOrderDetails } from '../models/IOrderDetails';
import { useRef, useState } from 'react';
import CancelIcon from '@mui/icons-material/Cancel';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

 
export default function Products() {

    const [orderDetails, setOrderDetails] = useState<IOrderDetails[]>([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [product, setProduct] = useState<IProduct>();
    const [toremoveProduct, settoRemoveProduct] = useState<IOrderDetails>();
    const [errorMsg, setErrorMsg] = useState("");
    const [quantity, setQuantity] = useState("");
    const qtyRef = useRef<HTMLInputElement>(null);

    const products: IProduct[] = [
        { id: 1, name:'Tomato', measurement: "kg" },
        { id: 2, name:'Kale', measurement: "kg" },
        { id: 3, name:'Spinach', measurement: "kg" },
        { id: 4, name:'Coconuts', measurement: "No" },
        { id: 5, name:'Beetroot', measurement: "kg" },
        { id: 6, name:'Asparagus', measurement: "kg" },
        { id: 7, name:'Greens', measurement: "gm" },
        { id: 8, name:'Okra', measurement: "kg" },
        { id: 9, name:'Potato', measurement: "kg" }       
      ];

    // User selected the product from dropdown to add quantity
    const selectProduct = (event: any, value: any) => {

        event = event;

        if(orderDetails.find(orderDetail => orderDetail.productId === value.id)) {
            setErrorMsg("Product already added.");
            return;
        }

        setProduct(products.find(product => product.id === value.id));
        setErrorMsg("");
        
        if(qtyRef.current) {
            qtyRef.current.focus()
        }
    }

    // User clicked on Add after selecting product and quantity
    const addProductToOrder = () => {
        if(product) {

            var productInOrderDetail = orderDetails.find(od => od.productId === product.id);

            if(productInOrderDetail) {
                productInOrderDetail.quantity = +quantity;
            }

            if(!productInOrderDetail) {
                setOrderDetails([{
                    id: -1,
                    measurement: product?.measurement,
                    productId: product?.id,
                    productName: product?.name,
                    quantity: +quantity
                }, ...orderDetails]);
            }
            
            setProduct(undefined);
            setQuantity("");
        }
    }

    // Remove Confirmation Dialog to Open
    const openConfirmDialog = (orderDetail: IOrderDetails) => {
        settoRemoveProduct(orderDetail);
        setOpenDialog(true);
    }

    // Remove product from User Orders
    const removeProduct = () => {
        var removedOrderDetails = orderDetails.filter(x => toremoveProduct?.productId !== x.productId);
        setOrderDetails(removedOrderDetails);
        settoRemoveProduct(undefined);
        setOpenDialog(false);
    }

    // Edit product from User Order
    // const editProduct = (orderDetails: IOrderDetails) => {
    //     setProduct(products.find(product => product.id === orderDetails.productId));
    //     setQuantity(orderDetails.quantity.toString());
    // }

    return (
        <div className="m-4 mt-12 flex flex-col items-center justify-center ">

            {/* Header - Place your order */}
            <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 ">
            <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
            Place your Order
             </a>

            {/* Order Inputs */}
             <section className="">
                <div className="flex flex-row gap-4 mt-8">   

                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={products.filter(x => !orderDetails.map(od => od.productId).includes(x.id)).map(x => ( {id: x.id, label: x.name} ))}
                    sx={{ width: 200 }}
                    renderInput={(params) => <TextField {...params} label="Vegetable" />}
                    onChange={selectProduct}
                    value = {product ? ( {id: product.id, label: product.name}) : null}
                />
                <OutlinedInput
                    className="w-1/4"
                    id="outlined-adornment-weight"
                    placeholder='Qty'
                    endAdornment={<InputAdornment position="end">{product?.measurement}</InputAdornment>}
                    aria-describedby="outlined-weight-helper-text"
                    inputProps={{
                    'aria-label': 'weight',
                    }}
                    value = {quantity}
                    onChange={x => setQuantity(x.target.value)}
                    type="number"
                    inputRef={qtyRef}
          />

                <Button variant="contained" onClick={addProductToOrder} disabled = {!product || !quantity}>ADD</Button>
                </div>
            </section>

            {/* Error Message */}
            <div className="mt-4">
                {errorMsg}
            </div>

            {/* Order Table */}
            <div className="mt-8 w-full flex flex-col items-center justify-center">
                <TableContainer component={Paper} sx={{  maxWidth: 600 }}>
                    <Table  aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell>Vegetable</TableCell>
                            <TableCell >Quantity</TableCell>
                            <TableCell >Action</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {orderDetails.map((row) => (
                            <TableRow
                            key={row.productName}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.productName} 
                                </TableCell>
                                
                                <TableCell >{row.quantity} {row.measurement}</TableCell>
                            
                                <TableCell >
                                    <div className="flex flex-row gap-4">
                                        {/* <Button variant="contained" onClick={() => editProduct(row)}>Edit</Button> */}
                                        <Button variant="text" onClick={() => openConfirmDialog(row)}><CancelIcon  color={"error"}/></Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            
            <div className="flex flex-row gap-6 mt-8">
                {/* <Button variant="outlined" disableElevation>
                    Clear
                </Button> */}
                <Button variant="contained" disableElevation disabled={orderDetails?.length === 0}>
                    Place Order
                </Button> 
            </div>

           
            {/* Remove Confiramation Dialog */}

            <Dialog
                open={openDialog}
                onClose={() => settoRemoveProduct(undefined)}
                PaperProps={{
                component: 'form'
                
                }}
            >
            <DialogTitle>Remove Product</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    You are removing the Product <b>{toremoveProduct?.productName}</b> from your Order.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button variant="outlined" onClick={() => { settoRemoveProduct(undefined); setOpenDialog(false) }}>Cancel</Button>
            <Button variant="contained" onClick={() => removeProduct()}>Remove</Button>
            </DialogActions>
      </Dialog>
           
            
        </div>
      );
}