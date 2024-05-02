const mFn1 = (req,res,nxt) => {
    console.log('Middleware 1');
    nxt()
}

const mFn2 = (req,res,nxt) => {
    console.log('Middleware 2');
    nxt()
}

const mFn3 = (req,res,nxt) =>{
    console.log('Middlwaerr 3');
    nxt()
}

export  {
    mFn1,
    mFn2,
    mFn3
}