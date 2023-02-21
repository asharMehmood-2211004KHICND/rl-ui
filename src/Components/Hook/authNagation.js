const authNagation = (arrRole, roleId) =>{
    return !arrRole.some(value=> value===roleId);
}
export default authNagation;