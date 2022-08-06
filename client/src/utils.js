export function getUser() {
    let user = localStorage.getItem("token");
    return user ? JSON.stringify(user) : null;
}
