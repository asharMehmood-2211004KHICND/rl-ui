const auth = (arrRole, roleId) =>{
    return arrRole.some(value=> value===roleId);
}
export default auth;