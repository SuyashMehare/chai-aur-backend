export const asyncHandler = (fn) => {

    return (req,res,nxt) =>{
        Promise.resolve(fn(req,res,nxt)).catch((err) => nxt(err))
    }       
}