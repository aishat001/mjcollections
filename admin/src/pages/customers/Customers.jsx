// import "./userList.css";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@mui/icons-material";
// import { userRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { publicRequest } from "../../makeRequest";
import axios from "axios";

export default function UserList() {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/users')
               .then(res => {
                 console.log(res);
                setData(res.data)
               })
               .catch(err => console.log(err))
         
       
     }, []);
            
    

  const handleDelete = (id) => {
    setData(data.filter((item) => item._id !== id));
  };
  
  const columns = [
    { field: "_id", headerName: "ID", width: 90 },
    {
      field: "name",
      headerName: "User",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <img className="userListImg" src={params.row.avatar} alt="" />
            {params.row.name}
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "status",
      headerName: "Status",
      width: 50,
    },
    {
      field: "transaction",
      headerName: "Transaction",
      width: 150,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/user/" + params.row._id}>
              <button className="userListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="userList">
      <DataGrid
        rows={data}
        disableSelectionOnClick
        columns={columns}
        getRowId={(row) => row._id}
        pageSize={8}
        // checkboxSelection
        disableRowSelectionOnClick

      />
    </div>
  );
}