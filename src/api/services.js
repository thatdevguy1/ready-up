import axios from "axios";

export async function getRoom(id) {
  return await axios.get(`/api/room/${id}`);
}

export async function createRoom() {
  return await axios.post("/api/room");
}
