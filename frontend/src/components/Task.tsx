import { url } from "../App";

// This is an object
type Item = {
  id: number;
  title: string;
  completed: Boolean;
};

interface Props {
  item: Item;
  setEditId: React.Dispatch<React.SetStateAction<number>>;
  setFetching: React.Dispatch<React.SetStateAction<boolean>>;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  setButtonValue: React.Dispatch<React.SetStateAction<string>>;
}

const Task = ({
  item,
  setEditId,
  setFetching,
  setInputValue,
  setButtonValue,
}: Props) => {
  const updateItem = async (
    title: string,
    id: number,
    isCompleted: Boolean
  ) => {
    let newItem = { title: title, completed: !isCompleted };

    fetch(`${url}/api/task-update/${id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newItem),
    });
    setFetching(true);
  };

  const deleteItem = async (id: number) => {
    fetch(`${url}/api/task-delete/${id}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    setFetching(true);
  };

  const handleEdit = (item: Item) => {
    setButtonValue("Edit");
    setEditId(item.id);
    setInputValue(item.title);
  };

  return (
    <div className="task-item mt-2">
      <div className="item-details" onClick={() => handleEdit(item)}>
        {item.completed === true ? (
          <s className="lead">{item.title}</s>
        ) : (
          <span className="lead">{item.title}</span>
        )}
      </div>
      <div className="item-btn">
        {/* <button className="btn btn-warning btn-sm" type="button">
          Edit
        </button> */}
        <button
          className="btn btn-danger btn-sm"
          onClick={() => {
            deleteItem(item.id);
          }}
        >
          Delete
        </button>
        <button
          type="button"
          className="btn-close"
          onClick={() => {
            updateItem(item.title, item.id, item.completed);
          }}
        ></button>
      </div>
    </div>
  );
};

export default Task;
