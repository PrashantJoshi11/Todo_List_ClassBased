import React from "react";
import { Box, Container, Stack, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
class Todo extends React.Component {
  constructor() {
    super();
    this.state = {
      toDoList: [],
      newData: "",
      edit: "",
    };
  }
  count = 0;

  addItem = () => {
    if (!this.state.newData) {
      alert("Please write something");
    } else if (this.state.edit) {
      this.setState({
        toDoList: this.state.toDoList.map((elem) => {
          if (elem.id === Number(this.state.edit)) {
            return { ...elem, data: this.state.newData };
          }
          return elem;
        }),
      });
      this.setState({ edit: "", newData: "" });
    } else {
      this.count++;
      const newItem = {
        id: this.count,
        data: this.state.newData,
      };
      let list = [...this.state.toDoList, newItem];
      this.setState({ toDoList: list, newData: "" });
    }
  };

  deleteData = (index) => {
    const list = this.state.toDoList.filter((item) => item.id !== index);
    this.setState({ toDoList: list, newData: "" });
  };

  editData = (id, data) => {
    this.setState({ edit: id, newData: data });
  };

  render() {
    return (
      <Container
        style={{
          bgcolor: "#f62121",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Stack
          sx={{
            bgcolor: "#e5ebebe7",
            width: "50rem",
            gap: "13px",
            minHeight: "15rem",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              fontSize: "2rem",
              borderBottom: "2px solid grey",
              bgcolor: "#72d1f3",
            }}
          >
            <p>ToDo List</p>
          </Box>
          <Stack direction="row" alignItems={"center"} gap={"12px"}>
            <TextField
              fullWidth
              id="outlined-textarea"
              label="Todo List"
              placeholder="Pleasee Write Here"
              value={this.state.newData}
              onChange={(e) => this.setState({ newData: e.target.value })}
              sx={{ textTransform: "capitalize", bgcolor: "white" }}
            />
            {!this.state.edit ? (
              <AddIcon
                fontSize="large"
                sx={{ padding: "10px", color: "green" }}
                onClick={this.addItem}
              />
            ) : (
              <EditIcon
                fontSize="large"
                sx={{ padding: "5px" }}
                onClick={this.addItem}
              />
            )}
          </Stack>
          <Stack direction={"column"} gap={4}>
            {this.state.toDoList.length > 0  ? this.state.toDoList?.map((item) => {
              return (
                <Stack
                  direction={"row"}
                  alignItems={"center"}
                  gap={2}
                  key={item.id}
                >
                  <Box
                    component="span"
                    sx={{
                      fontSize: "1.5rem",
                      width: "80%",
                      display: "flex",
                      border: "2px solid grey",
                      borderRadius: "10px",
                      alignItems: "center",
                      justifyContent: "center",
                      //   bgcolor:"red"
                    }}
                  >
                    <p
                      style={{
                        overflow: "hidden",
                        userSelect: "none",
                        wordWrap: "break-word",
                        margin: 5,
                        padding: 5,
                      }}
                    >
                      {item.data}
                    </p>
                  </Box>
                  <DeleteForeverIcon onClick={() => this.deleteData(item.id)}  sx={{color:"red"}}/>
                  <EditIcon onClick={() => this.editData(item.id, item.data)} />
                </Stack>
              );
            })
            :
            <p
            style={{
              margin: 5,
              padding: 5,
              textAlign:"center"
            }}
          >
            No Data
          </p>
        }
          </Stack>
        </Stack>
      </Container>
    );
  }
}
export default Todo;
