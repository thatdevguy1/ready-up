import axios from "axios";

//RESTFUL routes to create room and join a room (Not currently being used)
export async function getRoom(id) {
  return await axios.get(`/api/room/${id}`);
}

export async function createRoom(name) {
  return await axios.post("/api/room", { name });
}
