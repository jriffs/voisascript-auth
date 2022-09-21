async function getUserData(endPoint, username){
  //   endPoint ---- string
  //   username ------ string
  // dynamic url
  let url = endPoint + username;
  let option = {
    method: "GET",
    headers:{
      Accept: "*",
    },
    Origin: "auth"
  }
  try{
    let response = await fetch(url, option);
    let data = await response.json();
     return data;
  }catch(err){
    return err;
  }
}

export default getUserData;
