import http from "./index";

class StageService {
  getStage() {
    return http.get("/stages").then((response) => {
      return response.data;
    });
  }

  getStageById(roomId) {
    return http.get(`/stages/${roomId}`).then((response) => {
      return response.data;
    });
  }
}
export default new StageService();
