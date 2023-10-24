export default function getLocalStorage(){
    const userD = localStorage.getItem("user");
    const user = JSON.parse(userD);
    return user;
}