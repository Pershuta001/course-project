export const validateEmail = (email) =>
{
    if(email === ""){
        return "Email is required";
    }
    else if (!(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)))
    {
        return "Wrong email format";
    }
    return true;
}

export const validatePassword = (password) =>
{
    if(password === ""){
        return "Password is required";
    }
    else if (!(/^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[-!#$%&? "]).*$/.test(password)))
    {
        return "Password must be min 8 symbols length and contain at least digit, letter, special char";
    }
    return true;
}
export const validatePasswordRep = (password, passwordRep) =>
{
    if(passwordRep === ""){
        return "Please enter password again to avoid mistakes";
    }
    else if (!passwordRep === password)
    {
        return "Passwords doesn't match";
    }
    return true;
}

export const validateName = (name) =>
{
    if(name === ""){
        return "Firstname is required";
    }
    else if (!/[a-zA-Zа-яА-ЯіІєЄїЇ]{1,20}$/.test(name))
    {
        return "Firstname can contain only letters";
    }
    return true;
}

export const validatePhone = (phone) =>
{
    if(phone === ""){
        return "Phone is required";
    }
    else if (!/[0-9]{1,20}$/.test(phone))
    {
        return "Phone can contain only digits";
    }
    return true;
}

export const validateLastname = (name) =>
{
    if(name === ""){
        return "Lastname is required";
    }
    else if (!/[a-zA-Zа-яА-ЯіІєЄїЇ]{1,20}$/.test(name))
    {
        return "Lastname can contain only letters";
    }
    return true;
}

