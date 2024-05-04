const homeRoute = (req,res)=>{
    res.send('Hello Daphne!  This is home router')
};
const profileRoute = (req,res)=>{
    res.send('Daphne Avril')
};

module.exports = {
    homeRoute,
    profileRoute
}
