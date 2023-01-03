import fetch from "node-fetch";

async function getUserData(endPoint, userID) {
  // dynamic url
  let url = `http://localhost:5000/${endPoint}/${userID}`
  let option = {
    method: "GET",
    headers: {
      Accept: "*",
      originator: "auth"
    },
  }
  try {
    let response = await fetch(url, option);
    let { finalProjectsArr, projectStat, finalFilesArr, fileStat } = await response.json();
    return {
      userId: userID,
      projects: finalProjectsArr,
      files: finalFilesArr,
      stats: {
        projects: projectStat,
        files: fileStat
      }
    };
  } catch (err) {
    return err;
  }
}

export default getUserData;
