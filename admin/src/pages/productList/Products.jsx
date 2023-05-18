import React from 'react'
// import "./productList.css";
import { DataGrid, GridDeleteIcon } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getProducts } from "../../redux/ApiCalls";

const Products = () => {

    const dispatch = useDispatch();
    const products = useSelector((state) => state.product.products);
  
    useEffect(() => {
      getProducts(dispatch);
    }, [dispatch]);
  
    const handleDelete = (id) => {
      deleteProduct(id, dispatch);
    };
  
    const columns = [
      { field: "_id", headerName: "ID", width: 220 },
      { field: "name", headerName: "Product name", width: 200, editable: true},
      {
        field: "product",
        headerName: "Product",
        width: 200,
        editable: true,
        renderCell: (params) => {
          return (
            <div className="productListItem">
              <img className="productListImg" src={params.row.img} alt="" width={"80px"} height={"80px"} />
              {params.row.title}
            </div>
          );
        },
      },
      { field: "inStock", headerName: "Stock", width: 100 },
      {
        field: "price",
        headerName: "Price",
        width: 100,
        editable: true

      },
      {
        field: "action",
        headerName: "Action",
        width: 150,
        renderCell: (params) => {
          return (
            <>
              <Link to={"/product/" + params.row._id}>
                <button className="productListEdit">Edit</button>
              </Link>
              <GridDeleteIcon
                className="productListDelete"
                onClick={() => handleDelete(params.row._id)}
              />
            </>
          );
        },
      },
    ];

    return (
 <div className="productList">
      <DataGrid
      rowHeight={105}
        rows={products}
        disableSelectionOnClick
        columns={columns}
        getRowId={(row) => row._id}
        initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
  
        checkboxSelection
      />  
      </div>     
    )
}

export default Products
